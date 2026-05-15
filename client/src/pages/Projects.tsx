/*
 * DESIGN: Projects Page — Deep Navy & Crisp White
 * Clean editorial layout inspired by minimal portfolio sites
 * Featured project (Macy's) spans full width at top
 * Remaining projects in a clean list with hover reveal animations
 * Fonts: Playfair Display (headings) + Lato (body) + JetBrains Mono (labels)
 */

import { motion } from "framer-motion";
import { Link } from "wouter";
import {
  ArrowLeft,
  ExternalLink,
  BookOpen,
  Brain,
  BarChart2,
  TrendingUp,
  Cpu,
  ArrowUpRight,
  Users,
  Zap,
} from "lucide-react";

const featuredProject = {
  id: "macys-ai-coworker",
  title: "Macy's AI Marketing Coworker",
  subtitle: "Full-stack AI system for enterprise marketing operations",
  date: "Jan 2026 – May 2026",
  course: "MGTA 452 / 453 / 454 · UCSD Rady",
  type: "Team Project",
  team: "Abdullah AlJarallah · Merna Saad · Shankar D.",
  liveUrl: "https://macys-marketing-gui.vercel.app",
  githubUrl: "https://github.com/rsm-msaad/macys-marketing-gui",
  description:
    "A production-deployed AI coworker for Macy's marketing team, built with Next.js (Vercel) and FastAPI (Render). The system combines 6 deterministic automations and 3 LLM-powered skills to handle the full campaign lifecycle — from audience segmentation and asset discovery to compliance checking, approval briefs, and activation scheduling.",
  stats: [
    { label: "Tests Passing", value: "236" },
    { label: "Automations", value: "6" },
    { label: "LLM Skills", value: "3" },
    { label: "MCP Tools", value: "3" },
  ],
  highlights: [
    "RFM clustering on 50,000+ customers for audience segmentation",
    "RAG knowledge base (12 docs, FAISS index) for brand compliance",
    "LLM-powered approval brief generator and revision router",
    "Timezone-aware activation scheduler with regional pricing overlays",
    "Localization engine generating 40 regional campaign variants",
  ],
  tags: ["Next.js", "FastAPI", "Python", "LLM", "RAG", "FAISS", "Claude", "MCP", "Vercel", "Render"],
};

const projects = [
  {
    id: "bayesian-mmm-capstone",
    slug: null,
    title: "Bayesian Marketing Mix Modeling Capstone",
    subtitle: "AI Research & Agent Lead — Direct Avenue",
    date: "Mar – Jun 2026",
    course: "MSBA Capstone · UCSD Rady",
    tags: ["Bayesian MMM", "PyMC", "Streamlit", "scikit-learn", "Claude", "MCP"],
    description:
      "Built a Bayesian MMM decision-support dashboard in Streamlit and Python for a US performance media agency, replacing a planned multi-agent system after a scope review. Delivered a reproducible MMM pipeline, ML model evaluation, and prompt-design protocols now feeding live client decisions on media allocation.",
    icon: Brain,
    url: null,
    type: "Capstone",
    number: "01",
  },
  {
    id: "neural-vault",
    slug: null,
    title: "Neural Vault — Personal AI Knowledge System",
    subtitle: "Two-layer memory architecture: Claude + Obsidian",
    date: "2024 – Present",
    course: "Independent · Presented at UCSD MGTA 454",
    tags: ["Claude", "MCP", "Obsidian", "Python", "Agent Design"],
    description:
      "Built a two-layer memory architecture combining Claude's native memory with a structured Obsidian wiki. Includes a Context Injection Protocol, COMMIT flag, auto-save git daemon, and MCP integrations for Obsidian, Notion, Gmail, and Google Calendar.",
    icon: Cpu,
    url: null,
    type: "Personal",
    number: "02",
  },
  {
    id: "ab-testing",
    slug: "ab-testing",
    title: "A/B Testing a Call to Action",
    subtitle: "Simulating Key Ideas from Classical Frequentist Statistics",
    date: "April 2026",
    course: "Business Analytics · UCSD Rady",
    tags: ["A/B Testing", "Statistics", "Python", "Hypothesis Testing", "OLS Regression"],
    description:
      "End-to-end statistical analysis of a newsletter sign-up A/B test. Covers Bernoulli modeling, the Law of Large Numbers, bootstrap standard errors, the CLT, hypothesis testing, and the equivalence of the t-test and OLS regression — with simulation-based visualizations throughout.",
    icon: BarChart2,
    url: "/projects/ab-testing.html",
    type: "Academic",
    number: "03",
  },
  {
    id: "card-krueger",
    slug: "card-krueger",
    title: "Replication of Card & Krueger (1994)",
    subtitle: "Minimum Wages and Employment — NJ & PA Fast-Food Industry",
    date: "April 2026",
    course: "Causal Inference · UCSD Rady",
    tags: ["Causal Inference", "DiD", "Python", "Labor Economics", "Placebo Testing"],
    description:
      "Full replication of Card and Krueger's landmark 1994 paper using the original dataset of ~410 fast-food restaurants. Reconstructs all key tables, adds simulation-based DiD intuition, a pre/post employment visualization, and a placebo test to validate the research design.",
    icon: TrendingUp,
    url: "/projects/hw2.html",
    type: "Academic",
    number: "04",
  },
];

export default function Projects() {
  return (
    <div
      className="min-h-screen"
      style={{ background: "#080C18", fontFamily: "'Lato', sans-serif" }}
    >
      {/* Top nav */}
      <nav
        className="sticky top-0 z-50 flex items-center justify-between px-6 md:px-10 py-4 border-b"
        style={{
          background: "rgba(8,12,24,0.96)",
          borderColor: "rgba(232,237,245,0.07)",
          backdropFilter: "blur(16px)",
        }}
      >
        <Link href="/">
          <motion.button
            whileHover={{ x: -4 }}
            transition={{ type: "spring", stiffness: 400 }}
            className="flex items-center gap-2 text-sm"
            style={{ color: "#5A7A9A" }}
          >
            <ArrowLeft size={15} />
            <span>Back</span>
          </motion.button>
        </Link>
        <div
          className="text-xs tracking-widest uppercase"
          style={{ color: "#3A4A5A", fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.2em" }}
        >
          Projects
        </div>
        <Link href="/">
          <div
            className="text-sm font-bold"
            style={{ color: "#B8C8DC", fontFamily: "'Playfair Display', serif" }}
          >
            AJ
          </div>
        </Link>
      </nav>

      <div className="max-w-5xl mx-auto px-6 md:px-10">

        {/* Page header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="pt-16 pb-12"
        >
          <p
            className="text-xs tracking-widest uppercase mb-4"
            style={{ color: "#3A4A5A", fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.2em" }}
          >
            Selected Work
          </p>
          <h1
            className="text-5xl md:text-6xl font-bold mb-5"
            style={{ color: "#F0F4F8", fontFamily: "'Playfair Display', serif", lineHeight: 1.1 }}
          >
            Projects
          </h1>
          <p
            className="text-base max-w-xl leading-relaxed"
            style={{ color: "#5A7A9A" }}
          >
            Applied analytics, AI systems, and causal inference — from production deployments to academic research.
          </p>
        </motion.div>

        {/* Thin rule */}
        <div style={{ height: "1px", background: "rgba(232,237,245,0.06)", marginBottom: "3rem" }} />

        {/* ── FEATURED PROJECT ── */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-16"
        >
          <p
            className="text-xs tracking-widest uppercase mb-6"
            style={{ color: "#3A4A5A", fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.2em" }}
          >
            Featured
          </p>

          <motion.div
            whileHover={{ y: -3 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="relative overflow-hidden rounded-sm"
            style={{
              background: "linear-gradient(135deg, rgba(30,45,70,0.6) 0%, rgba(15,22,40,0.9) 100%)",
              border: "1px solid rgba(184,200,220,0.12)",
            }}
          >
            {/* Top accent line */}
            <div
              style={{
                height: "2px",
                background: "linear-gradient(90deg, #4A6A8A, #B8C8DC, transparent)",
              }}
            />

            <div className="p-8 md:p-10">
              {/* Header row */}
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-8">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <span
                      className="text-xs tracking-widest uppercase px-2.5 py-1"
                      style={{
                        color: "#B8C8DC",
                        background: "rgba(184,200,220,0.08)",
                        border: "1px solid rgba(184,200,220,0.15)",
                        fontFamily: "'JetBrains Mono', monospace",
                        letterSpacing: "0.15em",
                      }}
                    >
                      Team Project
                    </span>
                    <span className="text-xs" style={{ color: "#3A4A5A" }}>
                      {featuredProject.date}
                    </span>
                    <span className="text-xs" style={{ color: "#3A4A5A" }}>
                      {featuredProject.course}
                    </span>
                  </div>

                  <h2
                    className="text-3xl md:text-4xl font-bold mb-2"
                    style={{ color: "#F0F4F8", fontFamily: "'Playfair Display', serif", lineHeight: 1.15 }}
                  >
                    {featuredProject.title}
                  </h2>
                  <p
                    className="text-base italic mb-1"
                    style={{ color: "#7A8FA8", fontFamily: "'Playfair Display', serif" }}
                  >
                    {featuredProject.subtitle}
                  </p>
                  <p className="text-sm flex items-center gap-1.5 mt-2" style={{ color: "#3A4A5A" }}>
                    <Users size={12} />
                    {featuredProject.team}
                  </p>
                </div>

                {/* Stats grid */}
                <div className="grid grid-cols-2 gap-3 md:w-56 flex-shrink-0">
                  {featuredProject.stats.map((stat) => (
                    <div
                      key={stat.label}
                      className="text-center p-3 rounded-sm"
                      style={{
                        background: "rgba(232,237,245,0.04)",
                        border: "1px solid rgba(232,237,245,0.07)",
                      }}
                    >
                      <div
                        className="text-2xl font-bold mb-0.5"
                        style={{ color: "#B8C8DC", fontFamily: "'Playfair Display', serif" }}
                      >
                        {stat.value}
                      </div>
                      <div
                        className="text-xs"
                        style={{ color: "#4A5A6A", fontFamily: "'JetBrains Mono', monospace" }}
                      >
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Description */}
              <p className="text-sm leading-relaxed mb-6" style={{ color: "#94A8C0" }}>
                {featuredProject.description}
              </p>

              {/* Highlights */}
              <div className="grid md:grid-cols-2 gap-2 mb-7">
                {featuredProject.highlights.map((h) => (
                  <div key={h} className="flex items-start gap-2.5 text-sm" style={{ color: "#7A8FA8" }}>
                    <Zap size={12} className="mt-0.5 flex-shrink-0" style={{ color: "#B8C8DC" }} />
                    {h}
                  </div>
                ))}
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-7">
                {featuredProject.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2.5 py-1"
                    style={{
                      color: "#5A7A9A",
                      background: "rgba(232,237,245,0.03)",
                      border: "1px solid rgba(232,237,245,0.07)",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap gap-3">
                <a href={featuredProject.liveUrl} target="_blank" rel="noopener noreferrer">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center gap-2 px-5 py-2.5 text-sm font-bold"
                    style={{
                      background: "linear-gradient(135deg, #4A6A8A, #B8C8DC)",
                      color: "#080C18",
                    }}
                  >
                    <ExternalLink size={13} />
                    Live Demo
                  </motion.button>
                </a>
                <a href={featuredProject.githubUrl} target="_blank" rel="noopener noreferrer">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center gap-2 px-5 py-2.5 text-sm"
                    style={{
                      border: "1px solid rgba(232,237,245,0.12)",
                      color: "#7A8FA8",
                    }}
                  >
                    <ArrowUpRight size={13} />
                    GitHub Repo
                  </motion.button>
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* ── PROJECT LIST ── */}
        <div className="mb-6">
          <p
            className="text-xs tracking-widest uppercase"
            style={{ color: "#3A4A5A", fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.2em" }}
          >
            All Projects
          </p>
        </div>

        <div className="space-y-0 mb-24">
          {projects.map((project, i) => {
            const Icon = project.icon;
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + i * 0.08, duration: 0.5 }}
              >
                {/* Top border */}
                <div style={{ height: "1px", background: "rgba(232,237,245,0.06)" }} />

                <motion.div
                  whileHover={{ backgroundColor: "rgba(232,237,245,0.025)" }}
                  transition={{ duration: 0.2 }}
                  className="group py-7 px-2 -mx-2"
                  style={{ cursor: project.url ? "pointer" : "default" }}
                >
                  <div className="flex items-start gap-6">
                    {/* Number */}
                    <div
                      className="flex-shrink-0 text-xs pt-1 w-8 text-right"
                      style={{ color: "#2A3A4A", fontFamily: "'JetBrains Mono', monospace" }}
                    >
                      {project.number}
                    </div>

                    {/* Icon */}
                    <div
                      className="flex-shrink-0 w-9 h-9 flex items-center justify-center mt-0.5"
                      style={{
                        background: "rgba(232,237,245,0.04)",
                        border: "1px solid rgba(232,237,245,0.07)",
                      }}
                    >
                      <Icon size={16} style={{ color: "#5A7A9A" }} />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-2">
                        <div>
                          <div className="flex flex-wrap items-center gap-2 mb-1.5">
                            <span
                              className="text-xs tracking-wider uppercase"
                              style={{
                                color: "#3A4A5A",
                                fontFamily: "'JetBrains Mono', monospace",
                                letterSpacing: "0.12em",
                              }}
                            >
                              {project.type}
                            </span>
                            <span className="text-xs" style={{ color: "#2A3A4A" }}>·</span>
                            <span className="text-xs" style={{ color: "#2A3A4A" }}>{project.date}</span>
                          </div>
                          <h3
                            className="text-xl font-bold mb-0.5"
                            style={{ color: "#E8EDF5", fontFamily: "'Playfair Display', serif" }}
                          >
                            {project.title}
                          </h3>
                          <p
                            className="text-sm italic"
                            style={{ color: "#5A7A9A", fontFamily: "'Playfair Display', serif" }}
                          >
                            {project.subtitle}
                          </p>
                        </div>

                        {/* Arrow — visible on hover */}
                        <div
                          className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 mt-1"
                        >
                          {project.url ? (
                            <Link href={`/projects/${project.slug}`}>
                              <motion.div
                                whileHover={{ x: 3, y: -3 }}
                                className="flex items-center gap-1.5 text-xs"
                                style={{ color: "#B8C8DC" }}
                              >
                                View Report
                                <ArrowUpRight size={13} />
                              </motion.div>
                            </Link>
                          ) : (
                            <span className="text-xs" style={{ color: "#3A4A5A" }}>Coming soon</span>
                          )}
                        </div>
                      </div>

                      {/* Description — collapsed, expands on hover */}
                      <p
                        className="text-sm leading-relaxed mb-4 mt-3"
                        style={{ color: "#5A7A9A" }}
                      >
                        {project.description}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1.5">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-xs px-2 py-0.5"
                            style={{
                              color: "#3A4A5A",
                              background: "rgba(232,237,245,0.03)",
                              border: "1px solid rgba(232,237,245,0.06)",
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* CTA row for projects with reports */}
                      {project.url && (
                        <div className="flex gap-3 mt-4">
                          <Link href={`/projects/${project.slug}`}>
                            <motion.button
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold"
                              style={{
                                background: "linear-gradient(135deg, #4A6A8A, #B8C8DC)",
                                color: "#080C18",
                              }}
                            >
                              <BookOpen size={11} />
                              View Full Report
                            </motion.button>
                          </Link>
                          <a href={project.url} target="_blank" rel="noopener noreferrer">
                            <motion.button
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              className="flex items-center gap-1.5 px-4 py-2 text-xs"
                              style={{
                                border: "1px solid rgba(232,237,245,0.1)",
                                color: "#5A7A9A",
                              }}
                            >
                              <ExternalLink size={11} />
                              Open in New Tab
                            </motion.button>
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}

          {/* Bottom border */}
          <div style={{ height: "1px", background: "rgba(232,237,245,0.06)" }} />
        </div>

        {/* Footer note */}
        <div className="pb-16 text-center">
          <p className="text-xs" style={{ color: "#2A3A4A" }}>
            More projects added as the MSBA program progresses
          </p>
        </div>
      </div>
    </div>
  );
}
