/*
 * DESIGN: Cyber-Dark Certifications Section
 * Grid of certification cards with category grouping
 * Glowing borders, hover effects
 */

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Award, Brain, TrendingUp, Sparkles } from "lucide-react";

const certGroups = [
  {
    id: "ai",
    title: "Data Science & AI",
    icon: Brain,
    color: "#B8C8DC",
    certs: [
      { name: "Fine Tuning Language Models for Business Tasks", issuer: "Advanced AI" },
      { name: "Generative AI", issuer: "AI Certification" },
      { name: "Machine Learning Fundamentals", issuer: "DataCamp" },
      { name: "Data Manipulation with Python", issuer: "DataCamp" },
      { name: "Statistical Analysis and Modeling", issuer: "DataCamp" },
      { name: "Data Science for Business", issuer: "DataCamp" },
    ],
  },
  {
    id: "marketing",
    title: "Business & Marketing",
    icon: TrendingUp,
    color: "#7A8FA8",
    certs: [
      { name: "Strategic Marketing Planning", issuer: "Professional Certification" },
      { name: "Digital Marketing", issuer: "Digital Marketing Cert" },
      { name: "Social Media Marketing", issuer: "Social Media Cert" },
      { name: "Innovative Thinking", issuer: "Innovation Cert" },
    ],
  },
];

export default function CertificationsSection() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true });

  return (
    <section
      id="certifications"
      className="py-24 relative"
      style={{ background: "#0A0E1A" }}
    >
      {/* Background accent */}
      <div
        className="absolute top-1/2 left-0 w-80 h-80 rounded-full opacity-5 pointer-events-none"
        style={{
          background: "radial-gradient(circle, #B8C8DC 0%, transparent 70%)",
          transform: "translate(-40%, -50%)",
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
          <div className="mono-label">07 / Certifications</div>
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
            Courses &{" "}
            <span className="text-gradient-cyan">Certifications</span>
          </h2>
          <p className="font-['DM_Sans'] text-[#7A8FA8] text-lg max-w-2xl">
            Continuous learning across AI, data science, and business strategy
            — staying at the cutting edge of the field.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {certGroups.map((group, groupIndex) => (
            <motion.div
              key={group.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: groupIndex * 0.15 }}
            >
              {/* Group header */}
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="w-10 h-10 rounded-sm flex items-center justify-center"
                  style={{
                    background: `${group.color}15`,
                    border: `1px solid ${group.color}30`,
                  }}
                >
                  <group.icon size={18} style={{ color: group.color }} />
                </div>
                <h3 className="font-['Syne'] font-bold text-white text-xl">
                  {group.title}
                </h3>
              </div>

              {/* Cert cards */}
              <div className="space-y-3">
                {group.certs.map((cert, certIndex) => (
                  <motion.div
                    key={cert.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.4,
                      delay: groupIndex * 0.1 + certIndex * 0.07,
                    }}
                    whileHover={{ x: 4 }}
                    className="flex items-center gap-4 p-4 rounded-sm group transition-all duration-200"
                    style={{
                      background: `${group.color}05`,
                      border: `1px solid ${group.color}15`,
                    }}
                  >
                    <div
                      className="w-8 h-8 rounded-sm flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-200"
                      style={{
                        background: `${group.color}15`,
                        border: `1px solid ${group.color}25`,
                      }}
                    >
                      <Award size={14} style={{ color: group.color }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-['DM_Sans'] text-[#D8E4F0] text-sm font-medium leading-tight">
                        {cert.name}
                      </div>
                      <div
                        className="font-['JetBrains_Mono'] text-xs mt-0.5"
                        style={{ color: `${group.color}80` }}
                      >
                        {cert.issuer}
                      </div>
                    </div>
                    <Sparkles
                      size={12}
                      style={{ color: `${group.color}50` }}
                      className="flex-shrink-0 group-hover:opacity-100 opacity-0 transition-opacity"
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* DataCamp badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 p-6 rounded-lg text-center"
          style={{
            background:
              "linear-gradient(135deg, rgba(184,200,220,0.05) 0%, rgba(122,143,168,0.05) 100%)",
            border: "1px solid rgba(184,200,220,0.2)",
          }}
        >
          <div className="mono-label mb-3 justify-center flex">
            DataCamp Certified
          </div>
          <p className="font-['DM_Sans'] text-[#7A8FA8] text-sm max-w-lg mx-auto">
            Completed multiple DataCamp certifications in Machine Learning,
            Python, Statistical Analysis, and Data Science for Business —
            demonstrating hands-on technical proficiency.
          </p>
          <div className="flex justify-center gap-3 mt-4 flex-wrap">
            {["Machine Learning", "Python", "Statistics", "Data Science"].map(
              (tag) => (
                <span
                  key={tag}
                  className="text-xs font-['JetBrains_Mono'] px-3 py-1 rounded-sm text-[#B8C8DC] bg-[rgba(184,200,220,0.08)] border border-[rgba(184,200,220,0.2)]"
                >
                  {tag}
                </span>
              )
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
