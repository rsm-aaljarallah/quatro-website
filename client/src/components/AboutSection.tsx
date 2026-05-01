/*
 * DESIGN: Cyber-Dark About Section
 * Two-column layout with personal info grid and bio
 * Animated entry on scroll
 */

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { User, Globe, Calendar, Heart, Flag, BookOpen } from "lucide-react";

const personalInfo = [
  { icon: Flag, label: "Nationality", value: "Kuwaiti" },
  { icon: Calendar, label: "Date of Birth", value: "January 5, 1992" },
  { icon: Globe, label: "Languages", value: "English & Arabic" },
  { icon: Heart, label: "Status", value: "Single" },
  { icon: BookOpen, label: "Current Study", value: "MSBA @ UC San Diego" },
  { icon: User, label: "Gender", value: "Male" },
];

function AnimatedSection({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

export default function AboutSection() {
  return (
    <section id="about" className="py-24 relative overflow-hidden" style={{ background: "#0A0E1A" }}>
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-5 pointer-events-none"
        style={{ background: "radial-gradient(circle, #B8C8DC 0%, transparent 70%)", transform: "translate(30%, -30%)" }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <AnimatedSection>
          <div className="flex items-center gap-4 mb-16">
            <div className="mono-label">01 / About</div>
            <div className="flex-1 section-divider" />
          </div>
        </AnimatedSection>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left: Bio */}
          <div>
            <AnimatedSection delay={0.1}>
              <h2 className="font-['Playfair_Display'] font-extrabold text-4xl lg:text-5xl text-white mb-6 leading-tight">
                Marketing Operator
                <br />
                <span className="text-gradient-cyan">Turned Measurement Specialist</span>
              </h2>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <p className="font-['Lato'] text-[#7A8FA8] text-base leading-relaxed mb-6">
                Over ten years running $30M+ marketing portfolios across banking, government, and enterprise tech in the GCC. Now finishing my MSBA at UC San Diego's Rady School of Management — STEM-designated — with a capstone in Bayesian Marketing Mix Modeling at Direct Avenue, a US performance media agency.
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.3}>
              <p className="font-['Lato'] text-[#7A8FA8] text-base leading-relaxed mb-8">
                I led Kuwait Finance House's first European campaign, drove 100% digital adoption across 3,000+ employees at Kuwait's social security institution, and run three side ventures in tourism, diving, and growth consulting. I build the campaigns and the agent systems that measure them — my Neural Vault project integrates Claude, Obsidian, and MCP to manage knowledge work end-to-end. Targeting Marketing Science, Measurement, and Applied AI roles across MENA.
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.4}>
              <div className="flex flex-wrap gap-2">
                {["Python", "PyMC", "SQL", "Tableau", "Power BI", "Bayesian MMM", "Claude / MCP", "Marketing Science", "Streamlit", "Quarto"].map(tag => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-xs font-['JetBrains_Mono'] text-[#B8C8DC] bg-[rgba(184,200,220,0.06)] border border-[rgba(184,200,220,0.15)] rounded-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </AnimatedSection>
          </div>

          {/* Right: Personal Info Grid */}
          <div>
            <AnimatedSection delay={0.2}>
              <div className="card-cyber rounded-lg p-6 mb-6">
                <h3 className="font-['Playfair_Display'] font-bold text-white text-lg mb-6 flex items-center gap-2">
                  <span className="w-1 h-5 bg-gradient-to-b from-[#B8C8DC] to-[#7A8FA8] rounded-full" />
                  Personal Information
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {personalInfo.map(({ icon: Icon, label, value }) => (
                    <div key={label} className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-sm bg-[rgba(184,200,220,0.08)] border border-[rgba(184,200,220,0.15)] flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Icon size={14} className="text-[#B8C8DC]" />
                      </div>
                      <div>
                        <div className="text-xs font-['JetBrains_Mono'] text-[#4A5A6A] uppercase tracking-wider">{label}</div>
                        <div className="text-sm font-['Lato'] text-[#D8E4F0] mt-0.5">{value}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.3}>
              <div className="card-cyber rounded-lg p-6">
                <h3 className="font-['Playfair_Display'] font-bold text-white text-lg mb-4 flex items-center gap-2">
                  <span className="w-1 h-5 bg-gradient-to-b from-[#B8C8DC] to-[#7A8FA8] rounded-full" />
                  Current Focus
                </h3>
                <div className="space-y-3">
                  {[
                    { label: "Bayesian MMM & Measurement", pct: 92 },
                    { label: "Marketing Science & Strategy", pct: 95 },
                    { label: "Applied AI & Agent Design", pct: 88 },
                    { label: "Python / Data Engineering", pct: 85 },
                  ].map(({ label, pct }) => (
                    <div key={label}>
                      <div className="flex justify-between mb-1">
                        <span className="text-xs font-['Lato'] text-[#7A8FA8]">{label}</span>
                        <span className="text-xs font-['JetBrains_Mono'] text-[#B8C8DC]">{pct}%</span>
                      </div>
                      <div className="skill-bar-track h-1">
                        <motion.div
                          className="skill-bar-fill"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${pct}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  );
}
