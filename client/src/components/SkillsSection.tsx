/*
 * DESIGN: Cyber-Dark Skills Section
 * Categorized skill cards with animated progress bars
 * Tech stack icons, glowing bars
 */

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Code2, BarChart3, Megaphone, Users } from "lucide-react";

const skillCategories = [
  {
    id: "marketing-science",
    title: "Marketing Science & Measurement",
    icon: BarChart3,
    color: "#B8C8DC",
    skills: [
      { name: "Bayesian MMM", level: 90 },
      { name: "Incrementality Testing", level: 85 },
      { name: "A/B Testing", level: 92 },
      { name: "Multi-touch Attribution", level: 85 },
      { name: "Geo-experiments", level: 80 },
      { name: "Brand & Conversion Lift", level: 83 },
    ],
  },
  {
    id: "programming",
    title: "Programming & Data",
    icon: Code2,
    color: "#7A8FA8",
    skills: [
      { name: "Python (pandas, NumPy, scikit-learn, PyMC)", level: 88 },
      { name: "R", level: 80 },
      { name: "SQL", level: 87 },
      { name: "Tableau / Power BI", level: 90 },
      { name: "Streamlit", level: 82 },
      { name: "Quarto / git", level: 85 },
    ],
  },
  {
    id: "applied-ai",
    title: "Applied AI & Agents",
    icon: Users,
    color: "#6A8AA8",
    skills: [
      { name: "Claude & MCP", level: 90 },
      { name: "Agent Design", level: 87 },
      { name: "Prompt Engineering", level: 92 },
      { name: "Fine-tuning & Retrieval", level: 80 },
      { name: "LLM-augmented Workflows", level: 88 },
      { name: "Obsidian + Claude Integration", level: 85 },
    ],
  },
  {
    id: "marketing-ops",
    title: "Marketing Operations",
    icon: Megaphone,
    color: "#2A6A9A",
    skills: [
      { name: "Campaign Management ($30M+)", level: 95 },
      { name: "Digital Analytics", level: 90 },
      { name: "Performance Marketing", level: 88 },
      { name: "Agency Management", level: 92 },
      { name: "Social Media Strategy", level: 87 },
      { name: "Content Operations", level: 85 },
    ],
  },
];

const techStack = [
  { name: "Python", color: "#3776AB" },
  { name: "PyMC", color: "#276DC3" },
  { name: "R", color: "#6A8AA8" },
  { name: "SQL", color: "#B8C8DC" },
  { name: "Tableau", color: "#E97627" },
  { name: "Power BI", color: "#F2C811" },
  { name: "Streamlit", color: "#FF4B4B" },
  { name: "Claude", color: "#B8C8DC" },
  { name: "MCP", color: "#7A8FA8" },
  { name: "Quarto", color: "#4A9A8A" },
  { name: "Bayesian MMM", color: "#B8C8DC" },
  { name: "Arabic", color: "#6A8AA8" },
];

function SkillBar({
  name,
  level,
  color,
  delay,
}: {
  name: string;
  level: number;
  color: string;
  delay: number;
}) {
  return (
    <div>
      <div className="flex justify-between mb-1.5">
        <span className="text-sm font-['Lato'] text-[#94A8C0]">{name}</span>
        <span
          className="text-xs font-['JetBrains_Mono']"
          style={{ color }}
        >
          {level}%
        </span>
      </div>
      <div className="h-1 bg-[rgba(255,255,255,0.06)] rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{
            background: `linear-gradient(90deg, ${color}80 0%, ${color} 100%)`,
            boxShadow: `0 0 6px ${color}60`,
          }}
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay, ease: "easeOut" }}
        />
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
      className="py-24 relative"
      style={{
        background: "linear-gradient(180deg, #0D1525 0%, #0A0E1A 100%)",
      }}
    >
      {/* Background accents */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(184,200,220,0.3), transparent)",
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
            A versatile toolkit spanning data science, marketing analytics,
            strategic leadership, and bilingual communication.
          </p>
        </motion.div>

        {/* Tech Stack Pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="mono-label mb-4">Tech Stack & Tools</div>
          <div className="flex flex-wrap gap-2">
            {techStack.map((tech, i) => (
              <motion.span
                key={tech.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ scale: 1.05, y: -2 }}
                className="px-4 py-2 rounded-sm font-['JetBrains_Mono'] text-sm cursor-default transition-all duration-200"
                style={{
                  color: tech.color,
                  background: `${tech.color}10`,
                  border: `1px solid ${tech.color}30`,
                }}
              >
                {tech.name}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Skill category cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {skillCategories.map((cat, catIndex) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: catIndex * 0.1 }}
              className="card-cyber rounded-lg p-6"
              style={{ borderColor: `${cat.color}20` }}
            >
              {/* Category header */}
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="w-10 h-10 rounded-sm flex items-center justify-center"
                  style={{
                    background: `${cat.color}15`,
                    border: `1px solid ${cat.color}30`,
                  }}
                >
                  <cat.icon size={18} style={{ color: cat.color }} />
                </div>
                <h3 className="font-['Playfair_Display'] font-bold text-white text-lg">
                  {cat.title}
                </h3>
              </div>

              {/* Skill bars */}
              <div className="space-y-3">
                {cat.skills.map((skill, skillIndex) => (
                  <SkillBar
                    key={skill.name}
                    name={skill.name}
                    level={skill.level}
                    color={cat.color}
                    delay={catIndex * 0.1 + skillIndex * 0.08}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
