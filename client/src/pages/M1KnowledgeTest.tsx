import React, { useState, useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import {
  M1_QUESTION_BANK,
  M1Question,
} from "@/data/m1QuestionBank";
import {
  CheckCircle2,
  XCircle,
  AlertTriangle,
  RotateCcw,
  Volume2,
  VolumeX,
  Award,
  BookOpen,
  ArrowRight,
  Flame,
  Target,
  BarChart3,
  Share2,
  HelpCircle,
  Home,
  Check,
  ChevronRight,
  Sparkles,
} from "lucide-react";

// --- Web Audio Synthesizer (Zero External Dependencies) ---
class SoundManager {
  private ctx: AudioContext | null = null;
  public enabled: boolean = true;

  private getContext(): AudioContext | null {
    if (!this.ctx && typeof window !== "undefined") {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  playCorrect() {
    if (!this.enabled) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();

      osc1.type = "sine";
      osc2.type = "sine";

      const now = ctx.currentTime;
      osc1.frequency.setValueAtTime(523.25, now); // C5
      osc1.frequency.exponentialRampToValueAtTime(659.25, now + 0.1); // E5

      osc2.frequency.setValueAtTime(783.99, now + 0.08); // G5
      osc2.frequency.exponentialRampToValueAtTime(1046.5, now + 0.22); // C6

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);

      osc1.start(now);
      osc1.stop(now + 0.15);
      osc2.start(now + 0.08);
      osc2.stop(now + 0.35);
    } catch (e) {}
  }

  playWrong() {
    if (!this.enabled) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "triangle";
      const now = ctx.currentTime;
      osc.frequency.setValueAtTime(220, now); // A3
      osc.frequency.exponentialRampToValueAtTime(160, now + 0.18);

      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.25);
    } catch (e) {}
  }

  playVictory() {
    if (!this.enabled) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const notes = [523.25, 659.25, 783.99, 1046.5]; // C E G C
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        const start = ctx.currentTime + idx * 0.09;
        osc.frequency.setValueAtTime(freq, start);
        gain.gain.setValueAtTime(0.15, start);
        gain.gain.exponentialRampToValueAtTime(0.001, start + 0.4);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(start);
        osc.stop(start + 0.4);
      });
    } catch (e) {}
  }
}

const sounds = new SoundManager();

// --- LocalStorage Persistence ---
const STORE_KEY = "ajq8_m1_test_v2";

interface StorageState {
  exams: { score: number; total: number; pct: number; when: number }[];
  missed: Record<string, number>;
  explainOnError: boolean;
  soundEnabled: boolean;
}

function loadStore(): StorageState {
  try {
    const raw = localStorage.getItem(STORE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {}
  return {
    exams: [],
    missed: {},
    explainOnError: true,
    soundEnabled: true,
  };
}

function saveStore(data: StorageState) {
  try {
    localStorage.setItem(STORE_KEY, JSON.stringify(data));
  } catch (e) {}
}

// Fisher-Yates shuffle
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Scramble answer choices so position is never predictable
interface ScrambledQuestion {
  raw: M1Question;
  t: string;
  q: string;
  e: string;
  n?: number;
  o: string[];
  a: number;
}

function scramble(q: M1Question): ScrambledQuestion {
  const indexed = q.o.map((text, i) => ({ text, isCorrect: i === q.a }));
  const shuffled = shuffle(indexed);
  return {
    raw: q,
    t: q.t,
    q: q.q,
    e: q.e,
    n: q.n,
    o: shuffled.map((item) => item.text),
    a: shuffled.findIndex((item) => item.isCorrect),
  };
}

type ModeType = "exam" | "drill" | "traps" | "missed" | "marathon";

export default function M1KnowledgeTest() {
  const [store, setStore] = useState<StorageState>(loadStore);
  const [activeScreen, setActiveScreen] = useState<"home" | "test" | "results">("home");
  const [testMode, setTestMode] = useState<ModeType>("exam");
  const [questions, setQuestions] = useState<ScrambledQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [pickedOption, setPickedOption] = useState<number | null>(null);
  const [scoreRight, setScoreRight] = useState(0);
  const [scoreWrong, setScoreWrong] = useState(0);
  const [answerLog, setAnswerLog] = useState<{
    q: ScrambledQuestion;
    picked: number;
    ok: boolean;
  }[]>([]);
  const [copiedShare, setCopiedShare] = useState(false);

  // Sync sound settings
  useEffect(() => {
    sounds.enabled = store.soundEnabled;
  }, [store.soundEnabled]);

  const updateStore = (updater: (prev: StorageState) => StorageState) => {
    setStore((prev) => {
      const next = updater(prev);
      saveStore(next);
      return next;
    });
  };

  // Keyboard navigation support: 'A', 'B', 'C' (or 1, 2, 3), 'Enter' / 'Space' for next
  useEffect(() => {
    if (activeScreen !== "test") return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // If modal or input active, ignore
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      const key = e.key.toUpperCase();
      const currentQ = questions[currentIndex];
      if (!currentQ) return;

      if (pickedOption === null) {
        if (key === "A" || key === "1") handlePick(0);
        else if (key === "B" || key === "2") handlePick(1);
        else if (key === "C" || key === "3") handlePick(2);
      } else {
        if (key === "ENTER" || key === " ") {
          e.preventDefault();
          handleNextQuestion();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeScreen, currentIndex, pickedOption, questions]);

  // Start test with a specific set of questions
  const startTest = (qList: M1Question[], mode: ModeType) => {
    const scrambled = qList.map(scramble);
    setQuestions(scrambled);
    setTestMode(mode);
    setCurrentIndex(0);
    setPickedOption(null);
    setScoreRight(0);
    setScoreWrong(0);
    setAnswerLog([]);
    setActiveScreen("test");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Mode starters
  const handleStartExam = () => {
    const list = shuffle(M1_QUESTION_BANK).slice(0, 30);
    startTest(list, "exam");
  };

  const handleStartDrill = () => {
    const list = shuffle(M1_QUESTION_BANK).slice(0, 20);
    startTest(list, "drill");
  };

  const handleStartTraps = () => {
    const traps = M1_QUESTION_BANK.filter((q) => q.n === 1);
    startTest(shuffle(traps), "traps");
  };

  const handleStartMissed = () => {
    const missedKeys = Object.keys(store.missed).filter((k) => store.missed[k] > 0);
    const missedList = M1_QUESTION_BANK.filter((q) => missedKeys.includes(q.q));
    if (missedList.length > 0) {
      startTest(shuffle(missedList), "missed");
    }
  };

  const handleStartMarathon = () => {
    startTest(shuffle(M1_QUESTION_BANK), "marathon");
  };

  // Handle Option Selection
  const handlePick = (optionIdx: number) => {
    if (pickedOption !== null) return; // already answered
    const currentQ = questions[currentIndex];
    if (!currentQ) return;

    const isCorrect = optionIdx === currentQ.a;
    setPickedOption(optionIdx);

    if (isCorrect) {
      setScoreRight((prev) => prev + 1);
      sounds.playCorrect();
      updateStore((prev) => {
        const nextMissed = { ...prev.missed };
        if (nextMissed[currentQ.q]) {
          nextMissed[currentQ.q] = Math.max(0, nextMissed[currentQ.q] - 1);
          if (nextMissed[currentQ.q] === 0) delete nextMissed[currentQ.q];
        }
        return { ...prev, missed: nextMissed };
      });
    } else {
      setScoreWrong((prev) => prev + 1);
      sounds.playWrong();
      updateStore((prev) => {
        const nextMissed = { ...prev.missed };
        nextMissed[currentQ.q] = (nextMissed[currentQ.q] || 0) + 1;
        return { ...prev, missed: nextMissed };
      });
    }

    setAnswerLog((prev) => [
      ...prev,
      {
        q: currentQ,
        picked: optionIdx,
        ok: isCorrect,
      },
    ]);

    // If silent mode in exam and answered correctly, advance automatically after tiny pause
    const shouldExplain =
      testMode === "drill" ||
      testMode === "traps" ||
      testMode === "missed" ||
      store.explainOnError;

    if (!shouldExplain && isCorrect) {
      setTimeout(() => {
        advanceQuestion();
      }, 350);
    }
  };

  const advanceQuestion = () => {
    setPickedOption(null);
    if (currentIndex + 1 >= questions.length) {
      finishTest();
    } else {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    advanceQuestion();
  };

  const finishTest = () => {
    const finalRight = scoreRight + (pickedOption !== null && questions[currentIndex]?.a === pickedOption ? 1 : 0);
    const finalTotal = questions.length;
    const finalPct = Math.round((finalRight / finalTotal) * 100);

    if (testMode === "exam" && finalTotal === 30) {
      updateStore((prev) => ({
        ...prev,
        exams: [
          ...prev.exams,
          {
            score: finalRight,
            total: finalTotal,
            pct: finalPct,
            when: Date.now(),
          },
        ],
      }));
    }

    if (finalPct >= 80) {
      sounds.playVictory();
    }

    setActiveScreen("results");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Helper stats
  const totalAnswered = scoreRight + scoreWrong;
  const currentAccuracy = totalAnswered > 0 ? Math.round((scoreRight / totalAnswered) * 100) : 0;
  const missedCount = Object.keys(store.missed).filter((k) => store.missed[k] > 0).length;
  const trapCount = M1_QUESTION_BANK.filter((q) => q.n === 1).length;

  const copyShareResult = () => {
    const pct = Math.round((scoreRight / questions.length) * 100);
    const passed = pct >= 80;
    const text = `Motorcycle Knowledge Test (California Class M1)\nScore: ${scoreRight}/${questions.length} (${pct}%) — ${
      passed ? "PASSING GRADE ✓" : "NEEDS PRACTICE"
    }\nPrepared by Abdullah Al-Jarallah\nTry it here: https://ajq8.com/m1`;
    navigator.clipboard.writeText(text);
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 2500);
  };

  return (
    <div className="min-h-screen bg-[#0A0E1A] text-slate-100 font-sans selection:bg-amber-500/30 selection:text-amber-200">
      {/* Background glow effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div
          className="absolute -top-[20%] left-1/2 -translate-x-1/2 w-[800px] h-[600px] rounded-full blur-[140px] opacity-20"
          style={{ background: "radial-gradient(circle, #E8B93A 0%, #06B6D4 50%, transparent 80%)" }}
        />
        <div
          className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full blur-[160px] opacity-10"
          style={{ background: "radial-gradient(circle, #38BDF8 0%, transparent 70%)" }}
        />
      </div>

      {/* Top Utility Nav (Discreet & Sleek) */}
      <header className="border-b border-slate-800/80 bg-[#0A0E1A]/80 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="flex items-center gap-2 text-xs font-['JetBrains_Mono'] text-slate-400 hover:text-cyan-400 transition-colors py-1 px-2.5 rounded-lg hover:bg-slate-800/60"
            >
              <Home className="w-3.5 h-3.5" />
              <span>ajq8.com</span>
            </Link>
            <span className="text-slate-700">/</span>
            <span className="font-['JetBrains_Mono'] text-xs font-semibold text-amber-400 uppercase tracking-widest">
              CA M1 SIMULATOR
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() =>
                updateStore((prev) => ({ ...prev, soundEnabled: !prev.soundEnabled }))
              }
              title={store.soundEnabled ? "Mute audio" : "Enable audio"}
              className="p-2 rounded-lg text-slate-400 hover:text-amber-400 hover:bg-slate-800/80 transition-colors"
            >
              {store.soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>
            {activeScreen !== "home" && (
              <button
                onClick={() => setActiveScreen("home")}
                className="text-xs font-['JetBrains_Mono'] px-3 py-1.5 rounded-lg border border-slate-700 hover:border-slate-500 text-slate-300 hover:text-white transition-all bg-slate-900/60"
              >
                Menu
              </button>
            )}
          </div>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* SCREEN 1: HOME / MODE SELECTOR */}
      {/* ========================================================================= */}
      {activeScreen === "home" && (
        <main className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8">
          {/* Heartfelt Dedication Card (Arabic & English) */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative overflow-hidden rounded-2xl border border-amber-500/30 bg-gradient-to-b from-amber-500/10 via-slate-900/90 to-slate-950 p-6 sm:p-8 text-center shadow-[0_0_50px_rgba(232,185,58,0.12)] backdrop-blur-xl"
          >
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
            <div className="text-[11px] font-['JetBrains_Mono'] font-bold tracking-[0.25em] text-amber-400 uppercase mb-4">
              إهداء · A gift for a friend
            </div>

            <div
              className="text-2xl sm:text-3xl font-bold text-amber-100 my-3 leading-relaxed"
              style={{
                fontFamily:
                  '"SF Arabic", "Geeza Pro", "Noto Naskh Arabic", "Traditional Arabic", Tahoma, sans-serif',
                direction: "rtl",
              }}
            >
              لا تنساني من دعائك
            </div>

            <div className="flex items-center justify-center gap-3 my-4">
              <div className="h-[1px] w-16 bg-amber-500/30" />
              <span className="text-amber-400/80 text-xs">◆</span>
              <div className="h-[1px] w-16 bg-amber-500/30" />
            </div>

            <div className="space-y-1">
              <div
                className="text-lg font-semibold text-amber-300"
                style={{
                  fontFamily:
                    '"SF Arabic", "Geeza Pro", "Noto Naskh Arabic", Tahoma, sans-serif',
                  direction: "rtl",
                }}
              >
                عبدالله الجارالله
              </div>
              <div className="font-['JetBrains_Mono'] text-xs tracking-widest text-slate-400 uppercase">
                Abdullah Al-Jarallah
              </div>
            </div>
          </motion.div>

          {/* Test Header */}
          <div className="space-y-2 text-center sm:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 font-['JetBrains_Mono'] text-xs">
              <Sparkles className="w-3.5 h-3.5" />
              <span>California DL 665 · Official Standards</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white font-['Playfair_Display']">
              Motorcycle Knowledge Test
            </h1>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              Motorcycle exam simulation · <b>80% to pass</b> (24/30 correct) ·{" "}
              <span className="font-['JetBrains_Mono'] text-amber-400 font-semibold">
                {M1_QUESTION_BANK.length} verified questions
              </span>{" "}
              in the bank.
            </p>
          </div>

          {/* Pro Briefing Callout */}
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 space-y-2.5 text-xs sm:text-sm text-slate-300">
            <div className="flex items-center gap-2 font-['JetBrains_Mono'] text-xs font-bold text-cyan-400 uppercase tracking-wider">
              <BookOpen className="w-4 h-4" />
              <span>What The Real DMV Test Looks Like</span>
            </div>
            <p className="text-slate-300 leading-relaxed">
              <b>Text-only:</b> No photos, no lane-position diagrams, no hand-signal images. Three choices per question, exactly one right answer. Touchscreen terminal at the DMV office.
            </p>
            <p className="text-slate-400 leading-relaxed">
              Since you already hold a Class C (car) license, you take the <b>motorcycle knowledge test only</b> (no Class C retest). Questions are taken directly from the California Motorcycle Handbook (DL 665).
            </p>
            <div className="pt-2 border-t border-slate-800/80 flex items-center gap-2 text-amber-400/90 text-xs font-semibold">
              <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
              <span>Leave your phone in the car. Any testing aid is an automatic fail.</span>
            </div>
          </div>

          {/* Mode Selection Cards */}
          <div className="space-y-3">
            <div className="font-['JetBrains_Mono'] text-xs uppercase tracking-wider text-slate-400 font-semibold px-1">
              Select Practice Mode
            </div>

            {/* Official 30-Q Exam */}
            <button
              onClick={handleStartExam}
              className="w-full text-left p-5 rounded-xl border border-amber-500/40 hover:border-amber-400 bg-gradient-to-r from-amber-500/10 via-slate-900/90 to-slate-900 hover:from-amber-500/20 transition-all duration-200 group flex items-center justify-between shadow-lg shadow-black/40"
            >
              <div className="space-y-1 pr-4">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-base text-white group-hover:text-amber-300 transition-colors">
                    Official 30-Question DMV Exam
                  </span>
                  <span className="font-['JetBrains_Mono'] text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/40">
                    REAL FORMAT
                  </span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  30 randomized questions scored identically to the California DMV terminal. 24 correct needed to pass.
                </p>
              </div>
              <ArrowRight className="w-5 h-5 text-amber-400 group-hover:translate-x-1 transition-transform shrink-0" />
            </button>

            {/* Tricky Traps & New Material */}
            <button
              onClick={handleStartTraps}
              className="w-full text-left p-5 rounded-xl border border-cyan-500/30 hover:border-cyan-400 bg-slate-900/70 hover:bg-slate-900 transition-all duration-200 group flex items-center justify-between"
            >
              <div className="space-y-1 pr-4">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-base text-white group-hover:text-cyan-300 transition-colors">
                    Tricky Traps & Exact Numbers
                  </span>
                  <span className="font-['JetBrains_Mono'] text-[10px] font-bold px-2 py-0.5 rounded-full bg-cyan-400/20 text-cyan-300 border border-cyan-400/40">
                    {trapCount} TRAPS
                  </span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Focus specifically on tricky wording: denim pants vs leather jacket, 55 mph trailer limit, 3/4 front brake power, and decreasing radius curves.
                </p>
              </div>
              <ArrowRight className="w-5 h-5 text-cyan-400 group-hover:translate-x-1 transition-transform shrink-0" />
            </button>

            {/* Quick 20-Q Practice Drill */}
            <button
              onClick={handleStartDrill}
              className="w-full text-left p-5 rounded-xl border border-slate-800 hover:border-slate-700 bg-slate-900/60 hover:bg-slate-900 transition-all duration-200 group flex items-center justify-between"
            >
              <div className="space-y-1 pr-4">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-base text-white group-hover:text-slate-200 transition-colors">
                    Quick Practice Drill
                  </span>
                  <span className="font-['JetBrains_Mono'] text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                    20 QUESTIONS
                  </span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  20 random questions with instant deep-dive explanations after each response. Ideal for fast learning.
                </p>
              </div>
              <ArrowRight className="w-5 h-5 text-slate-400 group-hover:translate-x-1 transition-transform shrink-0" />
            </button>

            {/* Drill Missed Questions */}
            <button
              onClick={handleStartMissed}
              disabled={missedCount === 0}
              className={`w-full text-left p-5 rounded-xl border transition-all duration-200 group flex items-center justify-between ${
                missedCount > 0
                  ? "border-rose-500/30 hover:border-rose-400 bg-slate-900/60 hover:bg-slate-900"
                  : "border-slate-800/40 bg-slate-950/40 opacity-50 cursor-not-allowed"
              }`}
            >
              <div className="space-y-1 pr-4">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-base text-white">
                    Drill Your Weak Spots
                  </span>
                  {missedCount > 0 && (
                    <span className="font-['JetBrains_Mono'] text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/40">
                      {missedCount} MISSED
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {missedCount > 0
                    ? "Re-test only questions you have previously answered incorrectly until mastered."
                    : "No missed questions logged yet. Take an exam to generate your personalized review pool."}
                </p>
              </div>
              <ArrowRight className="w-5 h-5 text-rose-400 group-hover:translate-x-1 transition-transform shrink-0" />
            </button>

            {/* Full Marathon */}
            <button
              onClick={handleStartMarathon}
              className="w-full text-left p-4 rounded-xl border border-slate-800/80 hover:border-slate-700 bg-slate-900/40 hover:bg-slate-900 transition-all duration-200 group flex items-center justify-between"
            >
              <div className="space-y-0.5">
                <div className="font-bold text-sm text-slate-300 group-hover:text-white">
                  Full Bank Marathon ({M1_QUESTION_BANK.length} Questions)
                </div>
                <p className="text-xs text-slate-500">
                  The complete sweep of every single question in the California handbook.
                </p>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-500 group-hover:translate-x-1 transition-transform shrink-0" />
            </button>
          </div>

          {/* Test Preferences Toggle */}
          <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-4 flex items-center justify-between">
            <div>
              <div className="text-xs font-semibold text-slate-200">
                Instant Explanation on Incorrect Answers
              </div>
              <div className="text-[11px] text-slate-400">
                {store.explainOnError
                  ? "A missed answer pauses and explains the DMV rule immediately."
                  : "Silent exam — review misses at the end like the real DMV terminal."}
              </div>
            </div>
            <button
              onClick={() =>
                updateStore((prev) => ({
                  ...prev,
                  explainOnError: !prev.explainOnError,
                }))
              }
              className={`font-['JetBrains_Mono'] text-xs font-bold px-3 py-1.5 rounded-lg border transition-colors ${
                store.explainOnError
                  ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40"
                  : "bg-slate-800 text-slate-400 border-slate-700"
              }`}
            >
              {store.explainOnError ? "ON" : "OFF"}
            </button>
          </div>

          {/* Practice History Summary */}
          {store.exams.length > 0 && (
            <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-5 space-y-3 font-['JetBrains_Mono'] text-xs">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2 text-slate-400 font-bold uppercase tracking-wider">
                <span>Personal Performance History</span>
                <button
                  onClick={() =>
                    updateStore((prev) => ({
                      ...prev,
                      exams: [],
                      missed: {},
                    }))
                  }
                  className="text-slate-500 hover:text-rose-400 text-[10px] transition-colors"
                >
                  Clear History
                </button>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                <div className="p-3 bg-slate-950/60 rounded-lg border border-slate-800">
                  <div className="text-slate-500 text-[10px] uppercase">Exams Taken</div>
                  <div className="text-lg font-bold text-white mt-0.5">{store.exams.length}</div>
                </div>
                <div className="p-3 bg-slate-950/60 rounded-lg border border-slate-800">
                  <div className="text-slate-500 text-[10px] uppercase">Best Score</div>
                  <div className="text-lg font-bold text-amber-400 mt-0.5">
                    {Math.max(...store.exams.map((e) => e.score))}/30
                  </div>
                </div>
                <div className="p-3 bg-slate-950/60 rounded-lg border border-slate-800">
                  <div className="text-slate-500 text-[10px] uppercase">Last Score</div>
                  <div className="text-lg font-bold text-cyan-400 mt-0.5">
                    {store.exams[store.exams.length - 1]?.pct}%
                  </div>
                </div>
                <div className="p-3 bg-slate-950/60 rounded-lg border border-slate-800">
                  <div className="text-slate-500 text-[10px] uppercase">Questions Weak</div>
                  <div className="text-lg font-bold text-rose-400 mt-0.5">{missedCount}</div>
                </div>
              </div>
            </div>
          )}
        </main>
      )}

      {/* ========================================================================= */}
      {/* SCREEN 2: ACTIVE TEST (PRO SCOREBOARD HUD + QUESTION) */}
      {/* ========================================================================= */}
      {activeScreen === "test" && questions[currentIndex] && (
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 space-y-6">
          {/* ALWAYS VISIBLE PRO SCOREBOARD HUD (Sticky & Prominent) */}
          <div className="sticky top-20 z-30 rounded-2xl border border-cyan-500/30 bg-slate-950/95 backdrop-blur-xl p-4 shadow-2xl space-y-3 font-['JetBrains_Mono']">
            <div className="flex flex-wrap items-center justify-between gap-3">
              {/* Question counter & Topic */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-300">
                  QUESTION <span className="text-white font-extrabold text-sm">{currentIndex + 1}</span> / {questions.length}
                </span>
                <span className="text-slate-600">·</span>
                <span className="text-[11px] text-amber-400 font-semibold uppercase tracking-wider">
                  {questions[currentIndex].t}
                </span>
              </div>

              {/* ALWAYS SHOW SCORE: Correct vs Wrong Counter */}
              <div className="flex items-center gap-2 text-xs">
                {/* Correct Badge */}
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{scoreRight} Right</span>
                </div>

                {/* Wrong Badge */}
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/15 border border-rose-500/30 text-rose-400 font-bold">
                  <XCircle className="w-3.5 h-3.5" />
                  <span>{scoreWrong} Wrong</span>
                </div>

                {/* Accuracy / Passing Pace indicator */}
                <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-300 text-[11px]">
                  <span>Rate: <b>{currentAccuracy}%</b></span>
                  {totalAnswered > 0 && (
                    <span
                      className={`font-bold ml-1 ${
                        currentAccuracy >= 80 ? "text-emerald-400" : "text-amber-400"
                      }`}
                    >
                      {currentAccuracy >= 80 ? "● PASSING PACE" : "▲ NEEDS 80%"}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-cyan-400 via-amber-400 to-emerald-400 rounded-full"
                animate={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
                transition={{ duration: 0.25, ease: "easeOut" }}
              />
            </div>
          </div>

          {/* Question Card */}
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="rounded-2xl border border-slate-800 bg-slate-900/80 backdrop-blur-xl p-6 sm:p-8 space-y-6 shadow-xl"
          >
            {/* Trap indicator badge if n===1 */}
            {questions[currentIndex].n === 1 && (
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-['JetBrains_Mono'] font-bold">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>CRITICAL DMV TRAP QUESTION</span>
              </div>
            )}

            {/* Question Text */}
            <h2 className="text-xl sm:text-2xl font-bold text-white leading-relaxed">
              {questions[currentIndex].q}
            </h2>

            {/* Options */}
            <div className="space-y-3 pt-2">
              {questions[currentIndex].o.map((optText, idx) => {
                const isSelected = pickedOption === idx;
                const isCorrect = idx === questions[currentIndex].a;
                const hasAnswered = pickedOption !== null;

                let btnStyles =
                  "border-slate-800 hover:border-amber-400/50 hover:bg-slate-800/70 text-slate-200 bg-slate-950/60";
                let badgeStyles = "border-slate-700 text-slate-400 bg-slate-900";

                if (hasAnswered) {
                  if (isCorrect) {
                    btnStyles =
                      "border-emerald-500 bg-emerald-500/15 text-white font-medium shadow-[0_0_20px_rgba(16,185,129,0.2)]";
                    badgeStyles = "border-emerald-500 bg-emerald-500 text-slate-950 font-bold";
                  } else if (isSelected && !isCorrect) {
                    btnStyles =
                      "border-rose-500 bg-rose-500/15 text-rose-200 font-medium shadow-[0_0_20px_rgba(244,63,94,0.2)]";
                    badgeStyles = "border-rose-500 bg-rose-500 text-white font-bold";
                  } else {
                    btnStyles = "border-slate-800/40 bg-slate-950/30 text-slate-500 opacity-60";
                    badgeStyles = "border-slate-800 text-slate-600 bg-slate-950";
                  }
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handlePick(idx)}
                    disabled={hasAnswered}
                    className={`w-full text-left p-4 sm:p-5 rounded-xl border transition-all duration-150 flex items-start gap-3.5 group relative ${btnStyles}`}
                  >
                    <span
                      className={`font-['JetBrains_Mono'] text-xs w-6 h-6 rounded flex items-center justify-center shrink-0 border mt-0.5 ${badgeStyles}`}
                    >
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="text-sm sm:text-base leading-relaxed flex-1">
                      {optText}
                    </span>
                    {hasAnswered && isCorrect && (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    )}
                    {hasAnswered && isSelected && !isCorrect && (
                      <XCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Keyboard shortcut hint */}
            {pickedOption === null && (
              <div className="text-[11px] font-['JetBrains_Mono'] text-slate-500 flex items-center justify-between pt-2">
                <span>Tip: Press A, B, or C on keyboard</span>
                <span>Touch or click to select</span>
              </div>
            )}

            {/* Post-Answer Explanation Box */}
            {pickedOption !== null && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className={`rounded-xl p-4 sm:p-5 border space-y-2 text-sm leading-relaxed ${
                  pickedOption === questions[currentIndex].a
                    ? "bg-emerald-950/20 border-emerald-500/30 text-emerald-100"
                    : "bg-rose-950/20 border-rose-500/30 text-rose-100"
                }`}
              >
                <div className="flex items-center gap-2 font-['JetBrains_Mono'] font-bold text-xs uppercase tracking-wider">
                  {pickedOption === questions[currentIndex].a ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span className="text-emerald-400">Correct Answer</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-4 h-4 text-rose-400" />
                      <span className="text-rose-400">
                        Incorrect — Correct is Option{" "}
                        {String.fromCharCode(65 + questions[currentIndex].a)}
                      </span>
                    </>
                  )}
                </div>

                <p className="text-slate-300 text-xs sm:text-sm pt-1">
                  {questions[currentIndex].e}
                </p>
              </motion.div>
            )}

            {/* Next Button Footer */}
            {pickedOption !== null && (
              <div className="pt-4 flex items-center justify-between border-t border-slate-800/80">
                <div className="text-xs text-slate-400 font-['JetBrains_Mono'] hidden sm:block">
                  Press <kbd className="px-1.5 py-0.5 bg-slate-800 rounded border border-slate-700">Enter</kbd> or <kbd className="px-1.5 py-0.5 bg-slate-800 rounded border border-slate-700">Space</kbd>
                </div>
                <button
                  onClick={handleNextQuestion}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-sm transition-all shadow-[0_0_20px_rgba(232,185,58,0.3)] flex items-center justify-center gap-2 ml-auto"
                >
                  <span>{currentIndex + 1 >= questions.length ? "View Final Results" : "Next Question"}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SCREEN 3: RESULTS & DIAGNOSTIC REVIEW */}
      {/* ========================================================================= */}
      {activeScreen === "results" && (
        <main className="max-w-3xl mx-auto px-4 sm:px-6 py-10 space-y-8">
          {/* Big Verdict Banner */}
          {(() => {
            const finalTotal = questions.length;
            const finalPct = Math.round((scoreRight / finalTotal) * 100);
            const passed = finalPct >= 80;

            return (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`rounded-2xl border p-8 text-center space-y-4 shadow-2xl relative overflow-hidden backdrop-blur-xl ${
                  passed
                    ? "border-emerald-500/50 bg-gradient-to-b from-emerald-500/10 via-slate-900/90 to-slate-950"
                    : "border-rose-500/50 bg-gradient-to-b from-rose-500/10 via-slate-900/90 to-slate-950"
                }`}
              >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/80 border border-slate-800 font-['JetBrains_Mono'] text-xs font-bold uppercase tracking-wider text-slate-300">
                  {passed ? "Official DMV Standard Met" : "Standard: 80% to Pass"}
                </div>

                <div className="space-y-1">
                  <div
                    className={`font-['JetBrains_Mono'] text-6xl sm:text-7xl font-extrabold tracking-tight ${
                      passed ? "text-emerald-400" : "text-rose-400"
                    }`}
                  >
                    {scoreRight}
                    <span className="text-2xl text-slate-500 font-normal">/{finalTotal}</span>
                  </div>
                  <div className="font-['JetBrains_Mono'] text-lg font-bold text-white">
                    Score: {finalPct}% · {passed ? "PASSED" : "FAILED"}
                  </div>
                </div>

                <p className="text-slate-300 text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
                  {passed
                    ? `Congratulations! On the official 30-question DMV test, you would have passed ${
                        scoreRight >= 27 ? "comfortably!" : "with room to spare."
                      }`
                    : `You need 24 of 30 questions correct (80%) to pass the California M1 test. You missed ${scoreWrong} question${
                        scoreWrong === 1 ? "" : "s"
                      }. Review your missed questions below.`}
                </p>

                {/* Action Buttons */}
                <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
                  <button
                    onClick={handleStartExam}
                    className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs font-['JetBrains_Mono'] transition-all shadow-md shadow-amber-500/20"
                  >
                    Retake Full 30-Q Exam
                  </button>

                  {scoreWrong > 0 && (
                    <button
                      onClick={() => {
                        const wrongSources = answerLog.filter((item) => !item.ok).map((item) => item.q.raw);
                        startTest(shuffle(wrongSources), "missed");
                      }}
                      className="px-5 py-2.5 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/40 font-bold text-xs font-['JetBrains_Mono'] transition-all"
                    >
                      Drill These {scoreWrong} Missed Questions
                    </button>
                  )}

                  <button
                    onClick={copyShareResult}
                    className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-['JetBrains_Mono'] transition-colors flex items-center gap-1.5 border border-slate-700"
                  >
                    {copiedShare ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
                    <span>{copiedShare ? "Score Copied!" : "Share Result"}</span>
                  </button>

                  <button
                    onClick={() => setActiveScreen("home")}
                    className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 text-xs font-['JetBrains_Mono'] transition-colors"
                  >
                    Main Menu
                  </button>
                </div>
              </motion.div>
            );
          })()}

          {/* Topic Performance Breakdown */}
          {(() => {
            const byTopic: Record<string, { ok: number; total: number }> = {};
            answerLog.forEach((item) => {
              const t = item.q.t;
              if (!byTopic[t]) byTopic[t] = { ok: 0, total: 0 };
              byTopic[t].total += 1;
              if (item.ok) byTopic[t].ok += 1;
            });

            const topicEntries = Object.entries(byTopic).sort(
              (a, b) => a[1].ok / a[1].total - b[1].ok / b[1].total
            );

            return (
              <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-4 font-['JetBrains_Mono'] text-xs">
                <div className="font-bold text-slate-300 uppercase tracking-wider border-b border-slate-800 pb-2">
                  Topic Mastery Breakdown
                </div>
                <div className="space-y-3">
                  {topicEntries.map(([topic, stats]) => {
                    const p = Math.round((stats.ok / stats.total) * 100);
                    const color =
                      p >= 80 ? "bg-emerald-400" : p >= 60 ? "bg-amber-400" : "bg-rose-500";
                    return (
                      <div key={topic} className="space-y-1">
                        <div className="flex items-center justify-between text-slate-300">
                          <span>{topic}</span>
                          <span className="font-bold">
                            {stats.ok}/{stats.total} ({p}%)
                          </span>
                        </div>
                        <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                          <div className={`h-full ${color} rounded-full`} style={{ width: `${p}%` }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })()}

          {/* Detailed Missed Questions Review */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-lg text-white font-['Playfair_Display']">
                Detailed Answer Review
              </h3>
              <span className="font-['JetBrains_Mono'] text-xs text-slate-400">
                {scoreWrong} missed / {questions.length} total
              </span>
            </div>

            {scoreWrong === 0 ? (
              <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/20 p-6 text-center text-emerald-300 text-sm font-semibold">
                🎉 Perfect run! You did not miss a single question.
              </div>
            ) : (
              <div className="space-y-4">
                {answerLog
                  .filter((item) => !item.ok)
                  .map((item, idx) => (
                    <div
                      key={idx}
                      className="rounded-xl border border-slate-800 bg-slate-900/80 p-5 space-y-3 text-xs sm:text-sm"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-['JetBrains_Mono'] text-[11px] font-bold text-amber-400 uppercase">
                          {item.q.t}
                        </span>
                        <span className="font-['JetBrains_Mono'] text-[10px] bg-rose-500/20 text-rose-300 border border-rose-500/40 px-2 py-0.5 rounded">
                          MISSED
                        </span>
                      </div>

                      <div className="font-semibold text-white text-base">
                        {item.q.q}
                      </div>

                      <div className="space-y-1.5 font-['JetBrains_Mono'] text-xs">
                        <div className="p-2 rounded bg-rose-950/30 border border-rose-500/20 text-rose-300 flex items-start gap-2">
                          <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                          <div>
                            <span className="font-bold">You picked: </span>
                            {item.q.o[item.picked]}
                          </div>
                        </div>

                        <div className="p-2 rounded bg-emerald-950/30 border border-emerald-500/20 text-emerald-300 flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <div>
                            <span className="font-bold">Correct answer: </span>
                            {item.q.o[item.q.a]}
                          </div>
                        </div>
                      </div>

                      <div className="text-slate-400 text-xs border-t border-slate-800/80 pt-2 leading-relaxed">
                        <b>Handbook Rule:</b> {item.q.e}
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>

          {/* Heartfelt Sign-off */}
          <div className="border-t border-slate-800 pt-8 text-center space-y-2">
            <div
              className="text-xl text-amber-200/80 font-bold"
              style={{
                fontFamily:
                  '"SF Arabic", "Geeza Pro", "Noto Naskh Arabic", Tahoma, sans-serif',
                direction: "rtl",
              }}
            >
              لا تنساني من دعائك
            </div>
            <div className="text-xs font-['JetBrains_Mono'] text-slate-500 uppercase tracking-widest">
              عبدالله الجارالله · Abdullah Al-Jarallah
            </div>
          </div>
        </main>
      )}
    </div>
  );
}
