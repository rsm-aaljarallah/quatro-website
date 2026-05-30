/*
 * DESIGN: Deep Navy & Crisp White — Skills Section
 * Clean, editorial layout with minimal skill indicators
 * Bento Grid layout for cards with native CSS scroll-driven animations
 * Includes a live data visualization mock (Bayesian MMM)
 * Fonts: Playfair Display (headings) + Lato (body) + JetBrains Mono (labels)
 */

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Code2, BarChart3, Megaphone, Cpu, Activity } from "lucide-react";

const skillCategories = [
  {
    id: "marketing-science",
    title: "Marketing Science",
    icon: BarChart3,
    color: "#B8C8DC",
    colSpan: "bento-col-4",
    animation: "scroll-reveal-right",
    skills: [
      "Bayesian MMM",
      "Incrementality Testing",
      "A/B Testing",
      "Multi-touch Attribution",
      "Geo-experiments",
      "Brand & Lift",
    ],
  },
  {
    id: "programming",
    title: "Programming",
    icon: Code2,
    color: "#7A8FA8",
    colSpan: "bento-col-4",
    animation: "scroll-reveal-right",
    skills: [
      "Python (pandas, PyMC)",
      "R & SQL",
      "Tableau / Power BI",
      "Streamlit",
      "Quarto / git",
    ],
  },
  {
    id: "applied-ai",
    title: "Applied AI",
    icon: Cpu,
    color: "#6A8AA8",
    colSpan: "bento-col-6",
    animation: "scroll-reveal-left",
    skills: [
      "Claude & MCP",
      "Agent Design",
      "Prompt Engineering",
      "RAG Systems",
    ],
  },
  {
    id: "marketing-ops",
    title: "Marketing Ops",
    icon: Megaphone,
    color: "#4A7A9A",
    colSpan: "bento-col-6",
    animation: "scroll-reveal-right",
    skills: [
      "Campaigns ($30M+)",
      "Digital Analytics",
      "Performance Marketing",
      "Agency Management",
    ],
  },
];

const techStack = [
  "Python", "PyMC", "R", "SQL", "Tableau", "Power BI",
  "Streamlit", "Claude", "MCP", "Quarto", "Bayesian MMM", "Arabic",
];

function BayesianMMMChart() {
  return (
    <div className="relative w-full h-56 mt-6 bg-[#0A0E1A] rounded-lg border border-[rgba(184,200,220,0.1)] overflow-hidden flex items-end px-4 pb-4 gap-3">
      {/* Mock bar chart with confidence intervals */}
      {[
        { channel: "TV", roi: 60, ci: 20, color: "#4A7A9A" },
        { channel: "Search", roi: 85, ci: 10, color: "#B8C8DC" },
        { channel: "Social", roi: 45, ci: 25, color: "#6A8AA8" },
        { channel: "OOH", roi: 30, ci: 15, color: "#7A8FA8" },
        { channel: "Print", roi: 15, ci: 8, color: "#3A5A7A" }
      ].map((data, i) => (
        <div key={data.channel} className="flex-1 flex flex-col items-center justify-end h-full relative group">
           {/* CI Line */}
           <div className="absolute w-0.5 bg-[rgba(232,237,245,0.3)] z-10" style={{ height: `${data.ci}%`, bottom: `${data.roi - data.ci / 2}%` }} />
           {/* Bar */}
           <motion.div 
             initial={{ height: 0 }}
             whileInView={{ height: `${data.roi}%` }}
             viewport={{ once: true, margin: "-50px" }}
             transition={{ duration: 1, delay: 0.2 + i * 0.1, ease: "easeOut" }}
             className="w-full max-w-[48px] rounded-t-sm"
             style={{ background: `linear-gradient(180deg, ${data.color} 0%, transparent 100%)` }}
           />
           <span className="text-[10px] sm:text-xs text-[#7A8FA8] mt-3 font-['JetBrains_Mono']">{data.channel}</span>
           
           {/* Tooltip on hover */}
           <div className="absolute bottom-full mb-3 opacity-0 group-hover:opacity-100 transition-opacity bg-[#111827] text-white text-[10px] sm:text-xs py-1.5 px-2.5 rounded border border-[rgba(232,237,245,0.1)] whitespace-nowrap z-20 pointer-events-none">
             ROI: {data.roi / 10}x
             <div className="text-[9px] text-[#7A8FA8] mt-0.5">95% HDI: [{(data.roi - data.ci/2)/10} - {(data.roi + data.ci/2)/10}]</div>
           </div>
        </div>
      ))}
      <div className="absolute top-4 left-4 text-xs text-[#7A8FA8] font-['JetBrains_Mono'] flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
        Live Posterior Draw
      </div>
    </div>
  );
}

export default function SkillsSection() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true });

  return (
    <section
      id="skills"
      className="py-28 relative"
      style={{ background: "linear-gradient(180deg, #0D1525 0%, #0A0E1A 100%)" }}
    >
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(184,200,220,0.2), transparent)" }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-20"
        >
          <div className="mono-label">05 / Skills</div>
          <div className="flex-1 section-divider" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-16"
        >
          <h2 className="font-['Playfair_Display'] font-extrabold text-4xl lg:text-5xl text-white mb-4">
            Skills &{" "}
            <span className="text-gradient-cyan">Expertise</span>
          </h2>
          <p className="font-['Lato'] text-[#7A8FA8] text-lg max-w-2xl">
            A versatile toolkit spanning marketing science, data engineering, applied AI, and strategic leadership.
          </p>
        </motion.div>

        {/* Tech Stack Pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="mono-label mb-5">Tech Stack & Tools</div>
          <div className="flex flex-wrap gap-2">
            {techStack.map((tech, i) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                whileHover={{ y: -2 }}
                className="px-4 py-2 font-['JetBrains_Mono'] text-sm cursor-default"
                style={{
                  color: "#7A8FA8",
                  background: "rgba(232,237,245,0.04)",
                  border: "1px solid rgba(184,200,220,0.12)",
                }}
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Bento Grid */}
        <div className="bento-grid">
          
          {/* Main Visualization Card - Spans 8 cols */}
          <div className="bento-col-8 bento-row-2 bento-card scroll-reveal flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 flex items-center justify-center bg-[rgba(184,200,220,0.1)] border border-[rgba(184,200,220,0.2)] rounded-sm">
                  <Activity size={18} className="text-[#B8C8DC]" />
                </div>
                <h3 className="font-['Playfair_Display'] font-bold text-white text-xl">
                  Measurement & Attribution
                </h3>
              </div>
              <p className="font-['Lato'] text-[#7A8FA8] text-sm max-w-lg">
                Going beyond last-click. Using Marketing Mix Modeling (MMM) and causal inference to uncover the true incremental value of media spend across offline and digital channels.
              </p>
            </div>
            
            <BayesianMMMChart />
          </div>

          {/* Skill category cards */}
          {skillCategories.map((cat, catIndex) => (
            <div key={cat.id} className={`${cat.colSpan} bento-card ${cat.animation}`}>
              {/* Category header */}
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="w-9 h-9 flex items-center justify-center rounded-sm"
                  style={{
                    background: `${cat.color}15`,
                    border: `1px solid ${cat.color}30`,
                  }}
                >
                  <cat.icon size={16} style={{ color: cat.color }} />
                </div>
                <h3 className="font-['Playfair_Display'] font-bold text-white text-lg leading-tight">
                  {cat.title}
                </h3>
              </div>

              {/* Skills as clean list */}
              <div className="space-y-3">
                {cat.skills.map((skill) => (
                  <div key={skill} className="flex items-center gap-3">
                    <div
                      className="flex-shrink-0 w-1.5 h-1.5 rounded-full"
                      style={{ background: cat.color, opacity: 0.6 }}
                    />
                    <span className="font-['Lato'] text-sm text-[#94A8C0]">{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
