/*
 * DESIGN: Clean 2-Column About Section
 * Inspired by Merna's About page — prominent circular profile image on left,
 * clean structured text on right.
 */

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Mail, Linkedin, Github } from "lucide-react";

const PROFILE_PIC = "https://d2xsxph8kpxj0f.cloudfront.net/114078457/ULQx4AJViqVMVWnbawSWeU/profile_pic_bf3dcadd.webp";

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
    <section id="about" className="py-24 relative overflow-hidden" style={{ background: "#050810" }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section header */}
        <AnimatedSection>
          <div className="flex items-center gap-4 mb-20">
            <div className="mono-label tracking-[0.2em]">01 / About</div>
            <div className="flex-1 section-divider" />
          </div>
        </AnimatedSection>

        <div className="grid lg:grid-cols-[1fr_2fr] gap-16 items-start">
          
          {/* LEFT: Entity Profile (Pic, Title, Links) */}
          <div className="flex flex-col items-center lg:items-center text-center">
            <AnimatedSection delay={0.1}>
              <div className="relative mb-8">
                {/* Glow behind image */}
                <div className="absolute -inset-4 rounded-full opacity-20 blur-xl"
                  style={{ background: "radial-gradient(circle, #B8C8DC 0%, transparent 70%)" }}
                />
                <img
                  src={PROFILE_PIC}
                  alt="Abdullah Aljarallah"
                  className="relative w-64 h-64 lg:w-72 lg:h-72 rounded-full object-cover object-top border border-[rgba(232,237,245,0.1)] shadow-[0_0_40px_rgba(0,0,0,0.5)]"
                />
              </div>

              <h2 className="font-['Playfair_Display'] font-bold text-3xl text-white mb-2">
                Abdullah Aljarallah
              </h2>
              <p className="font-['Lato'] text-[#7A8FA8] text-sm tracking-wide mb-8">
                MSBA Candidate @ UC San Diego
              </p>

              {/* Social Links */}
              <div className="flex flex-col gap-3 w-full max-w-[200px]">
                <a
                  href="mailto:mr.a.aljarallah@gmail.com"
                  className="flex items-center justify-center gap-3 px-4 py-2.5 rounded-full border border-[rgba(232,237,245,0.1)] text-[#B8C8DC] text-sm hover:bg-[rgba(232,237,245,0.05)] transition-colors"
                >
                  <Mail size={16} />
                  Email Me
                </a>
                <a
                  href="https://www.linkedin.com/in/abdullah-aljarallah-a72512b7/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 px-4 py-2.5 rounded-full border border-[rgba(232,237,245,0.1)] text-[#B8C8DC] text-sm hover:bg-[rgba(232,237,245,0.05)] transition-colors"
                >
                  <Linkedin size={16} />
                  LinkedIn
                </a>
                <a
                  href="https://github.com/rsm-aaljarallah"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 px-4 py-2.5 rounded-full border border-[rgba(232,237,245,0.1)] text-[#B8C8DC] text-sm hover:bg-[rgba(232,237,245,0.05)] transition-colors"
                >
                  <Github size={16} />
                  GitHub
                </a>
              </div>
            </AnimatedSection>
          </div>

          {/* RIGHT: Content (Bio, Work History) */}
          <div className="flex flex-col gap-12">
            
            <AnimatedSection delay={0.2}>
              <div>
                <h3 className="font-['JetBrains_Mono'] uppercase tracking-widest text-xs text-[#4A5A6A] mb-4">
                  Overview
                </h3>
                <div className="h-px w-full bg-[rgba(232,237,245,0.05)] mb-6" />
                <p className="font-['Lato'] text-[#B8C8DC] text-base lg:text-lg leading-relaxed mb-6">
                  Marketing operator turned measurement specialist. Over ten years across the GCC, including a $30M+ marketing portfolio at Kuwait Finance House and roles across banking, government, and enterprise tech. Now finishing my STEM-designated MSBA at UC San Diego with a capstone in Bayesian Marketing Mix Modeling at Direct Avenue.
                </p>
                <p className="font-['Lato'] text-[#7A8FA8] text-base leading-relaxed">
                  I led KFH's first European campaign, drove digital adoption from 0% to 100% across 3,000+ employees at Kuwait's social security institution, and run three side ventures in tourism, diving, and growth consulting. I'm comfortable both running campaigns and building the agent systems that measure them.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.3}>
              <div>
                <h3 className="font-['JetBrains_Mono'] uppercase tracking-widest text-xs text-[#4A5A6A] mb-4">
                  Core Competencies
                </h3>
                <div className="h-px w-full bg-[rgba(232,237,245,0.05)] mb-6" />
                <div className="flex flex-wrap gap-2">
                  {["Bayesian MMM", "Python", "PyMC", "Marketing Science", "SQL", "Tableau", "Power BI", "Claude / MCP", "Streamlit", "Quarto"].map(tag => (
                    <span
                      key={tag}
                      className="px-4 py-1.5 text-xs font-['JetBrains_Mono'] text-[#B8C8DC] bg-[rgba(232,237,245,0.03)] border border-[rgba(232,237,245,0.1)] rounded-full hover:bg-[rgba(232,237,245,0.08)] transition-colors cursor-default"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.4}>
              <div>
                <h3 className="font-['JetBrains_Mono'] uppercase tracking-widest text-xs text-[#4A5A6A] mb-4">
                  Selected Work History
                </h3>
                <div className="h-px w-full bg-[rgba(232,237,245,0.05)] mb-6" />
                <ul className="space-y-6">
                  {[
                    { title: "SVP, Strategic Venture Manager", company: "Banque Misr", year: "2020 - 2023" },
                    { title: "Manager, Corporate & Credit", company: "Corplease S.A.E", year: "2018 - 2020" },
                    { title: "Senior Officer, Corporate & Credit", company: "Corplease S.A.E", year: "2016 - 2018" },
                  ].map((job) => (
                    <li key={job.title} className="flex justify-between items-start gap-4 border-b border-[rgba(232,237,245,0.03)] pb-6 last:border-0 last:pb-0">
                      <div>
                        <div className="font-['Playfair_Display'] font-bold text-[#E8EDF5] text-lg">{job.company}</div>
                        <div className="font-['Lato'] text-[#7A8FA8] text-sm mt-1">{job.title}</div>
                      </div>
                      <div className="font-['JetBrains_Mono'] text-xs text-cyan-400 mt-1 whitespace-nowrap">
                        {job.year}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>
            
          </div>
        </div>
      </div>
    </section>
  );
}
