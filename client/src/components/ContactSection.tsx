/*
 * DESIGN: Cyber-Dark Contact Section with "Ask My Agent" Terminal
 * Left: Standard contact text and availability
 * Right: Interactive simulated LLM terminal window answering FAQs
 */

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Mail, Phone, MapPin, Send, Linkedin, Github, MessageCircle, Terminal, Cpu } from "lucide-react";

const socialLinks = [
  {
    icon: Linkedin,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/abdullah-aljarallah-a72512b7/",
    color: "#5A8AB0",
    bg: "rgba(10,102,194,0.12)",
    border: "rgba(10,102,194,0.35)",
  },
  {
    icon: Github,
    label: "GitHub",
    href: "https://github.com/rsm-aaljarallah",
    color: "#D8E4F0",
    bg: "rgba(255,255,255,0.06)",
    border: "rgba(255,255,255,0.15)",
  },
];

const agentResponses: Record<string, string> = {
  "What is your core expertise?": "Abdullah bridges the gap between Marketing Strategy and Data Science. His core expertise lies in Bayesian Marketing Mix Modeling (MMM), causal inference, and building agentic systems using LLMs and MCP to measure and optimize $30M+ media portfolios.",
  "What tools do you use?": "His primary stack includes Python, PyMC for probabilistic programming, SQL, Next.js for agentic frontends, and the Model Context Protocol (MCP) for LLM integrations.",
  "Are you open to work?": "Yes. Abdullah is currently completing his MSBA at UC San Diego (STEM-designated) and is actively targeting Marketing Science, Measurement, and Applied AI roles across the US and MENA regions."
};

function AgentTerminal() {
  const [history, setHistory] = useState<{type: 'cmd' | 'resp' | 'sys', text: React.ReactNode}[]>([
    { type: 'sys', text: <span>$ init profile --agent<br/><span className="text-green-400">Loading candidate data... [OK]</span><br/>Type <span className="text-cyan-400">/help</span> to see available commands.</span> }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history, isTyping]);

  const handleCommand = (cmd: string) => {
    if (!cmd.trim()) return;
    
    setHistory(prev => [...prev, { type: 'cmd', text: cmd }]);
    setInput("");
    setIsTyping(true);
    
    const command = cmd.toLowerCase().trim();
    let responseText: React.ReactNode = "";
    
    setTimeout(() => {
      if (command === "/help") {
        responseText = (
          <div className="text-[#B8C8DC]">
            Available commands:<br/>
            <span className="text-cyan-400">/resume</span> - Download PDF resume<br/>
            <span className="text-cyan-400">/email</span> - Send an email<br/>
            <span className="text-cyan-400">/skills</span> - List core expertise<br/>
            <span className="text-cyan-400">/clear</span> - Clear terminal<br/>
          </div>
        );
      } else if (command === "/resume") {
        responseText = <span className="text-green-400">Downloading Abdullah_Aljarallah_Resume.pdf...</span>;
        window.open('/Abdullah_Aljarallah_Resume.pdf', '_blank');
      } else if (command === "/email") {
        responseText = <span className="text-green-400">Opening mail client...</span>;
        window.location.href = 'mailto:mr.a.aljarallah@gmail.com';
      } else if (command === "/skills") {
        responseText = "Bayesian MMM, Causal Inference, Python, PyMC, Streamlit, Claude/MCP Agent Design.";
      } else if (command === "/clear") {
        setHistory([{ type: 'sys', text: <span>$ init profile --agent<br/><span className="text-green-400">Loading candidate data... [OK]</span><br/>Type <span className="text-cyan-400">/help</span> to see available commands.</span> }]);
        setIsTyping(false);
        return;
      } else if (agentResponses[cmd]) {
        responseText = agentResponses[cmd];
      } else {
        responseText = <span className="text-red-400">Command not found: {cmd}. Type /help for options.</span>;
      }
      
      setHistory(prev => [...prev, { type: 'resp', text: responseText }]);
      setIsTyping(false);
    }, 600);
  };

  return (
    <div
      className="rounded-lg overflow-hidden flex flex-col h-full min-h-[400px] font-['JetBrains_Mono'] text-sm"
      style={{
        background: "rgba(10, 14, 26, 0.6)",
        backdropFilter: "blur(20px)",
        border: "1px solid rgba(232, 237, 245, 0.15)",
        boxShadow: "0 20px 40px rgba(0,0,0,0.4), inset 0 0 0 1px rgba(255,255,255,0.02)",
      }}
    >
      {/* Terminal Header */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-[rgba(232,237,245,0.1)] bg-[rgba(0,0,0,0.4)]">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
          <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
          <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
        </div>
        <div className="flex-1 text-center text-xs text-[#7A8FA8] flex items-center justify-center gap-2">
          <Cpu size={14} className="text-cyan-400" />
          agent@ajq8: ~
        </div>
      </div>

      {/* Terminal Body */}
      <div className="flex-1 p-6 overflow-y-auto" onClick={() => document.getElementById('term-input')?.focus()}>
        <div className="flex flex-col gap-3">
          {history.map((entry, idx) => (
            <div key={idx}>
              {entry.type === 'cmd' ? (
                <div><span className="text-cyan-400">guest@ajq8:~$</span> <span className="text-white">{entry.text}</span></div>
              ) : entry.type === 'sys' ? (
                <div className="text-[#7A8FA8] mb-2">{entry.text}</div>
              ) : (
                <div className="text-[#E8EDF5] leading-relaxed mb-2">{entry.text}</div>
              )}
            </div>
          ))}
          
          {isTyping && (
            <div className="text-[#E8EDF5]">
              <span className="inline-block w-2 h-4 bg-cyan-400 animate-pulse align-middle" />
            </div>
          )}
          
          {!isTyping && (
            <form onSubmit={(e) => { e.preventDefault(); handleCommand(input); }} className="flex items-center gap-2 mt-2">
              <span className="text-cyan-400">guest@ajq8:~$</span>
              <input
                id="term-input"
                autoComplete="off"
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 bg-transparent border-none outline-none text-white font-['JetBrains_Mono'] w-full"
                autoFocus
              />
            </form>
          )}
          <div ref={endRef} />
        </div>
      </div>
    </div>
  );
}

export default function ContactSection() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true });

  return (
    <>
      <section
        id="contact"
        className="py-24 relative"
        style={{
          background: "linear-gradient(180deg, #0A0E1A 0%, #050810 100%)",
        }}
      >
        {/* Decorative top line */}
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(184,200,220,0.2), transparent)",
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section header */}
          <motion.div
            ref={headerRef}
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-4 mb-16"
          >
            <div className="mono-label tracking-[0.2em]">09 / Contact</div>
            <div className="flex-1 section-divider" />
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Left: CTA text */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <h2 className="font-['Playfair_Display'] font-extrabold text-4xl lg:text-5xl text-white mb-6 leading-tight">
                Let's Build Something
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Data-Driven</span>
              </h2>
              <p className="font-['Lato'] text-[#7A8FA8] text-lg leading-relaxed mb-8">
                Whether you're looking for a business analytics expert, a
                marketing strategist, or someone who can bridge the gap between
                data and decisions — I'd love to connect.
              </p>

              {/* Contact methods */}
              <div className="space-y-4 mb-10">
                <a href="mailto:mr.a.aljarallah@gmail.com" className="flex items-center gap-3 text-[#B8C8DC] hover:text-white transition-colors group">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center border border-[rgba(232,237,245,0.1)] group-hover:border-cyan-400/50 group-hover:bg-[rgba(34,211,238,0.05)] transition-all">
                    <Mail size={16} />
                  </div>
                  mr.a.aljarallah@gmail.com
                </a>
                <div className="flex items-center gap-3 text-[#B8C8DC]">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center border border-[rgba(232,237,245,0.1)]">
                    <MapPin size={16} />
                  </div>
                  San Diego, CA
                </div>
              </div>

              {/* Social links */}
              <div className="flex gap-3">
                {socialLinks.map(({ icon: Icon, label, href, color, bg, border }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-3 rounded-full font-['Lato'] font-medium text-sm transition-all duration-300 hover:scale-105"
                    style={{ color, background: bg, border: `1px solid ${border}` }}
                  >
                    <Icon size={16} />
                    {label}
                  </a>
                ))}
              </div>
            </motion.div>

            {/* Right: Agent Terminal */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="h-full"
            >
              <AgentTerminal />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="py-8 border-t border-[rgba(232,237,245,0.05)]"
        style={{ background: "#050810" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#B8C8DC] to-[#7A8FA8] flex items-center justify-center text-[#0A0E1A] font-bold text-xs font-['Playfair_Display']">
                AJ
              </div>
              <span className="font-['Lato'] text-[#4A5A6A] text-sm tracking-wide">
                Abdullah Aljarallah © {new Date().getFullYear()}
              </span>
            </div>
            <div className="flex items-center gap-6">
              <a href="https://www.linkedin.com/in/abdullah-aljarallah-a72512b7/" target="_blank" rel="noopener noreferrer" className="text-[#4A5A6A] hover:text-[#B8C8DC] transition-colors">
                <Linkedin size={18} />
              </a>
              <a href="https://github.com/rsm-aaljarallah" target="_blank" rel="noopener noreferrer" className="text-[#4A5A6A] hover:text-[#B8C8DC] transition-colors">
                <Github size={18} />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
