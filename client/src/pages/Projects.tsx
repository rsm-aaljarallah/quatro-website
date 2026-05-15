/*
 * DESIGN: Projects Page — Deep Navy & Crisp White
 * Clean editorial layout inspired by minimal portfolio sites
 * Featured project (Macy's) spans full width at top with cover image
 * Remaining projects in a clean grid with cover images and hover animations
 * Fonts: Playfair Display (headings) + Lato (body) + JetBrains Mono (labels)
 */

import { motion } from "framer-motion";
import { Link } from "wouter";
import {
  ArrowLeft,
  ExternalLink,
  BookOpen,
  ArrowUpRight,
  Users,
  Zap,
  Github,
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
  coverImage: "https://d2xsxph8kpxj0f.cloudfront.net/114078457/ULQx4AJViqVMVWnbawSWeU/project_macys_dark-YCoRpRaiXXvckqiTxdGxXu.webp",
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
    title: "Bayesian MMM Capstone",
    subtitle: "Marketing Mix Modeling for Direct Avenue",
    date: "Mar – Jun 2026",
    course: "MSBA Capstone · UCSD Rady",
    tags: ["Bayesian MMM", "PyMC", "Streamlit", "scikit-learn", "Claude"],
    description:
      "Owning the advertiser learning agenda — industry research, prompt and reasoning design, and the agent/AI research repository — for a US performance media agency. Shipping a Bayesian MMM decision-support dashboard in Streamlit and Python, a privacy-first reproducible MMM pipeline, model evaluation harness, and prompt-design protocols that now feed live client decisions on media allocation.",
    url: null,
    type: "Capstone",
    number: "01",
    coverImage: "https://d2xsxph8kpxj0f.cloudfront.net/114078457/ULQx4AJViqVMVWnbawSWeU/project_bayesian_mmm_dark-8h6Z9jLEykDH87WB3DNfaJ.webp",
  },
  {
    id: "neural-vault",
    slug: null,
    title: "Neural Vault",
    subtitle: "AI Knowledge System with Semantic Search",
    date: "2024 – Present",
    course: "Independent · Presented at UCSD MGTA 454",
    tags: ["Claude", "MCP", "Obsidian", "Python", "Agent Design"],
    description:
      "A two-layer memory architecture combining Claude's native memory with a structured Obsidian wiki. Includes a Context Injection Protocol, COMMIT flag, auto-save git daemon, and MCP integrations for Obsidian, Notion, Gmail, and Google Calendar.",
    url: null,
    githubUrl: "https://github.com/rsm-aaljarallah/neural-vault",
    type: "Personal",
    number: "02",
    coverImage: "https://d2xsxph8kpxj0f.cloudfront.net/114078457/ULQx4AJViqVMVWnbawSWeU/project_neural_vault_dark-2mhf8LzFiG7ZVxkooSr2up.webp",
  },
  {
    id: "ab-testing",
    slug: "ab-testing",
    title: "A/B Testing a Call to Action",
    subtitle: "Simulating Classical Frequentist Statistics",
    date: "April 2026",
    course: "Business Analytics · UCSD Rady",
    tags: ["A/B Testing", "Statistics", "Python", "Hypothesis Testing", "OLS"],
    description:
      "End-to-end statistical analysis of a newsletter sign-up A/B test. Covers the Law of Large Numbers, bootstrap standard errors, the CLT, hypothesis testing, and the equivalence of the t-test and OLS regression — with simulation-based visualizations throughout.",
    url: "/projects/ab-testing.html",
    githubUrl: "https://github.com/rsm-aaljarallah/quarto_site/tree/main/projects/ab_testing_cta",
    type: "Academic",
    number: "03",
    coverImage: "https://d2xsxph8kpxj0f.cloudfront.net/114078457/ULQx4AJViqVMVWnbawSWeU/project_ab_testing_dark-aVeFLTSn9xgTBaEjfKywrK.webp",
  },
  {
    id: "card-krueger",
    slug: "card-krueger",
    title: "Card & Krueger (1994) Replication",
    subtitle: "Minimum Wages & Employment — NJ & PA Fast-Food",
    date: "April 2026",
    course: "Causal Inference · UCSD Rady",
    tags: ["Causal Inference", "DiD", "Python", "Labor Economics", "Placebo Testing"],
    description:
      "Full replication of Card and Krueger's landmark 1994 paper using the original dataset of ~410 fast-food restaurants. Reconstructs all key tables, adds simulation-based DiD intuition, a pre/post employment visualization, and a placebo test.",
    url: "/projects/hw2.html",
    githubUrl: "https://github.com/rsm-aaljarallah/quarto_site/tree/main/projects/HW2",
    type: "Academic",
    number: "04",
    coverImage: "https://d2xsxph8kpxj0f.cloudfront.net/114078457/ULQx4AJViqVMVWnbawSWeU/project_card_krueger_dark-EasqFTyftE8hLKBDYy6gKm.webp",
  },
  {
    id: "poisson-mle",
    slug: "poisson-mle",
    title: "Poisson Regression & Maximum Likelihood",
    subtitle: "A Case Study of Blueprinty's Software and Patent Awards",
    date: "May 2026",
    course: "Business Analytics · UCSD Rady",
    tags: ["MLE", "Poisson Regression", "Python", "Plotly", "Counterfactual Analysis"],
    description:
      "Full MLE pipeline from scratch: hand-coded log-likelihood, BFGS optimization, Hessian-based standard errors, and animated counterfactual analysis. Interactive Plotly charts with a Poisson Explorer widget. Verified against statsmodels GLM to machine precision.",
    url: "/projects/hw3-mle.html",
    type: "Academic",
    number: "05",
    coverImage: "https://d2xsxph8kpxj0f.cloudfront.net/114078457/ULQx4AJViqVMVWnbawSWeU/project_poisson_mle_themed-TXwTh4uFv8vjdn64XEY6sb.webp",
  },
  {
    id: "roi-dashboard-churn",
    slug: null,
    title: "Marketing Campaign ROI Dashboard + Churn Model",
    subtitle: "Multi-channel Performance & Customer Retention",
    date: "2025",
    course: "UCSD Rady",
    tags: ["Power BI", "SQL", "Python", "scikit-learn", "Tableau"],
    description:
      "Power BI dashboard with ~23% modeled ROI lift across multi-channel performance; churn prediction model with 87% accuracy and ~15% projected churn reduction across financial services case data.",
    url: null,
    type: "Academic",
    number: "06",
    coverImage: "https://d2xsxph8kpxj0f.cloudfront.net/114078457/ULQx4AJViqVMVWnbawSWeU/project_roi_dashboard_dark-GTepwQzYoptmvXE7Cd63Jc.webp",
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
          className="pt-20 pb-14"
        >
          <p
            className="text-xs tracking-widest uppercase mb-5"
            style={{ color: "#3A4A5A", fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.2em" }}
          >
            Selected Work
          </p>
          <h1
            className="text-5xl md:text-6xl font-bold mb-6"
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
        <div style={{ height: "1px", background: "rgba(232,237,245,0.06)", marginBottom: "4rem" }} />

        {/* ── FEATURED PROJECT ── */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-20"
        >
          <p
            className="text-xs tracking-widest uppercase mb-8"
            style={{ color: "#3A4A5A", fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.2em" }}
          >
            Featured
          </p>

          <motion.div
            whileHover={{ y: -4 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="relative overflow-hidden"
            style={{
              background: "linear-gradient(135deg, rgba(30,45,70,0.5) 0%, rgba(15,22,40,0.9) 100%)",
              border: "1px solid rgba(184,200,220,0.10)",
            }}
          >
            {/* Top accent line */}
            <div style={{ height: "2px", background: "linear-gradient(90deg, #4A6A8A, #B8C8DC, transparent)" }} />

            <div className="flex flex-col md:flex-row">
              {/* Cover image */}
              <div
                className="md:w-72 flex-shrink-0 overflow-hidden"
                style={{ minHeight: "240px" }}
              >
                <img
                  src={featuredProject.coverImage}
                  alt={featuredProject.title}
                  className="w-full h-full object-cover"
                  style={{ minHeight: "240px" }}
                />
              </div>

              {/* Content */}
              <div className="flex-1 p-8 md:p-10">
                <div className="flex flex-wrap items-center gap-3 mb-5">
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
                  <span className="text-xs" style={{ color: "#3A4A5A" }}>{featuredProject.date}</span>
                  <span className="text-xs" style={{ color: "#3A4A5A" }}>{featuredProject.course}</span>
                </div>

                <h2
                  className="text-2xl md:text-3xl font-bold mb-2"
                  style={{ color: "#F0F4F8", fontFamily: "'Playfair Display', serif", lineHeight: 1.2 }}
                >
                  {featuredProject.title}
                </h2>
                <p
                  className="text-sm italic mb-2"
                  style={{ color: "#7A8FA8", fontFamily: "'Playfair Display', serif" }}
                >
                  {featuredProject.subtitle}
                </p>
                <p className="text-xs flex items-center gap-1.5 mb-5" style={{ color: "#3A4A5A" }}>
                  <Users size={11} />
                  {featuredProject.team}
                </p>

                {/* Stats */}
                <div className="grid grid-cols-4 gap-3 mb-5">
                  {featuredProject.stats.map((stat) => (
                    <div
                      key={stat.label}
                      className="text-center p-3"
                      style={{ background: "rgba(232,237,245,0.04)", border: "1px solid rgba(232,237,245,0.07)" }}
                    >
                      <div className="text-xl font-bold mb-0.5" style={{ color: "#B8C8DC", fontFamily: "'Playfair Display', serif" }}>
                        {stat.value}
                      </div>
                      <div className="text-xs" style={{ color: "#4A5A6A", fontFamily: "'JetBrains Mono', monospace" }}>
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>

                <p className="text-sm leading-relaxed mb-5" style={{ color: "#7A8FA8" }}>
                  {featuredProject.description}
                </p>

                {/* Highlights */}
                <div className="space-y-1.5 mb-6">
                  {featuredProject.highlights.map((h) => (
                    <div key={h} className="flex items-start gap-2.5 text-xs" style={{ color: "#5A7A9A" }}>
                      <Zap size={11} className="mt-0.5 flex-shrink-0" style={{ color: "#B8C8DC" }} />
                      {h}
                    </div>
                  ))}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {featuredProject.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-0.5"
                      style={{ color: "#4A5A6A", background: "rgba(232,237,245,0.03)", border: "1px solid rgba(232,237,245,0.06)" }}
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
                      style={{ background: "linear-gradient(135deg, #4A6A8A, #B8C8DC)", color: "#080C18" }}
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
                      style={{ border: "1px solid rgba(232,237,245,0.12)", color: "#7A8FA8" }}
                    >
                      <ArrowUpRight size={13} />
                      GitHub Repo
                    </motion.button>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* ── PROJECT GRID ── */}
        <div className="mb-10">
          <p
            className="text-xs tracking-widest uppercase"
            style={{ color: "#3A4A5A", fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.2em" }}
          >
            All Projects
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-28">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.1, duration: 0.5 }}
            >
              <motion.div
                whileHover={{ y: -5, boxShadow: "0 16px 40px rgba(0,0,0,0.4)" }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="group h-full flex flex-col overflow-hidden"
                style={{
                  background: "rgba(15,22,40,0.7)",
                  border: "1px solid rgba(232,237,245,0.07)",
                }}
              >
                {/* Cover image */}
                <div className="overflow-hidden" style={{ height: "200px" }}>
                  <motion.img
                    src={project.coverImage}
                    alt={project.title}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.04 }}
                    transition={{ duration: 0.5 }}
                  />
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1 p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span
                      className="text-xs tracking-wider uppercase"
                      style={{ color: "#3A4A5A", fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.12em" }}
                    >
                      {project.type}
                    </span>
                    <span className="text-xs" style={{ color: "#2A3A4A" }}>·</span>
                    <span className="text-xs" style={{ color: "#2A3A4A" }}>{project.date}</span>
                  </div>

                  <h3
                    className="text-lg font-bold mb-1"
                    style={{ color: "#E8EDF5", fontFamily: "'Playfair Display', serif", lineHeight: 1.25 }}
                  >
                    {project.title}
                  </h3>
                  <p
                    className="text-sm italic mb-3"
                    style={{ color: "#5A7A9A", fontFamily: "'Playfair Display', serif" }}
                  >
                    {project.subtitle}
                  </p>

                  <p className="text-xs leading-relaxed mb-4 flex-1" style={{ color: "#4A6A8A" }}>
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.tags.slice(0, 4).map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-0.5"
                        style={{ color: "#3A4A5A", background: "rgba(232,237,245,0.03)", border: "1px solid rgba(232,237,245,0.06)" }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* CTA */}
                  {project.url || project.githubUrl ? (
                    <div className="flex flex-wrap gap-2 mt-auto">
                      {project.url && project.slug && (
                        <Link href={`/projects/${project.slug}`}>
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold"
                            style={{ background: "linear-gradient(135deg, #4A6A8A, #B8C8DC)", color: "#080C18" }}
                          >
                            <BookOpen size={11} />
                            View Report
                          </motion.button>
                        </Link>
                      )}
                      {project.url && (
                        <a href={project.url} target="_blank" rel="noopener noreferrer">
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="flex items-center gap-1.5 px-4 py-2 text-xs"
                            style={{ border: "1px solid rgba(232,237,245,0.1)", color: "#5A7A9A" }}
                          >
                            <ExternalLink size={11} />
                            New Tab
                          </motion.button>
                        </a>
                      )}
                      {project.githubUrl && (
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="flex items-center gap-1.5 px-4 py-2 text-xs"
                            style={{ border: "1px solid rgba(232,237,245,0.1)", color: "#5A7A9A" }}
                          >
                            <Github size={11} />
                            GitHub
                          </motion.button>
                        </a>
                      )}
                    </div>
                  ) : (
                    <div className="mt-auto">
                      <span
                        className="text-xs flex items-center gap-1.5"
                        style={{ color: "#2A3A4A", fontFamily: "'JetBrains Mono', monospace" }}
                      >
                        <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#2A3A4A", display: "inline-block" }} />
                        Report coming soon
                      </span>
                    </div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          ))}
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
