/*
 * DESIGN: Projects Page — Deep Navy & Crisp White
 * Lists all academic and professional projects
 * Each card links to a full-screen viewer page for the project HTML
 * Fonts: Playfair Display (headings) + Lato (body) + JetBrains Mono (labels)
 */

import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowLeft, ExternalLink, Calendar, Tag, BookOpen, BarChart2, Brain } from "lucide-react";

const projects = [
  {
    id: "ab-testing",
    slug: "ab-testing",
    title: "A/B Testing a Call to Action",
    subtitle: "Simulating Key Ideas from Classical Frequentist Statistics",
    date: "April 15, 2026",
    course: "Business Analytics · UCSD Rady",
    tags: ["A/B Testing", "Statistics", "Python", "Hypothesis Testing", "Regression"],
    description:
      "An end-to-end statistical analysis of a newsletter sign-up A/B test. Covers Bernoulli modeling, the Law of Large Numbers, bootstrap standard errors, the Central Limit Theorem, hypothesis testing, and the equivalence of the t-test and OLS regression. Includes simulation-based visualizations throughout.",
    highlights: [
      "Simulated 1,000+ visitor sign-up outcomes for two CTA variants",
      "Demonstrated bootstrap SE convergence vs. analytical formula",
      "Proved t-test / OLS regression equivalence numerically",
      "Illustrated the 'peeking problem' in sequential testing",
    ],
    icon: BarChart2,
    url: "/projects/ab-testing.html",
    type: "Academic",
  },
];

export default function Projects() {
  return (
    <div
      className="min-h-screen"
      style={{ background: "#0A0E1A", fontFamily: "'Lato', sans-serif" }}
    >
      {/* Top nav bar */}
      <nav
        className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 border-b"
        style={{
          background: "rgba(10,14,26,0.95)",
          borderColor: "rgba(232,237,245,0.08)",
          backdropFilter: "blur(12px)",
        }}
      >
        <Link href="/">
          <motion.button
            whileHover={{ x: -3 }}
            className="flex items-center gap-2 text-sm"
            style={{ color: "#7A8FA8" }}
          >
            <ArrowLeft size={16} />
            <span style={{ fontFamily: "'Lato', sans-serif" }}>Back to Resume</span>
          </motion.button>
        </Link>
        <div
          className="text-xs font-mono tracking-widest uppercase"
          style={{ color: "#4A5A6A", fontFamily: "'JetBrains Mono', monospace" }}
        >
          Projects
        </div>
        <Link href="/">
          <div
            className="text-sm font-bold"
            style={{ color: "#B8C8DC", fontFamily: "'Playfair Display', serif" }}
          >
            Abdullah Aljarallah
          </div>
        </Link>
      </nav>

      {/* Page header */}
      <div className="max-w-5xl mx-auto px-6 pt-16 pb-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div
            className="inline-flex items-center gap-2 text-xs font-mono tracking-widest uppercase mb-4 px-3 py-1 rounded-sm"
            style={{
              color: "#7A8FA8",
              background: "rgba(232,237,245,0.04)",
              border: "1px solid rgba(232,237,245,0.08)",
              fontFamily: "'JetBrains Mono', monospace",
            }}
          >
            <BookOpen size={11} />
            Academic & Professional Work
          </div>
          <h1
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{ color: "#F8FAFC", fontFamily: "'Playfair Display', serif", lineHeight: 1.15 }}
          >
            Projects
          </h1>
          <p className="text-base max-w-2xl" style={{ color: "#7A8FA8", lineHeight: 1.7 }}>
            A collection of analytical projects, case studies, and coursework from my MSBA program
            at UC San Diego and professional career. Each project demonstrates applied data science,
            statistical reasoning, and business strategy.
          </p>
        </motion.div>
      </div>

      {/* Divider */}
      <div className="max-w-5xl mx-auto px-6">
        <div className="section-divider mb-10" />
      </div>

      {/* Project cards */}
      <div className="max-w-5xl mx-auto px-6 pb-24 space-y-6">
        {projects.map((project, i) => {
          const Icon = project.icon;
          return (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="card-cyber rounded-sm overflow-hidden"
            >
              {/* Card header */}
              <div
                className="flex flex-col md:flex-row md:items-start gap-5 p-6 md:p-8"
              >
                {/* Icon */}
                <div
                  className="flex-shrink-0 w-12 h-12 rounded-sm flex items-center justify-center"
                  style={{
                    background: "rgba(232,237,245,0.06)",
                    border: "1px solid rgba(232,237,245,0.1)",
                  }}
                >
                  <Icon size={22} style={{ color: "#B8C8DC" }} />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  {/* Meta row */}
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <span
                      className="text-xs font-mono tracking-wider uppercase px-2 py-0.5 rounded-sm"
                      style={{
                        color: "#7A8FA8",
                        background: "rgba(232,237,245,0.05)",
                        border: "1px solid rgba(232,237,245,0.08)",
                        fontFamily: "'JetBrains Mono', monospace",
                      }}
                    >
                      {project.type}
                    </span>
                    <span
                      className="flex items-center gap-1 text-xs"
                      style={{ color: "#4A5A6A" }}
                    >
                      <Calendar size={11} />
                      {project.date}
                    </span>
                    <span
                      className="flex items-center gap-1 text-xs"
                      style={{ color: "#4A5A6A" }}
                    >
                      <Brain size={11} />
                      {project.course}
                    </span>
                  </div>

                  {/* Title */}
                  <h2
                    className="text-2xl font-bold mb-1"
                    style={{ color: "#F8FAFC", fontFamily: "'Playfair Display', serif" }}
                  >
                    {project.title}
                  </h2>
                  <p
                    className="text-sm italic mb-4"
                    style={{ color: "#7A8FA8", fontFamily: "'Playfair Display', serif" }}
                  >
                    {project.subtitle}
                  </p>

                  {/* Description */}
                  <p className="text-sm mb-5 leading-relaxed" style={{ color: "#94A8C0" }}>
                    {project.description}
                  </p>

                  {/* Highlights */}
                  <ul className="space-y-1.5 mb-5">
                    {project.highlights.map((h) => (
                      <li key={h} className="flex items-start gap-2 text-sm" style={{ color: "#7A8FA8" }}>
                        <span
                          className="mt-1.5 w-1 h-1 rounded-full flex-shrink-0"
                          style={{ background: "#B8C8DC" }}
                        />
                        {h}
                      </li>
                    ))}
                  </ul>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="flex items-center gap-1 text-xs px-2 py-1 rounded-sm"
                        style={{
                          color: "#7A8FA8",
                          background: "rgba(232,237,245,0.04)",
                          border: "1px solid rgba(232,237,245,0.07)",
                        }}
                      >
                        <Tag size={9} />
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* CTA buttons */}
                  <div className="flex flex-wrap gap-3">
                    <Link href={`/projects/${project.slug}`}>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex items-center gap-2 px-5 py-2.5 rounded-sm text-sm font-bold"
                        style={{
                          background: "linear-gradient(135deg, #4A6A8A, #B8C8DC)",
                          color: "#0A0E1A",
                          fontFamily: "'Lato', sans-serif",
                        }}
                      >
                        <BookOpen size={14} />
                        View Full Report
                      </motion.button>
                    </Link>
                    <a href={project.url} target="_blank" rel="noopener noreferrer">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex items-center gap-2 px-5 py-2.5 rounded-sm text-sm font-bold"
                        style={{
                          border: "1px solid rgba(232,237,245,0.15)",
                          color: "#B8C8DC",
                          fontFamily: "'Lato', sans-serif",
                        }}
                      >
                        <ExternalLink size={14} />
                        Open in New Tab
                      </motion.button>
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}

        {/* Coming soon placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="rounded-sm p-8 text-center"
          style={{
            background: "rgba(232,237,245,0.02)",
            border: "1px dashed rgba(232,237,245,0.08)",
          }}
        >
          <div
            className="text-xs font-mono tracking-widest uppercase mb-3"
            style={{ color: "#3A4A5A", fontFamily: "'JetBrains Mono', monospace" }}
          >
            More Coming Soon
          </div>
          <p className="text-sm" style={{ color: "#3A4A5A" }}>
            Additional projects from the MSBA program will be added here as they are completed.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
