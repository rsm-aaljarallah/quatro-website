/*
 * DESIGN: Deep Navy & Crisp White — Skills Section
 * Clean, editorial layout with minimal skill indicators
 * No percentage numbers — cleaner visual hierarchy
 * Fonts: Playfair Display (headings) + Lato (body) + JetBrains Mono (labels)
 */

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Code2, BarChart3, Megaphone, Cpu } from "lucide-react";

const skillCategories = [
  {
    id: "marketing-science",
    title: "Marketing Science",
    icon: BarChart3,
    color: "#B8C8DC",
    skills: [
      "Bayesian MMM",
      "Incrementality Testing",
      "A/B Testing",
      "Multi-touch Attribution",
      "Geo-experiments",
      "Brand & Conversion Lift",
    ],
  },
  {
    id: "programming",
    title: "Programming & Data",
    icon: Code2,
    color: "#7A8FA8",
    skills: [
      "Python (pandas, NumPy, scikit-learn, PyMC)",
      "R",
      "SQL",
      "Tableau / Power BI",
      "Streamlit",
      "Quarto / git",
    ],
  },
  {
    id: "applied-ai",
    title: "Applied AI & Agents",
    icon: Cpu,
    color: "#6A8AA8",
    skills: [
      "Claude & MCP",
      "Agent Design",
      "Prompt Engineering",
      "Fine-tuning & Retrieval",
      "LLM-augmented Workflows",
      "RAG Systems",
    ],
  },
  {
    id: "marketing-ops",
    title: "Marketing Operations",
    icon: Megaphone,
    color: "#4A7A9A",
    skills: [
      "Campaign Management ($30M+)",
      "Digital Analytics",
      "Performance Marketing",
      "Agency Management",
      "Social Media Strategy",
      "Content Operations",
    ],
  },
];

const techStack = [
  "Python", "PyMC", "R", "SQL", "Tableau", "Power BI",
  "Streamlit", "Claude", "MCP", "Quarto", "Bayesian MMM", "Arabic",
];

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

        {/* Skill category cards — clean list style */}
        <div className="grid md:grid-cols-2 gap-8">
          {skillCategories.map((cat, catIndex) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: catIndex * 0.1 }}
              className="p-7"
              style={{
                background: "rgba(15,22,40,0.6)",
                border: "1px solid rgba(232,237,245,0.07)",
              }}
            >
              {/* Category header */}
              <div className="flex items-center gap-3 mb-7">
                <div
                  className="w-9 h-9 flex items-center justify-center"
                  style={{
                    background: `${cat.color}12`,
                    border: `1px solid ${cat.color}25`,
                  }}
                >
                  <cat.icon size={16} style={{ color: cat.color }} />
                </div>
                <h3 className="font-['Playfair_Display'] font-bold text-white text-lg">
                  {cat.title}
                </h3>
              </div>

              {/* Skills as clean list */}
              <div className="space-y-3">
                {cat.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: catIndex * 0.08 + skillIndex * 0.05 }}
                    className="flex items-center gap-3"
                  >
                    <div
                      className="flex-shrink-0 w-1.5 h-1.5 rounded-full"
                      style={{ background: cat.color, opacity: 0.6 }}
                    />
                    <span className="font-['Lato'] text-sm text-[#94A8C0]">{skill}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
