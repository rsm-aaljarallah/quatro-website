/*
 * DESIGN: Cyber-Dark Testimonials Section
 * Placeholder cards — ready to swap in real quotes from professors/colleagues
 * Matches the Deep Navy + Crisp Slate palette of the rest of the site
 */

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    quote:
      "Abdullah consistently demonstrated a rare ability to connect statistical methodology to real business decisions. His work on measurement and causal inference stood out in a cohort of strong analysts.",
    name: "Professor · UC San Diego",
    role: "Marketing Analytics & Measurement",
    initials: "UC",
    color: "#B8C8DC",
    placeholder: true,
  },
  {
    id: 2,
    quote:
      "What sets Abdullah apart is his operator mindset. He doesn't just build models — he asks whether the model will actually change a decision. That's a rare quality at any level.",
    name: "Professor · UC San Diego",
    role: "Business Analytics & Strategy",
    initials: "UC",
    color: "#7A8FA8",
    placeholder: true,
  },
  {
    id: 3,
    quote:
      "Abdullah brings a decade of real-world marketing experience into every analytical problem. His Bayesian MMM work showed genuine depth — both technically and in how he communicated the results to a non-technical audience.",
    name: "Professor · UC San Diego",
    role: "Applied Econometrics & Causal Inference",
    initials: "UC",
    color: "#6A8AA8",
    placeholder: true,
  },
];

export default function TestimonialsSection() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true });

  return (
    <section
      id="testimonials"
      className="py-24 relative"
      style={{ background: "linear-gradient(180deg, #0D1525 0%, #0A0E1A 100%)" }}
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
          <div className="mono-label">07 / Testimonials</div>
          <div className="flex-1 section-divider" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-12"
        >
          <h2 className="font-['Playfair_Display'] font-extrabold text-4xl lg:text-5xl text-white mb-4">
            What People <span className="text-gradient-cyan">Say</span>
          </h2>
          <p className="font-['Lato'] text-[#7A8FA8] text-lg max-w-2xl">
            Perspectives from professors and collaborators on the work and the approach behind it.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {testimonials.map((t, index) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="relative rounded-lg p-6 flex flex-col"
              style={{
                background:
                  "linear-gradient(135deg, rgba(19,29,46,0.7) 0%, rgba(17,24,39,0.8) 100%)",
                border: `1px solid ${t.color}20`,
                boxShadow: `0 0 30px ${t.color}06`,
              }}
            >
              {/* Placeholder badge */}
              {t.placeholder && (
                <div
                  className="absolute top-4 right-4 text-[9px] font-['JetBrains_Mono'] uppercase tracking-widest px-2 py-0.5 rounded-sm"
                  style={{
                    color: `${t.color}70`,
                    background: `${t.color}08`,
                    border: `1px solid ${t.color}18`,
                  }}
                >
                  Pending
                </div>
              )}

              {/* Quote icon */}
              <div
                className="w-9 h-9 rounded-sm flex items-center justify-center mb-5 flex-shrink-0"
                style={{
                  background: `${t.color}12`,
                  border: `1px solid ${t.color}25`,
                }}
              >
                <Quote size={16} style={{ color: t.color }} />
              </div>

              {/* Quote text */}
              <p className="font-['Lato'] text-[#8A9AB8] text-sm leading-relaxed italic flex-1 mb-6">
                "{t.quote}"
              </p>

              {/* Attribution */}
              <div className="flex items-center gap-3 pt-4 border-t border-[rgba(255,255,255,0.05)]">
                <div
                  className="w-9 h-9 rounded-sm flex items-center justify-center flex-shrink-0 font-['JetBrains_Mono'] font-bold text-xs"
                  style={{
                    background: `${t.color}15`,
                    border: `1px solid ${t.color}30`,
                    color: t.color,
                  }}
                >
                  {t.initials}
                </div>
                <div>
                  <div className="font-['Lato'] font-semibold text-[#D8E4F0] text-sm">
                    {t.name}
                  </div>
                  <div className="font-['JetBrains_Mono'] text-[10px] text-[#4A5A6A] mt-0.5">
                    {t.role}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* LinkedIn CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-10 text-center"
        >
          <a
            href="https://www.linkedin.com/in/abdullah-aljarallah-a72512b7/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-sm font-['Playfair_Display'] font-bold text-sm text-[#5A8AB0] transition-all duration-200 hover:bg-[rgba(90,138,176,0.08)] hover:scale-105"
            style={{ border: "1px solid rgba(90,138,176,0.3)" }}
          >
            View LinkedIn Recommendations
          </a>
        </motion.div>
      </div>
    </section>
  );
}
