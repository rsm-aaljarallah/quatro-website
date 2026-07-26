import { useState } from "react";
import { motion } from "framer-motion";
import { Network, Database, Cpu, GitCommit, Zap, CheckCircle2, FileText, ArrowRight } from "lucide-react";

export default function NeuralVaultSimulator() {
  const [cipActive, setCipActive] = useState<boolean>(true);
  const [selectedNode, setSelectedNode] = useState<string>("Context Injector");

  const nodes = [
    { id: "Claude Agent", role: "LLM Reasoning Engine", layer: "Native Memory", color: "border-cyan-500/40 text-cyan-400 bg-cyan-500/10" },
    { id: "Context Injector", role: "Dynamic Token Pruning", layer: "Middleware Protocol", color: "border-indigo-500/40 text-indigo-400 bg-indigo-500/10" },
    { id: "Obsidian Wiki", role: "Structured Markdown Vault", layer: "Persistent Knowledge", color: "border-purple-500/40 text-purple-400 bg-purple-500/10" },
    { id: "Git Daemon", role: "Auto-Save Synchronization", layer: "Version Control", color: "border-[#B8C8DC]/40 text-[#B8C8DC] bg-[#B8C8DC]/10" },
    { id: "MCP Server", role: "Notion & Calendar Adapter", layer: "External APIs", color: "border-emerald-500/40 text-emerald-400 bg-emerald-500/10" },
  ];

  return (
    <div className="w-full bg-[#050810] border border-[rgba(232,237,245,0.1)] rounded-2xl p-6 md:p-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[rgba(232,237,245,0.08)] pb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-1 text-xs font-['JetBrains_Mono'] tracking-widest uppercase bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded">
              Model Context Protocol (MCP)
            </span>
            <span className="text-xs text-[#5A7A9A] font-['JetBrains_Mono'] flex items-center gap-1">
              <Network size={12} className="text-indigo-400" /> Two-Layer Memory Architecture
            </span>
          </div>
          <h2 className="font-['Playfair_Display'] font-extrabold text-2xl md:text-3xl text-white">
            Neural Vault Knowledge Graph & Context Protocol
          </h2>
          <p className="text-sm text-[#7A8FA8] mt-1">
            Simulate dynamic memory injection and token context pruning between Claude LLM and Obsidian Wiki vault.
          </p>
        </div>

        {/* Protocol Toggle */}
        <div className="flex items-center gap-3 bg-[rgba(10,14,26,0.6)] border border-[rgba(232,237,245,0.08)] p-2 rounded-xl">
          <span className="text-xs font-['JetBrains_Mono'] text-[#5A7A9A]">Protocol Mode:</span>
          <button
            onClick={() => setCipActive(!cipActive)}
            className={`px-3 py-1.5 rounded-lg text-xs font-['JetBrains_Mono'] font-bold border transition-all ${
              cipActive
                ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/40"
                : "bg-rose-500/20 text-rose-300 border-rose-500/40"
            }`}
          >
            {cipActive ? "CIP Enabled (Pruned)" : "Raw Prompt (Unpruned)"}
          </button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Interactive Network Diagram */}
        <div className="lg:col-span-7 bg-[rgba(10,14,26,0.4)] border border-[rgba(232,237,245,0.08)] p-6 rounded-xl space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-['JetBrains_Mono'] text-[#B8C8DC] uppercase tracking-wider flex items-center gap-2">
              <Database size={14} className="text-cyan-400" /> Architecture Topology Map
            </h3>
            <span className="text-[11px] text-[#4A5A6A] font-['JetBrains_Mono']">Click node to inspect layer</span>
          </div>

          {/* Node Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {nodes.map((node) => (
              <motion.div
                key={node.id}
                onClick={() => setSelectedNode(node.id)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${node.color} ${
                  selectedNode === node.id ? "ring-2 ring-cyan-400/50" : "opacity-80 hover:opacity-100"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-['JetBrains_Mono'] font-bold">{node.id}</span>
                  {selectedNode === node.id && <CheckCircle2 size={14} className="text-cyan-400" />}
                </div>
                <div className="text-[11px] opacity-80">{node.role}</div>
                <div className="text-[9px] font-['JetBrains_Mono'] opacity-60 uppercase mt-2">{node.layer}</div>
              </motion.div>
            ))}
          </div>

          {/* Flow Connection SVG Animation */}
          <div className="p-4 bg-[rgba(5,8,16,0.8)] border border-[rgba(232,237,245,0.05)] rounded-xl flex items-center justify-between text-xs font-['JetBrains_Mono'] text-[#7A8FA8]">
            <span className="text-cyan-400 flex items-center gap-1"><Cpu size={12} /> Prompt Input</span>
            <ArrowRight size={14} className="text-[#3A4A5A]" />
            <span className="text-indigo-400 flex items-center gap-1"><Zap size={12} /> CIP Middleware</span>
            <ArrowRight size={14} className="text-[#3A4A5A]" />
            <span className="text-purple-400 flex items-center gap-1"><GitCommit size={12} /> Obsidian Vault</span>
          </div>
        </div>

        {/* Right Column: Context Token Simulation */}
        <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
          <div className="bg-[rgba(10,14,26,0.6)] border border-[rgba(232,237,245,0.08)] p-6 rounded-xl space-y-4">
            <span className="text-xs font-['JetBrains_Mono'] text-[#7A8FA8] uppercase tracking-wider block">
              Live Token Overhead & Precision
            </span>

            {/* Token Overhead Metric */}
            <div className="space-y-2">
              <div className="flex justify-between items-baseline">
                <span className="text-xs text-[#5A7A9A] font-['JetBrains_Mono']">Context Window Overhead</span>
                <span className="text-2xl font-bold font-['Playfair_Display'] text-white">
                  {cipActive ? "4,200 tokens" : "32,800 tokens"}
                </span>
              </div>
              <div className="w-full h-2.5 bg-[#1A2333] rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: cipActive ? "18%" : "95%" }}
                  transition={{ duration: 0.4 }}
                  className={`h-full ${cipActive ? "bg-emerald-400" : "bg-rose-500"}`}
                />
              </div>
            </div>

            {/* Performance Badges */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="bg-[rgba(5,8,16,0.6)] border border-[rgba(232,237,245,0.06)] p-3 rounded-lg">
                <div className="text-[10px] text-[#5A7A9A] font-['JetBrains_Mono'] uppercase">Latency Reduction</div>
                <div className="text-lg font-bold text-emerald-400 font-['Playfair_Display']">
                  {cipActive ? "-62% Faster" : "Baseline"}
                </div>
              </div>

              <div className="bg-[rgba(5,8,16,0.6)] border border-[rgba(232,237,245,0.06)] p-3 rounded-lg">
                <div className="text-[10px] text-[#5A7A9A] font-['JetBrains_Mono'] uppercase">Retrieval Precision</div>
                <div className="text-lg font-bold text-cyan-400 font-['Playfair_Display']">
                  {cipActive ? "94% Accuracy" : "68% Accuracy"}
                </div>
              </div>
            </div>
          </div>

          {/* Code Protocol Snippet */}
          <div className="bg-[rgba(5,8,16,0.9)] border border-[rgba(232,237,245,0.08)] p-4 rounded-xl space-y-2">
            <div className="flex items-center justify-between text-[11px] font-['JetBrains_Mono'] text-[#5A7A9A]">
              <span className="flex items-center gap-1"><FileText size={12} className="text-cyan-400" /> cip_protocol_config.json</span>
              <span className="text-emerald-400">Active</span>
            </div>
            <pre className="text-[11px] font-['JetBrains_Mono'] text-[#B8C8DC] overflow-x-auto p-2 bg-[#0A0E1A] rounded border border-[rgba(232,237,245,0.04)]">
              {cipActive
                ? `{\n  "context_injection": true,\n  "commit_flag": "AUTO_GIT_DAEMON",\n  "mcp_adapters": ["obsidian", "notion"],\n  "pruning_ratio": 0.62\n}`
                : `{\n  "context_injection": false,\n  "warning": "Full vault context dumped"\n}`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
