/*
 * DESIGN: Cyber-Dark Ventures Section
 * Three venture cards: Casa Masira, Dive36, GrowthIQ
 * Fonts: Playfair Display (headings) + Lato (body) + JetBrains Mono (labels)
 */

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Anchor, Waves, TrendingUp, ChevronRight } from "lucide-react";

const ventures = [
  {
    id: "growthiq",
    name: "GrowthIQ",
    tagline: "Growth & Martech Consultancy",
    location: "Kuwait / GCC",
    period: "2024 – Present",
    role: "Founder",
    color: "#B8C8DC",
    icon: TrendingUp,
    description:
      "Growth and martech consultancy advising GCC clients on marketing measurement, attribution, and AI integration.",
    highlights: [
      "Marketing measurement and attribution strategy for GCC brands",
      "AI integration and LLM-augmented workflow design",
    ],
    tags: ["Marketing Science", "AI Integration", "Attribution", "GCC"],
  },
  {
    id: "dive36",
    name: "Dive36 Diving Center",
    tagline: "PADI-Certified Diving Center",
    location: "Kuwait",
    period: "2013 – Present",
    role: "Co-Founder & PADI Master Instructor",
    color: "#7A8FA8",
    icon: Waves,
    description:
      "PADI-certified diving center. 10+ years of instruction, business operations, and marketing.",
    highlights: [
      "10+ years of PADI instruction and business operations",
      "Full marketing and brand management",
    ],
    tags: ["PADI", "Diving Instruction", "Business Operations", "Marketing"],
  },
  {
    id: "casa-masira",
    name: "Casa Masira",
    tagline: "Boat Charter & Adventure Tourism",
    location: "Masirah Island, Oman",
    period: "2022 – Present",
    role: "Co-Founder",
    color: "#6A8AA8",
    icon: Anchor,
    description:
      "Boat charter and adventure tourism business. Run operations, marketing, partnerships, and bookings end-to-end.",
    highlights: [
      "End-to-end operations, marketing, and bookings management",
      "Partnership development in Oman's adventure tourism sector",
    ],
    tags: ["Tourism", "Operations", "Marketing", "Oman"],
  },
];

export default function VenturesSection() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true });

  return (
    <section
      id="ventures"
      className="py-24 relative"
      style={{ background: "linear-gradient(180deg, #0D1525 0%, #0A0E1A 100%)" }}
    >
      {/* Background accent */}
      <div
        className="absolute top-1/2 right-0 w-96 h-96 rounded-full opacity-4 pointer-events-none"
        style={{
          background: "radial-gradient(circle, #B8C8DC 0%, transparent 70%)",
          transform: "translate(40%, -50%)",
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
          <div className="mono-label">06 / Ventures</div>
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
            Side{" "}
            <span className="text-gradient-cyan">Ventures</span>
          </h2>
          <p className="font-['Lato'] text-[#7A8FA8] text-lg max-w-2xl">
            Three independent businesses built and operated alongside a full-time career.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {ventures.map((v, i) => (
            <motion.div
              key={v.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="card-cyber rounded-lg p-6 group"
              style={{ borderColor: `${v.color}20` }}
            >
              {/* Icon + badge */}
              <div className="flex items-start justify-between mb-5">
                <div
                  className="w-12 h-12 rounded-sm flex items-center justify-center"
                  style={{
                    background: `${v.color}15`,
                    border: `1px solid ${v.color}30`,
                  }}
                >
                  <v.icon size={22} style={{ color: v.color }} />
                </div>
                <span
                  className="text-xs font-['JetBrains_Mono'] px-2 py-0.5 rounded-sm"
                  style={{
                    color: v.color,
                    background: `${v.color}15`,
                    border: `1px solid ${v.color}30`,
                  }}
                >
                  {v.role}
                </span>
              </div>

              {/* Name + tagline */}
              <h3 className="font-['Playfair_Display'] font-bold text-white text-xl mb-1">
                {v.name}
              </h3>
              <p className="font-['Lato'] text-sm mb-1" style={{ color: v.color }}>
                {v.tagline}
              </p>
              <p className="font-['JetBrains_Mono'] text-xs text-[#4A5A6A] mb-4">
                {v.location} · {v.period}
              </p>

              {/* Description */}
              <p className="font-['Lato'] text-[#7A8FA8] text-sm leading-relaxed mb-4">
                {v.description}
              </p>

              {/* Highlights */}
              <div className="space-y-1.5 mb-4">
                {v.highlights.map((h) => (
                  <div key={h} className="flex items-start gap-2">
                    <ChevronRight
                      size={13}
                      className="mt-0.5 flex-shrink-0"
                      style={{ color: v.color }}
                    />
                    <span className="font-['Lato'] text-[#94A8C0] text-xs">{h}</span>
                  </div>
                ))}
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5">
                {v.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-['JetBrains_Mono'] px-2 py-0.5 rounded-sm"
                    style={{
                      color: `${v.color}CC`,
                      background: `${v.color}08`,
                      border: `1px solid ${v.color}20`,
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
