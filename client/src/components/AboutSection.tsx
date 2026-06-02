/*
 * DESIGN: Clean 2-Column About Section
 * Left: Entity Profile (Pic, Title, Links)
 * Right: Origin Story Narrative and Education History
 */

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Mail, Linkedin, Github, GraduationCap } from "lucide-react";

const PROFILE_PIC = "https://d2xsxph8kpxj0f.cloudfront.net/114078457/ULQx4AJViqVMVWnbawSWeU/profile_pic_bf3dcadd.webp";

const education = [
  {
    degree: "MSBA, STEM-designated",
    school: "UC San Diego — Rady School of Management",
    location: "San Diego, CA",
    year: "Expected Jun 2026",
    highlight: true,
  },
  {
    degree: "BBA, Marketing Major",
    school: "University of Missouri — Kansas City",
    location: "Kansas City, MO",
    year: "2015",
    highlight: false,
  }
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
    <section id="about" className="py-24 relative overflow-hidden" style={{ background: "#050810" }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section header */}
        <AnimatedSection>
          <div className="flex items-center gap-4 mb-20">
            <div className="mono-label tracking-[0.2em]">01 / Origin</div>
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

          {/* RIGHT: Content (Bio, Education) */}
          <div className="flex flex-col gap-12">
            
            <AnimatedSection delay={0.2}>
              <div>
                <h3 className="font-['JetBrains_Mono'] uppercase tracking-widest text-xs text-[#4A5A6A] mb-4">
                  The Journey
                </h3>
                <div className="h-px w-full bg-[rgba(232,237,245,0.05)] mb-6" />
                <p className="font-['Lato'] text-[#B8C8DC] text-base lg:text-lg leading-relaxed mb-6">
                  My career started on the ground floor of marketing execution in Kuwait. For over a decade, I operated across banking, government, and enterprise tech—most notably managing a $30M+ marketing portfolio at Kuwait Finance House.
                </p>
                <p className="font-['Lato'] text-[#7A8FA8] text-base leading-relaxed mb-6">
                  But managing multi-million dollar budgets taught me a hard truth: <strong className="text-[#E8EDF5]">marketing is often run on intuition, not inference.</strong>
                </p>
                <p className="font-['Lato'] text-[#7A8FA8] text-base leading-relaxed">
                  I pivoted. I wanted to build the systems that actually measure the impact of these massive investments. Today, I am finishing my STEM-designated Master of Science in Business Analytics at UC San Diego, specializing in Bayesian Marketing Mix Modeling, causal inference, and applied AI agent systems.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.3}>
              <div>
                <h3 className="font-['JetBrains_Mono'] uppercase tracking-widest text-xs text-[#4A5A6A] mb-4">
                  Academic Foundation
                </h3>
                <div className="h-px w-full bg-[rgba(232,237,245,0.05)] mb-6" />
                
                <div className="space-y-4">
                  {education.map((edu, i) => (
                    <div 
                      key={i}
                      className={`relative p-5 rounded-xl border transition-all duration-300 hover:-translate-y-1 ${
                        edu.highlight 
                          ? "bg-[rgba(34,211,238,0.05)] border-[rgba(34,211,238,0.2)] shadow-[0_10px_30px_rgba(34,211,238,0.1)]" 
                          : "bg-[rgba(10,14,26,0.5)] border-[rgba(232,237,245,0.05)]"
                      }`}
                    >
                      {edu.highlight && (
                        <div className="absolute top-0 right-6 -translate-y-1/2">
                          <span className="bg-cyan-400 text-[#050810] text-[9px] font-bold tracking-widest uppercase px-3 py-1 rounded-full shadow-[0_0_10px_rgba(34,211,238,0.5)]">
                            Current
                          </span>
                        </div>
                      )}
                      
                      <div className="flex items-start gap-4">
                        <div className={`mt-1 p-2 rounded-lg ${edu.highlight ? 'bg-[rgba(34,211,238,0.1)] text-cyan-400' : 'bg-[rgba(232,237,245,0.05)] text-[#4A5A6A]'}`}>
                          <GraduationCap size={18} />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-['Playfair_Display'] font-bold text-lg text-white mb-1">{edu.degree}</h4>
                          <p className={`font-['Lato'] text-sm mb-2 ${edu.highlight ? 'text-cyan-400' : 'text-[#7A8FA8]'}`}>
                            {edu.school}
                          </p>
                          <div className="flex items-center justify-between w-full">
                            <span className="text-xs font-['JetBrains_Mono'] text-[#4A5A6A]">{edu.location}</span>
                            <span className="text-xs font-['JetBrains_Mono'] text-cyan-400">{edu.year}</span>
                          </div>
                        </div>
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
