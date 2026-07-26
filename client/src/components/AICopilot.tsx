import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "wouter";
import {
  Sparkles,
  Bot,
  Send,
  X,
  TrendingUp,
  BarChart3,
  Code,
  Award,
  Terminal,
  ArrowRight,
  RotateCcw,
  CheckCircle2,
  Cpu,
  Layers,
  Search,
  ExternalLink,
  BookOpen,
  User,
  ShieldCheck,
  Zap,
  FileText,
  Download,
} from "lucide-react";

// GenUI Card 1: Interactive Project Impact Calculator / View
function ProjectImpactCard({ title, tags, slug }: { title: string; tags: string[]; slug?: string }) {
  const [, setLocation] = useLocation();
  const [budget, setBudget] = useState(50000);
  const [lift, setLift] = useState(14.5);

  const calculateROI = () => {
    const incrementalRevenue = budget * (lift / 100) * 3.2;
    return incrementalRevenue.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-slate-900/90 border border-cyan-500/30 rounded-xl p-4 my-2 shadow-lg backdrop-blur-md text-sm text-slate-100 font-sans"
    >
      <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-3">
        <div className="flex items-center gap-2 font-['JetBrains_Mono']">
          <Terminal className="w-4 h-4 text-cyan-400" />
          <span className="font-semibold text-cyan-400">{title}</span>
        </div>
        <span className="text-[10px] font-['JetBrains_Mono'] bg-cyan-500/20 text-cyan-300 px-2 py-0.5 rounded-full border border-cyan-500/30">
          Interactive GenUI
        </span>
      </div>

      <p className="text-xs text-slate-300 mb-3">
        Adjust parameters to simulate live business lift & incremental return for this portfolio project:
      </p>

      <div className="space-y-3 mb-4 font-['JetBrains_Mono']">
        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="text-slate-400">Simulated Budget:</span>
            <span className="font-mono text-cyan-300">${budget.toLocaleString()}</span>
          </div>
          <input
            type="range"
            min="10000"
            max="200000"
            step="5000"
            value={budget}
            onChange={(e) => setBudget(Number(e.target.value))}
            className="w-full accent-cyan-400 bg-slate-800 rounded-lg appearance-none h-1.5 cursor-pointer"
          />
        </div>

        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="text-slate-400 font-sans">Projected Lift:</span>
            <span className="font-mono text-cyan-300">{lift}%</span>
          </div>
          <input
            type="range"
            min="5"
            max="35"
            step="0.5"
            value={lift}
            onChange={(e) => setLift(Number(e.target.value))}
            className="w-full accent-cyan-400 bg-slate-800 rounded-lg appearance-none h-1.5 cursor-pointer"
          />
        </div>
      </div>

      <div className="bg-slate-950/80 border border-cyan-500/20 rounded-lg p-3 flex items-center justify-between mb-3 font-['JetBrains_Mono']">
        <div>
          <div className="text-[10px] uppercase tracking-wider text-slate-400 font-sans">Est. Incremental Return</div>
          <div className="text-lg font-bold font-mono text-emerald-400">{calculateROI()}</div>
        </div>
        <div className="flex items-center gap-1 text-xs text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded border border-emerald-500/20 font-sans font-bold">
          <TrendingUp className="w-3.5 h-3.5" />
          <span>3.2x ROAS</span>
        </div>
      </div>

      {slug && (
        <button
          onClick={() => setLocation(`/projects/${slug}`)}
          className="w-full py-2 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 rounded-lg text-xs font-['JetBrains_Mono'] font-bold transition-colors flex items-center justify-center gap-1.5 mb-3"
        >
          <span>Open Full Interactive Project</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      )}

      <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-800/80 font-['JetBrains_Mono']">
        {tags.map((t, idx) => (
          <span key={idx} className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded">
            {t}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

// GenUI Card 2: Interactive Skills Radar / Breakdown
function SkillsRadarCard() {
  const skills = [
    { name: "Bayesian MMM & Econometrics", level: 96, category: "Marketing Science" },
    { name: "Python / PyMC / Optimization", level: 94, category: "Data Science" },
    { name: "Claude MCP & Agentic Workflows", level: 95, category: "AI Engineering" },
    { name: "Causal Inference & DiD", level: 91, category: "Marketing Science" },
    { name: "SQL & Data Pipeline Architecture", level: 88, category: "Engineering" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-slate-900/90 border border-purple-500/30 rounded-xl p-4 my-2 shadow-lg backdrop-blur-md text-sm text-slate-100 font-sans"
    >
      <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-3">
        <div className="flex items-center gap-2 font-['JetBrains_Mono']">
          <BarChart3 className="w-4 h-4 text-purple-400" />
          <span className="font-semibold text-purple-400">Core Competencies & Stack</span>
        </div>
        <span className="text-[10px] font-['JetBrains_Mono'] bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded-full border border-purple-500/30">
          Verified Capabilities
        </span>
      </div>

      <p className="text-xs text-slate-300 mb-3">
        MSBA Candidate @ UC San Diego (Expected Dec 2026). 10+ years bridging data science, marketing leadership, and AI agents.
      </p>

      <div className="space-y-3 font-['JetBrains_Mono']">
        {skills.map((skill, idx) => (
          <div key={idx} className="space-y-1">
            <div className="flex justify-between text-xs">
              <span className="font-medium text-slate-200">{skill.name}</span>
              <span className="font-mono text-purple-300">{skill.level}%</span>
            </div>
            <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden p-0.5 border border-slate-700/50">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${skill.level}%` }}
                transition={{ duration: 1, delay: idx * 0.12, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-purple-500 to-cyan-400 rounded-full"
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 p-2.5 bg-purple-950/30 border border-purple-500/20 rounded-lg flex items-center gap-2 text-xs text-purple-200">
        <Award className="w-4 h-4 text-purple-400 shrink-0" />
        <span>STEM-designated MSBA curriculum emphasizing advanced measurement and econometric modeling.</span>
      </div>
    </motion.div>
  );
}

// GenUI Card 3: Executive Summary & Background
function ExecSummaryCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-slate-900/90 border border-emerald-500/30 rounded-xl p-4 my-2 shadow-lg backdrop-blur-md text-sm text-slate-100 font-sans"
    >
      <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-3">
        <div className="flex items-center gap-2 font-['JetBrains_Mono']">
          <Award className="w-4 h-4 text-emerald-400" />
          <span className="font-semibold text-emerald-400">Executive Profile</span>
        </div>
        <span className="text-[10px] font-['JetBrains_Mono'] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-500/30">
          10+ Years Exp
        </span>
      </div>

      <div className="space-y-3 text-xs text-slate-300">
        <div className="flex gap-3 items-start">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
          <div>
            <strong className="text-slate-100 block mb-0.5">Marketing Portfolio Operator ($30M+ Budgets)</strong>
            Managed multi-million dollar portfolios across Kuwait Finance House, government social security, and enterprise tech.
          </div>
        </div>

        <div className="flex gap-3 items-start">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
          <div>
            <strong className="text-slate-100 block mb-0.5">MSBA @ UC San Diego Rady (Expected Dec 2026)</strong>
            Specializing in Bayesian MMM, PyMC econometrics, causal inference, and LLM agent systems.
          </div>
        </div>

        <div className="flex gap-3 items-start">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
          <div>
            <strong className="text-slate-100 block mb-0.5">Venture Founder & AI Engineer</strong>
            Built production AI platforms (Macy's Coworker, Neural Vault, EquiLedger) combining FastMCP, FAISS RAG, and PyMC.
          </div>
        </div>
      </div>
    </motion.div>
  );
}

interface Message {
  id: string;
  sender: "user" | "ai";
  text: string;
  isStreaming?: boolean;
  genUIType?: "project" | "skills" | "summary" | null;
  projectData?: { title: string; tags: string[]; slug?: string };
}

export default function AICopilot() {
  const [, setLocation] = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "ai",
      text: "Hello! I am Abdullah's AI Copilot. Powered by local portfolio knowledge & WebMCP tools, I can analyze his **Bayesian MMM models**, walk through the **Macy's AI Marketing Coworker**, evaluate his **UC San Diego MSBA curriculum**, or calculate marketing ROI. What would you like to explore?",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const [thinkingStep, setThinkingStep] = useState<string>("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isThinking, isOpen, thinkingStep]);

  // Token Streaming Simulation Helper
  const streamResponse = (
    fullText: string,
    genUIType: "project" | "skills" | "summary" | null = null,
    projectData?: { title: string; tags: string[]; slug?: string }
  ) => {
    const messageId = Date.now().toString();
    const words = fullText.split(" ");
    let currentText = "";

    // Add initial empty message
    setMessages((prev) => [
      ...prev,
      {
        id: messageId,
        sender: "ai",
        text: "",
        isStreaming: true,
        genUIType,
        projectData,
      },
    ]);

    let wordIdx = 0;
    const interval = setInterval(() => {
      if (wordIdx < words.length) {
        currentText += (wordIdx === 0 ? "" : " ") + words[wordIdx];
        setMessages((prev) =>
          prev.map((msg) => (msg.id === messageId ? { ...msg, text: currentText } : msg))
        );
        wordIdx++;
      } else {
        clearInterval(interval);
        setMessages((prev) =>
          prev.map((msg) => (msg.id === messageId ? { ...msg, isStreaming: false } : msg))
        );
      }
    }, 28); // 28ms token streaming speed
  };

  const handleSend = (userText: string) => {
    if (!userText.trim() || isThinking) return;

    const newMsg: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: userText,
    };

    setMessages((prev) => [...prev, newMsg]);
    setInputValue("");
    setIsThinking(true);

    // Multi-step thinking simulation
    setThinkingStep("Parsing intent & extracting semantic tags...");
    setTimeout(() => {
      setThinkingStep("Querying portfolio FAISS vector index & WebMCP context...");
      setTimeout(() => {
        setThinkingStep("Generating response tokens...");
        setTimeout(() => {
          setIsThinking(false);
          setThinkingStep("");

          const query = userText.toLowerCase();
          let responseText = "";
          let genUIType: "project" | "skills" | "summary" | null = null;
          let projectData: { title: string; tags: string[]; slug?: string } = {
            title: "Macy's AI Marketing Coworker",
            tags: ["Next.js", "Python", "FastAPI", "FAISS RAG", "MCP"],
            slug: "macys-ai-coworker",
          };

          if (query.includes("macy")) {
            genUIType = "project";
            projectData = {
              title: "Macy's AI Marketing Coworker",
              tags: ["Next.js", "FastAPI", "FAISS RAG", "Claude", "FastMCP"],
              slug: "macys-ai-coworker",
            };
            responseText =
              "The Macy's AI Marketing Coworker is a production-deployed AI system combining 6 deterministic Python automations, 3 LLM-powered skills (Claude 3.5 Sonnet), 3 FastMCP protocol tools, and FAISS RAG across 12 brand compliance docs. It automates campaign briefs, K-Means RFM audience clustering, DAM asset discovery, MAP price validation, and generates 40 localized regional variants.";
          } else if (query.includes("bayesian") || query.includes("mmm") || query.includes("roi") || query.includes("direct avenue")) {
            genUIType = "project";
            projectData = {
              title: "Bayesian MMM Capstone (Direct Avenue)",
              tags: ["PyMC", "Bayesian MMM", "Streamlit", "Adstock Decay", "Hill Saturation"],
              slug: "bayesian-mmm-capstone",
            };
            responseText =
              "Abdullah owns the advertiser learning agenda and PyMC Bayesian Marketing Mix Modeling (MMM) decision-support pipeline for Direct Avenue, a US performance media agency. The system applies geometric adstock decay (θ) and Hill saturation curves to compute real-time channel mROAS and optimal budget reallocation.";
          } else if (query.includes("equiledger") || query.includes("splitwise") || query.includes("debt")) {
            genUIType = "project";
            projectData = {
              title: "EquiLedger Expense Engine",
              tags: ["React", "TypeScript", "Turso SQLite", "Integer Cents", "Greedy Algorithm"],
              slug: "equiledger",
            };
            responseText =
              "EquiLedger is a frictionless, account-free Splitwise alternative built with React, Turso SQLite, and PWA capabilities. Money is stored as integer cents to eliminate floating-point rounding errors, and features a greedy debt-simplification algorithm that settles any group in at most n - 1 transactions.";
          } else if (query.includes("vault") || query.includes("neural") || query.includes("obsidian")) {
            genUIType = "project";
            projectData = {
              title: "Neural Vault Knowledge System",
              tags: ["Claude", "Obsidian", "MCP", "Context Injection Protocol", "Python"],
              slug: "neural-vault",
            };
            responseText =
              "Neural Vault is a two-layer AI knowledge architecture presented at UCSD MGTA 454. It links Claude's native memory with a structured Obsidian wiki via a Context Injection Protocol (CIP), reducing token context overhead by 62% while preserving 94% retrieval precision.";
          } else if (query.includes("skill") || query.includes("stack") || query.includes("python") || query.includes("pymc") || query.includes("sql")) {
            genUIType = "skills";
            responseText =
              "Abdullah combines deep marketing science with modern AI engineering. His core technical stack includes PyMC Bayesian Econometrics, Python (polars, scikit-learn), Claude MCP & FastMCP server design, Causal Inference (Difference-in-Differences), SQL pipeline design, and full-stack React/TypeScript.";
          } else if (query.includes("background") || query.includes("resume") || query.includes("experience") || query.includes("education") || query.includes("ucsd") || query.includes("kuwait")) {
            genUIType = "summary";
            responseText =
              "Abdullah has over 10 years of experience managing $30M+ marketing portfolios in banking, government, and enterprise tech (Kuwait Finance House). He is currently completing his STEM-designated MSBA at UC San Diego Rady School of Management (Expected Dec 2026), specializing in marketing analytics and applied AI systems.";
          } else {
            genUIType = "skills";
            responseText =
              "I am Abdullah's portfolio AI Copilot. Abdullah is an MSBA Candidate at UC San Diego (Expected Dec 2026) specializing in Bayesian Marketing Mix Modeling, FastMCP protocol tools, Causal Inference, and full-stack AI applications. Here is a verified breakdown of his technical competencies:";
          }

          streamResponse(responseText, genUIType, projectData);
        }, 300);
      }, 400);
    }, 400);
  };

  const handleReset = () => {
    setMessages([
      {
        id: Date.now().toString(),
        sender: "ai",
        text: "Conversation reset! What else would you like to explore regarding Abdullah's projects, technical stack, or background?",
      },
    ]);
  };

  const suggestionChips = [
    "🚀 Macy's AI Coworker Specs",
    "📊 Model Bayesian MMM ROI",
    "💡 EquiLedger Debt Algorithm",
    "🧠 Neural Vault Architecture",
    "💼 View Executive Summary",
  ];

  return (
    <>
      {/* Floating Trigger Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative group flex items-center gap-2.5 bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-slate-950 font-bold px-5 py-3 rounded-full shadow-[0_0_30px_rgba(6,182,212,0.4)] hover:shadow-[0_0_40px_rgba(6,182,212,0.6)] transition-all duration-300 scale-100 active:scale-95"
        >
          <span className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 blur opacity-50 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
          <Bot className="w-5 h-5 text-slate-950 animate-bounce" />
          <span className="text-sm font-['JetBrains_Mono'] font-bold text-white tracking-wide">Ask AI Copilot</span>
          <Sparkles className="w-4 h-4 text-cyan-200 animate-pulse" />
        </button>
      </motion.div>

      {/* Glassmorphic AI Copilot Workspace Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-24 right-6 z-50 w-[450px] max-w-[calc(100vw-2rem)] h-[620px] max-h-[calc(100vh-8rem)] backdrop-blur-xl bg-slate-950/90 border border-cyan-500/30 shadow-[0_0_50px_rgba(6,182,212,0.25)] rounded-2xl flex flex-col overflow-hidden text-slate-100 font-sans"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800/80 bg-slate-900/60 font-['JetBrains_Mono']">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-500 to-purple-500 flex items-center justify-center shadow-md shadow-cyan-500/20">
                  <Bot className="w-4 h-4 text-slate-950" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-slate-100">AJ AI Copilot</span>
                    <span className="text-[9px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded border border-emerald-500/30 font-bold">
                      STREAMING LLM
                    </span>
                  </div>
                  <div className="text-[10px] text-slate-400">FAISS RAG + WebMCP Protocol Engine</div>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={handleReset}
                  title="Reset Conversation"
                  className="text-slate-400 hover:text-slate-200 hover:bg-slate-800 p-1.5 rounded-lg transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-slate-400 hover:text-slate-200 hover:bg-slate-800 p-1.5 rounded-lg transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Message Thread Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}
                >
                  <div
                    className={`max-w-[90%] rounded-2xl px-4 py-3 text-xs leading-relaxed shadow-md ${
                      msg.sender === "user"
                        ? "bg-gradient-to-r from-cyan-500 to-cyan-600 text-slate-950 font-bold"
                        : "bg-slate-900/90 border border-slate-800 text-slate-200 font-sans"
                    }`}
                  >
                    {msg.text}
                    {msg.isStreaming && <span className="inline-block w-1.5 h-3 bg-cyan-400 ml-1 animate-pulse" />}
                  </div>

                  {/* Render Declarative GenUI components if present */}
                  {!msg.isStreaming && msg.genUIType === "project" && msg.projectData && (
                    <div className="w-full mt-2">
                      <ProjectImpactCard
                        title={msg.projectData.title}
                        tags={msg.projectData.tags}
                        slug={msg.projectData.slug}
                      />
                    </div>
                  )}
                  {!msg.isStreaming && msg.genUIType === "skills" && (
                    <div className="w-full mt-2">
                      <SkillsRadarCard />
                    </div>
                  )}
                  {!msg.isStreaming && msg.genUIType === "summary" && (
                    <div className="w-full mt-2">
                      <ExecSummaryCard />
                    </div>
                  )}
                </motion.div>
              ))}

              {/* Multi-step Thinking State Indicator */}
              {isThinking && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center gap-3 bg-slate-900/80 border border-cyan-500/30 rounded-xl px-4 py-3 max-w-[90%] font-['JetBrains_Mono']"
                >
                  <div className="flex gap-1.5 items-center">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                    <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  </div>
                  <span className="text-[11px] text-cyan-300">{thinkingStep}</span>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Prompt Suggestion Chips */}
            <div className="px-3 py-2 bg-slate-900/50 border-t border-slate-800/50 flex gap-1.5 overflow-x-auto scrollbar-none whitespace-nowrap font-['JetBrains_Mono']">
              {suggestionChips.map((chip, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(chip.replace(/^[^\w]+/, "").trim())}
                  disabled={isThinking}
                  className="text-[11px] bg-slate-800/80 hover:bg-slate-700/80 text-slate-300 hover:text-cyan-300 border border-slate-700/80 hover:border-cyan-500/40 px-3 py-1 rounded-full transition-all shrink-0 active:scale-95 disabled:opacity-50"
                >
                  {chip}
                </button>
              ))}
            </div>

            {/* Input Area */}
            <div className="p-3 bg-slate-900/90 border-t border-slate-800/80 flex items-center gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend(inputValue)}
                placeholder="Ask about Macy's AI, PyMC MMM, Neural Vault, or stack..."
                disabled={isThinking}
                className="flex-1 bg-slate-950 border border-slate-800 focus:border-cyan-500/60 rounded-xl px-4 py-2.5 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-500/60 transition-all font-['JetBrains_Mono'] disabled:opacity-50"
              />
              <button
                onClick={() => handleSend(inputValue)}
                disabled={!inputValue.trim() || isThinking}
                className="bg-gradient-to-r from-cyan-500 to-indigo-500 hover:from-cyan-400 hover:to-indigo-400 text-slate-950 p-2.5 rounded-xl transition-all shadow-md hover:shadow-cyan-500/20 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
