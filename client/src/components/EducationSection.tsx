/*
 * DESIGN: Cyber-Dark Education Section
 * Card-based layout with institution logos/icons
 * Highlighted current UCSD enrollment
 */

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { GraduationCap, Star, BookOpen } from "lucide-react";

const education = [
  {
    id: 1,
    degree: "Master of Science in Business Analytics",
    school: "University of California, San Diego",
    shortName: "UC San Diego",
    program: "Rady School of Management",
    period: "Current",
    gpa: null,
    status: "In Progress",
    highlight: true,
    color: "#B8C8DC",
    icon: GraduationCap,
    description: "STEM-designated MSBA program. Capstone in Bayesian Marketing Mix Modeling at Direct Avenue, a US performance media agency.",
    highlights: [
      "Bayesian methods, optimization, classification, uplift modeling",
      "GenAI for Business (Prof. Vincent Nijs, MGTA 454)",
      "Regression, digital disruption (Prof. Thales Teixeira)",
      "Expected graduation: June 2026",
    ],
  },
  {
    id: 2,
    degree: "Bachelor of Business Administration",
    school: "University of Missouri – Kansas City",
    shortName: "UMKC",
    program: "Marketing Major",
    period: "2015",
    gpa: "3.5",
    status: "Graduated with Honors",
    highlight: false,
    color: "#7A8FA8",
    icon: Star,
    description: "Graduated with honors in Marketing major. GPA 3.5.",
    highlights: [
      "Graduated with Honors — GPA 3.5",
      "Marketing Major",
    ],
  },
  {
    id: 3,
    degree: "Diploma of Business Administration",
    school: "Australian College of Kuwait",
    shortName: "ACK",
    program: "Marketing Emphasis",
    period: "Completed",
    gpa: null,
    status: "Completed",
    highlight: false,
    color: "#6A8AA8",
    icon: BookOpen,
    description: "Diploma in Business Administration with emphasis in marketing, providing foundational business and marketing knowledge.",
    highlights: [
      "Business Administration fundamentals",
      "Marketing emphasis and strategy",
      "Foundation for advanced business studies",
    ],
  },
];

export default function EducationSection() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true });

  return (
    <section id="education" className="py-24 relative" style={{ background: "#0A0E1A" }}>
      {/* Background accent */}
      <div className="absolute top-1/2 right-0 w-96 h-96 rounded-full opacity-5 pointer-events-none"
        style={{ background: "radial-gradient(circle, #B8C8DC 0%, transparent 70%)", transform: "translate(40%, -50%)" }}
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
          <div className="mono-label">03 / Education</div>
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
            Academic <span className="text-gradient-cyan">Foundation</span>
          </h2>
          <p className="font-['Lato'] text-[#7A8FA8] text-lg max-w-2xl">
            A progressive academic journey from Kuwait to the United States, culminating in a cutting-edge STEM analytics program.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {education.map((edu, index) => (
            <motion.div
              key={edu.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="relative"
            >
              {/* Featured badge for current */}
              {edu.highlight && (
                <div
                  className="absolute -top-3 left-6 px-3 py-1 text-xs font-['JetBrains_Mono'] font-bold rounded-sm z-10"
                  style={{
                    background: "linear-gradient(90deg, #B8C8DC, #7A8FA8)",
                    color: "#0A0E1A",
                  }}
                >
                  CURRENT ENROLLMENT
                </div>
              )}

              <div
                className="card-cyber rounded-lg p-6 h-full flex flex-col"
                style={{
                  borderColor: edu.highlight ? `${edu.color}40` : `${edu.color}15`,
                  boxShadow: edu.highlight ? `0 0 30px ${edu.color}15` : "none",
                }}
              >
                {/* School badge */}
                <div className="flex items-start justify-between mb-4">
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center text-lg font-['Playfair_Display'] font-extrabold"
                    style={{
                      background: `${edu.color}15`,
                      border: `1px solid ${edu.color}30`,
                      color: edu.color,
                    }}
                  >
                    {edu.shortName.slice(0, 2)}
                  </div>
                  <span
                    className="text-xs font-['JetBrains_Mono'] px-2 py-1 rounded-sm"
                    style={{ color: edu.color, background: `${edu.color}10`, border: `1px solid ${edu.color}25` }}
                  >
                    {edu.status}
                  </span>
                </div>

                {/* Degree */}
                <h3 className="font-['Playfair_Display'] font-bold text-white text-lg leading-tight mb-1">{edu.degree}</h3>
                <p className="font-['Lato'] text-sm mb-0.5" style={{ color: edu.color }}>{edu.school}</p>
                <p className="font-['Lato'] text-xs text-[#4A5A6A] mb-1">{edu.program}</p>

                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xs font-['JetBrains_Mono'] text-[#4A5A6A]">{edu.period}</span>
                  {edu.gpa && (
                    <>
                      <span className="w-1 h-1 rounded-full bg-[#4A5A6A]" />
                      <span className="text-xs font-['JetBrains_Mono']" style={{ color: edu.color }}>GPA: {edu.gpa}</span>
                    </>
                  )}
                </div>

                <p className="font-['Lato'] text-[#7A8FA8] text-sm leading-relaxed mb-4 flex-1">{edu.description}</p>

                {/* Highlights */}
                <div className="space-y-1.5 mt-auto">
                  {edu.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <div
                        className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0"
                        style={{ background: edu.color }}
                      />
                      <span className="font-['Lato'] text-[#7A8FA8] text-xs">{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
