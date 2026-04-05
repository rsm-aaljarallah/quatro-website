/*
 * DESIGN: Cyber-Dark Experience Section
 * Vertical timeline with animated cards, achievement bullets
 * Alternating left/right layout on desktop
 */

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Briefcase, TrendingUp, Award, ChevronRight } from "lucide-react";

const experiences = [
  {
    id: 1,
    role: "Public Relations Specialist",
    company: "The Public Institution for Social Security",
    period: "December 2020 – Present",
    type: "Current",
    color: "#00D4FF",
    icon: Briefcase,
    description: "Leading strategic communications initiatives to position the institution as a center of excellence. Developed and implemented comprehensive digital transformation strategies that revolutionized internal and external communications.",
    achievements: [
      "Designed the institution's first comprehensive marketing calendar and content guidelines",
      "Drove email adoption from 0% to 100% through strategic campaigns and engagement initiatives",
      "Created and launched an internal high-performance recognition program boosting employee engagement",
    ],
    tags: ["PR Strategy", "Digital Transformation", "Content Marketing", "Change Management"],
  },
  {
    id: 2,
    role: "Marketing Analyst",
    company: "Kuwait Finance House (KFH)",
    period: "September 2017 – December 2020",
    type: "3 Years",
    color: "#0066FF",
    icon: TrendingUp,
    description: "Managed high-value marketing campaigns across Group Retail Banking, Group Corporate Banking, and Private Banking divisions. Strategically allocated budgets and deployed integrated marketing communication tools.",
    achievements: [
      "Managed marketing portfolio worth approximately $30 million USD across multiple banking divisions",
      "Pioneered KFH's first-ever European marketing campaign, delivering astonishing ROI and earning instant promotion",
      "Developed data-driven strategies that significantly increased product adoption and customer engagement",
    ],
    tags: ["$30M Portfolio", "Banking Marketing", "Campaign Management", "Data Analytics"],
  },
  {
    id: 3,
    role: "Account Manager",
    company: "Xerox – Alghanim Industries",
    period: "June 2016 – September 2017",
    type: "1.5 Years",
    color: "#4A90D9",
    icon: Award,
    description: "Drove revenue growth through strategic account management and solution selling of Xerox products, extensions, and smart technological solutions. Collaborated with sales leadership to develop sophisticated account strategies.",
    achievements: [
      "Generated KD 3 million (~$10M USD) in sales revenue through tender management and smart solutions",
      "Consistently exceeded sales targets by identifying customer needs and delivering tailored proposals",
      "Built strong client relationships resulting in repeat business and long-term partnerships",
    ],
    tags: ["Solution Selling", "Account Management", "B2B Sales", "Smart Technology"],
  },
  {
    id: 4,
    role: "Diving Instructor & Partner",
    company: "Dive 36 – Diving Center",
    period: "May 2013 – Present",
    type: "Ongoing",
    color: "#2A6A9A",
    icon: Briefcase,
    description: "Teaching students individually or in groups using discussions and demonstrations. Managing business operations, strategic planning, and employee supervision.",
    achievements: [
      "Certified SCUBA diving instructor with 10+ years of teaching experience",
      "Managing business operations and strategic planning for the diving center",
      "Developing confident divers by overcoming obstacles novice divers face",
    ],
    tags: ["Instruction", "Business Operations", "Leadership", "Safety Management"],
  },
];

function ExperienceCard({ exp, index }: { exp: typeof experiences[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
      className="relative"
    >
      {/* Timeline dot */}
      <div
        className="absolute left-0 lg:left-1/2 top-8 w-4 h-4 rounded-full border-2 z-10 -translate-x-1/2 hidden lg:block"
        style={{
          borderColor: exp.color,
          backgroundColor: "#050A18",
          boxShadow: `0 0 12px ${exp.color}60`,
        }}
      />

      {/* Card */}
      <div className={`lg:w-[calc(50%-2rem)] ${index % 2 === 0 ? "lg:mr-auto lg:pr-8" : "lg:ml-auto lg:pl-8"}`}>
        <div
          className="card-cyber rounded-lg p-6 group"
          style={{ borderColor: `${exp.color}20` }}
        >
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-sm flex items-center justify-center flex-shrink-0"
                style={{ background: `${exp.color}15`, border: `1px solid ${exp.color}30` }}
              >
                <exp.icon size={18} style={{ color: exp.color }} />
              </div>
              <div>
                <h3 className="font-['Syne'] font-bold text-white text-lg leading-tight">{exp.role}</h3>
                <p className="font-['DM_Sans'] text-sm mt-0.5" style={{ color: exp.color }}>{exp.company}</p>
              </div>
            </div>
            <div className="flex flex-col items-end gap-1 flex-shrink-0 ml-4">
              <span
                className="text-xs font-['JetBrains_Mono'] px-2 py-0.5 rounded-sm"
                style={{ color: exp.color, background: `${exp.color}15`, border: `1px solid ${exp.color}30` }}
              >
                {exp.type}
              </span>
              <span className="text-xs font-['DM_Sans'] text-[#5A7A9A]">{exp.period}</span>
            </div>
          </div>

          {/* Description */}
          <p className="font-['DM_Sans'] text-[#8BA8CC] text-sm leading-relaxed mb-4">{exp.description}</p>

          {/* Achievements */}
          <div className="space-y-2 mb-4">
            {exp.achievements.map((ach, i) => (
              <div key={i} className="flex items-start gap-2">
                <ChevronRight size={14} className="mt-0.5 flex-shrink-0" style={{ color: exp.color }} />
                <span className="font-['DM_Sans'] text-[#A8C0E0] text-sm">{ach}</span>
              </div>
            ))}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5">
            {exp.tags.map(tag => (
              <span
                key={tag}
                className="text-xs font-['JetBrains_Mono'] px-2 py-0.5 rounded-sm"
                style={{
                  color: `${exp.color}CC`,
                  background: `${exp.color}08`,
                  border: `1px solid ${exp.color}20`,
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function ExperienceSection() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true });

  return (
    <section id="experience" className="py-24 relative" style={{ background: "linear-gradient(180deg, #050A18 0%, #070E20 100%)" }}>
      {/* Background accent */}
      <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full opacity-5 pointer-events-none"
        style={{ background: "radial-gradient(circle, #0066FF 0%, transparent 70%)", transform: "translate(-30%, 30%)" }}
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
          <div className="mono-label">02 / Experience</div>
          <div className="flex-1 section-divider" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-center mb-16"
        >
          <h2 className="font-['Syne'] font-extrabold text-4xl lg:text-5xl text-white mb-4">
            Professional <span className="text-gradient-cyan">Journey</span>
          </h2>
          <p className="font-['DM_Sans'] text-[#8BA8CC] text-lg max-w-2xl mx-auto">
            Over a decade of experience across public relations, banking, enterprise technology, and entrepreneurship.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Center line (desktop) */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2"
            style={{ background: "linear-gradient(180deg, transparent, rgba(0,212,255,0.3), rgba(0,102,255,0.3), transparent)" }}
          />

          <div className="space-y-10">
            {experiences.map((exp, i) => (
              <ExperienceCard key={exp.id} exp={exp} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
