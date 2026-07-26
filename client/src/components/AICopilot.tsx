import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Bot, Send, X, TrendingUp, BarChart3, Code, Award, Terminal, ArrowRight, RotateCcw, CheckCircle2 } from "lucide-react";

// GenUI Card 1: Interactive Project Impact Calculator / View
function ProjectImpactCard({ title, tags }: { title: string; tags: string[] }) {
  const [budget, setBudget] = useState(50000);
  const [lift, setLift] = useState(14.5);

  const calculateROI = () => {
    const incrementalRevenue = (budget * (lift / 100)) * 3.2;
    return incrementalRevenue.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }} 
      animate={{ opacity: 1, y: 0 }} 
      className="bg-slate-900/90 border border-cyan-500/30 rounded-xl p-4 my-2 shadow-lg backdrop-blur-md text-sm text-slate-100"
    >
      <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-3">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-cyan-400" />
          <span className="font-semibold text-cyan-400">{title}</span>
        </div>
        <span className="text-[10px] bg-cyan-500/20 text-cyan-300 px-2 py-0.5 rounded-full border border-cyan-500/30">GenUI Active</span>
      </div>

      <p className="text-xs text-slate-300 mb-3">
        Interactive Bayesian MMM & RAG impact simulation. Adjust the parameters below to project estimated incremental client returns:
      </p>

      <div className="space-y-3 mb-4">
        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="text-slate-400">Simulated Ad / Tech Budget:</span>
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
            <span className="text-slate-400">Projected Performance Lift:</span>
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

      <div className="bg-slate-950/80 border border-cyan-500/20 rounded-lg p-3 flex items-center justify-between">
        <div>
          <div className="text-[10px] uppercase tracking-wider text-slate-400">Est. Incremental Return</div>
          <div className="text-lg font-bold font-mono text-emerald-400">{calculateROI()}</div>
        </div>
        <div className="flex items-center gap-1 text-xs text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded border border-emerald-500/20">
          <TrendingUp className="w-3.5 h-3.5" />
          <span>3.2x ROAS</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-slate-800/80">
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
    { name: "Bayesian MMM & Econometrics", level: 95, category: "Marketing Science" },
    { name: "Python / PyMC / Optimization", level: 92, category: "Data Science" },
    { name: "Claude MCP & Agentic Workflows", level: 88, category: "AI Engineering" },
    { name: "Causal Inference & DiD", level: 90, category: "Marketing Science" },
    { name: "SQL & Data Pipeline Architecture", level: 85, category: "Engineering" },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }} 
      animate={{ opacity: 1, y: 0 }} 
      className="bg-slate-900/90 border border-purple-500/30 rounded-xl p-4 my-2 shadow-lg backdrop-blur-md text-sm text-slate-100"
    >
      <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-3">
        <div className="flex items-center gap-2">
          <BarChart3 className="w-4 h-4 text-purple-400" />
          <span className="font-semibold text-purple-400">Core Competencies & Expertise</span>
        </div>
        <span className="text-[10px] bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded-full border border-purple-500/30">Verified Stats</span>
      </div>

      <p className="text-xs text-slate-300 mb-3">
        MSBA Candidate @ UC San Diego. 10+ years bridging data science, advanced marketing strategy, and AI transformation.
      </p>

      <div className="space-y-3">
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
                transition={{ duration: 1, delay: idx * 0.15, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-purple-500 to-cyan-400 rounded-full"
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 p-2.5 bg-purple-950/30 border border-purple-500/20 rounded-lg flex items-center gap-2 text-xs text-purple-200">
        <Award className="w-4 h-4 text-purple-400 shrink-0" />
        <span>STEM-designated curriculum emphasizing advanced measurement and econometric modeling.</span>
      </div>
    </motion.div>
  );
}

// GenUI Card 3: Executive Summary & Highlights
function ExecSummaryCard() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }} 
      animate={{ opacity: 1, y: 0 }} 
      className="bg-slate-900/90 border border-emerald-500/30 rounded-xl p-4 my-2 shadow-lg backdrop-blur-md text-sm text-slate-100"
    >
      <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-3">
        <div className="flex items-center gap-2">
          <Award className="w-4 h-4 text-emerald-400" />
          <span className="font-semibold text-emerald-400">Executive Background</span>
        </div>
        <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-500/30">10+ Years Exp</span>
      </div>

      <div className="space-y-3 text-xs text-slate-300">
        <div className="flex gap-3 items-start">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
          <div>
            <strong className="text-slate-100 block mb-0.5">SVP, Strategic Venture Manager @ Banque Misr (2020 - 2023)</strong>
            Spearheaded digital venture incubation, growth marketing modeling, and corporate transformation initiatives.
          </div>
        </div>

        <div className="flex gap-3 items-start">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
          <div>
            <strong className="text-slate-100 block mb-0.5">Manager, Corporate & Credit @ Corplease S.A.E (2018 - 2020)</strong>
            Managed complex enterprise relationships, risk modeling, and data-driven client underwriting portfolios.
          </div>
        </div>

        <div className="flex gap-3 items-start">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
          <div>
            <strong className="text-slate-100 block mb-0.5">MSBA Candidate @ UC San Diego</strong>
            Deepening advanced technical capabilities in machine learning, PyMC Bayesian modeling, and modern AI orchestration.
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
  genUIType?: "project" | "skills" | "summary" | null;
  projectData?: { title: string; tags: string[] };
}

export default function AICopilot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "ai",
      text: "Hello! I am Abdullah's in-browser AI Copilot. I can simulate WebMCP tool executions, model Bayesian marketing ROI, or break down his core technical expertise. What would you like to explore?",
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isThinking, isOpen]);

  const handleSend = (userText: string) => {
    if (!userText.trim()) return;

    const newMsg: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: userText,
    };

    setMessages((prev) => [...prev, newMsg]);
    setInputValue("");
    setIsThinking(true);

    // Simulate in-browser LLM intent extraction & WebMCP tool call execution
    setTimeout(() => {
      const query = userText.toLowerCase();
      let aiText = "I've processed your query. Here is a tailored overview of Abdullah's portfolio capabilities and background:";
      let genUIType: "project" | "skills" | "summary" | null = null;
      let projectData = { title: "Macy's AI Marketing Coworker", tags: ["Next.js", "Python", "LLMs", "RAG"] };

      if (query.includes("macy") || query.includes("project") || query.includes("roi") || query.includes("work") || query.includes("equaledger") || query.includes("poisson")) {
        genUIType = "project";
        if (query.includes("equaledger")) {
          projectData = { title: "Equaledger System Architecture", tags: ["Causal Inference", "Python", "WebMCP", "Optimization"] };
        } else if (query.includes("bayesian") || query.includes("mmm")) {
          projectData = { title: "Bayesian MMM Capstone", tags: ["Bayesian MMM", "PyMC", "Streamlit"] };
        }
        aiText = `Here is an interactive simulation card for the requested project. You can dynamically model the projected business ROI based on budget and lift parameters:`;
      } else if (query.includes("skill") || query.includes("python") || query.includes("sql") || query.includes("competenc") || query.includes("mcp") || query.includes("ai")) {
        genUIType = "skills";
        aiText = "Abdullah possesses a highly rigorous technical stack combining modern marketing science with advanced AI engineering. Here is his verified competency breakdown:";
      } else if (query.includes("background") || query.includes("experience") || query.includes("resume") || query.includes("banque") || query.includes("education") || query.includes("ucsd")) {
        genUIType = "summary";
        aiText = "Here is a structured overview of Abdullah's 10+ years of domain expertise, corporate leadership roles, and academic foundation:";
      } else {
        // Default rotation or general response
        genUIType = "skills";
        aiText = "I understand you are evaluating Abdullah's background for high-impact opportunities. Here is a dynamic breakdown of his core competencies and technical expertise:";
      }

      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: "ai",
          text: aiText,
          genUIType,
          projectData,
        }
      ]);
      setIsThinking(false);
    }, 1200);
  };

  const suggestionChips = [
    "🚀 Show Bayesian MMM impact",
    "🧠 How does AJ use Claude MCP?",
    "💼 View Executive Summary",
    "📈 Calculate marketing ROI"
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
          className="relative group flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-slate-950 font-bold px-5 py-3 rounded-full shadow-[0_0_25px_rgba(6,182,212,0.4)] hover:shadow-[0_0_35px_rgba(6,182,212,0.6)] transition-all duration-300 scale-100 active:scale-95"
        >
          {/* Animated gradient border effect */}
          <span className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 blur opacity-50 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
          <Bot className="w-5 h-5 text-slate-950 animate-bounce" />
          <span className="text-sm tracking-wide font-bold text-white">Ask AI Copilot</span>
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
            className="fixed bottom-24 right-6 z-50 w-[440px] max-w-[calc(100vw-2rem)] h-[580px] max-h-[calc(100vh-8rem)] backdrop-blur-xl bg-slate-950/85 border border-cyan-500/30 shadow-[0_0_40px_rgba(6,182,212,0.2)] rounded-2xl flex flex-col overflow-hidden text-slate-100"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800/80 bg-slate-900/50">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-500 to-purple-500 flex items-center justify-center shadow-md shadow-cyan-500/20">
                  <Bot className="w-4 h-4 text-slate-950" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-slate-100">AJ AI Copilot</span>
                    <span className="text-[9px] font-mono bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded border border-emerald-500/30 animate-pulse">ONLINE</span>
                  </div>
                  <div className="text-[11px] text-slate-400">Autonomous WebMCP Simulation Engine</div>
                </div>
              </div>

              <button 
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-slate-200 hover:bg-slate-800 p-1.5 rounded-lg transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
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
                    className={`max-w-[88%] rounded-2xl px-4 py-2.5 text-xs leading-relaxed shadow-md ${
                      msg.sender === "user" 
                        ? "bg-gradient-to-r from-cyan-500 to-cyan-600 text-slate-950 font-medium" 
                        : "bg-slate-800/90 border border-slate-700/60 text-slate-200"
                    }`}
                  >
                    {msg.text}
                  </div>

                  {/* Render Declarative GenUI components if present */}
                  {msg.genUIType === "project" && msg.projectData && (
                    <div className="w-full mt-2">
                      <ProjectImpactCard title={msg.projectData.title} tags={msg.projectData.tags} />
                    </div>
                  )}
                  {msg.genUIType === "skills" && (
                    <div className="w-full mt-2">
                      <SkillsRadarCard />
                    </div>
                  )}
                  {msg.genUIType === "summary" && (
                    <div className="w-full mt-2">
                      <ExecSummaryCard />
                    </div>
                  )}
                </motion.div>
              ))}

              {/* Semantic Motion Thinking State */}
              {isThinking && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center gap-3 bg-slate-900/60 border border-cyan-500/20 rounded-2xl px-4 py-3 max-w-[80%]"
                >
                  <div className="flex gap-1.5 items-center">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                    <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  </div>
                  <span className="text-xs font-mono text-cyan-300">Evaluating WebMCP context...</span>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Prompt Suggestion Chips */}
            <div className="px-4 py-2 bg-slate-900/40 border-t border-slate-800/50 flex gap-1.5 overflow-x-auto scrollbar-none whitespace-nowrap">
              {suggestionChips.map((chip, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(chip.replace(/^[^\w]+/, '').trim())}
                  disabled={isThinking}
                  className="text-[11px] bg-slate-800 hover:bg-slate-700/80 text-slate-200 hover:text-cyan-300 border border-slate-700/80 hover:border-cyan-500/40 px-3 py-1.5 rounded-full transition-all shrink-0 shadow-sm active:scale-95 disabled:opacity-50"
                >
                  {chip}
                </button>
              ))}
            </div>

            {/* Input Area */}
            <div className="p-3 bg-slate-900/80 border-t border-slate-800/80 flex items-center gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend(inputValue)}
                placeholder="Ask about AJ's MMM experience, stack, or impact..."
                disabled={isThinking}
                className="flex-1 bg-slate-950 border border-slate-800 focus:border-cyan-500/60 rounded-xl px-4 py-2.5 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-500/60 transition-all disabled:opacity-50"
              />
              <button
                onClick={() => handleSend(inputValue)}
                disabled={!inputValue.trim() || isThinking}
                className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 p-2.5 rounded-xl transition-all shadow-md hover:shadow-cyan-500/20 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
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
