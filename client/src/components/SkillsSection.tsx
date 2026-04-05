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
    id: "technical",
    title: "Technical Skills",
    icon: Code2,
    color: "#B8C8DC",
    skills: [
      { name: "Python", level: 85 },
      { name: "R Programming", level: 80 },
      { name: "SQL", level: 88 },
      { name: "Machine Learning", level: 82 },
      { name: "Statistical Analysis", level: 87 },
      { name: "Data Manipulation", level: 90 },
    ],
  },
  {
    id: "visualization",
    title: "Data & Visualization",
    icon: BarChart3,
    color: "#7A8FA8",
    skills: [
      { name: "Tableau", level: 88 },
      { name: "Power BI", level: 85 },
      { name: "Data Storytelling", level: 92 },
      { name: "Predictive Modeling", level: 80 },
      { name: "Microsoft Office Suite", level: 95 },
      { name: "Marketing Automation", level: 85 },
    ],
  },
  {
    id: "marketing",
    title: "Marketing & Comms",
    icon: Megaphone,
    color: "#6A8AA8",
    skills: [
      { name: "Campaign Management", level: 95 },
      { name: "Digital Analytics", level: 88 },
      { name: "Social Media Strategy", level: 90 },
      { name: "Content Development", level: 87 },
      { name: "Public Speaking", level: 92 },
      { name: "Strategic Communication", level: 90 },
    ],
  },
  {
    id: "leadership",
    title: "Leadership & Strategy",
    icon: Users,
    color: "#2A6A9A",
    skills: [
      { name: "Strategic Planning", level: 92 },
      { name: "Budget Management ($30M+)", level: 90 },
      { name: "Cross-functional Leadership", level: 88 },
      { name: "Change Management", level: 85 },
      { name: "Digital Transformation", level: 87 },
      { name: "Problem Solving", level: 93 },
    ],
  },
];

const techStack = [
  { name: "Python", color: "#3776AB" },
  { name: "R", color: "#276DC3" },
  { name: "SQL", color: "#B8C8DC" },
  { name: "Tableau", color: "#E97627" },
  { name: "Power BI", color: "#F2C811" },
  { name: "ML/AI", color: "#B8C8DC" },
  { name: "LLMs", color: "#7A8FA8" },
  { name: "Excel", color: "#217346" },
  { name: "Arabic", color: "#6A8AA8" },
  { name: "English", color: "#B8C8DC" },
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
        <span className="text-sm font-['DM_Sans'] text-[#94A8C0]">{name}</span>
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
          <div className="mono-label">06 / Skills</div>
          <div className="flex-1 section-divider" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-16"
        >
          <h2 className="font-['Syne'] font-extrabold text-4xl lg:text-5xl text-white mb-4">
            Skills &{" "}
            <span className="text-gradient-cyan">Expertise</span>
          </h2>
          <p className="font-['DM_Sans'] text-[#7A8FA8] text-lg max-w-2xl">
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
                <h3 className="font-['Syne'] font-bold text-white text-lg">
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
