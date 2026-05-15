/*
 * DESIGN: Deep Navy & Crisp White — Certifications Section
 * Clean editorial layout — flat list style, minimal borders
 * Fonts: Playfair Display (headings) + Lato (body) + JetBrains Mono (labels)
 */

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Award } from "lucide-react";

const certGroups = [
  {
    id: "datacamp",
    title: "DataCamp",
    certs: [
      "Machine Learning Fundamentals",
      "Data Manipulation with Python",
      "Statistical Analysis & Modeling",
      "Data Science for Business",
    ],
  },
  {
    id: "applied-ai",
    title: "Applied AI",
    certs: [
      "Fine-Tuning Language Models for Business Tasks",
      "Generative AI for Business",
    ],
  },
  {
    id: "marketing",
    title: "Marketing",
    certs: [
      "Strategic Marketing Planning",
      "Digital Marketing",
      "Social Media Marketing",
      "Innovative Thinking",
    ],
  },
  {
    id: "other",
    title: "Other",
    certs: [
      "PADI Master Instructor",
    ],
  },
];

export default function CertificationsSection() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true });

  return (
    <section
      id="certifications"
      className="py-28 relative"
      style={{ background: "#0A0E1A" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-20"
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
          <h2 className="font-['Playfair_Display'] font-extrabold text-4xl lg:text-5xl text-white mb-4">
            Courses &{" "}
            <span className="text-gradient-cyan">Certifications</span>
          </h2>
          <p className="font-['Lato'] text-[#7A8FA8] text-lg max-w-2xl">
            Continuous learning across AI, data science, and business strategy.
          </p>
        </motion.div>

        {/* Two-column grid of cert groups */}
        <div className="grid md:grid-cols-2 gap-x-16 gap-y-12">
          {certGroups.map((group, groupIndex) => (
            <motion.div
              key={group.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: groupIndex * 0.12 }}
            >
              {/* Group label */}
              <div className="flex items-center gap-2 mb-5">
                <Award size={13} style={{ color: "#5A7A9A" }} />
                <span
                  className="text-xs tracking-widest uppercase"
                  style={{ color: "#5A7A9A", fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.15em" }}
                >
                  {group.title}
                </span>
              </div>

              {/* Cert list */}
              <div className="space-y-0">
                {group.certs.map((cert, certIndex) => (
                  <motion.div
                    key={cert}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: groupIndex * 0.08 + certIndex * 0.06 }}
                    className="flex items-center gap-3 py-3 border-b"
                    style={{ borderColor: "rgba(232,237,245,0.05)" }}
                  >
                    <div
                      className="flex-shrink-0 w-1 h-1 rounded-full"
                      style={{ background: "#4A6A8A" }}
                    />
                    <span className="font-['Lato'] text-sm text-[#94A8C0] leading-snug">
                      {cert}
                    </span>
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
