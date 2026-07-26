/*
 * DESIGN: Visual Gallery Projects Section (Cinematic)
 * Strips away text clutter in favor of a beautiful, image-first grid
 * Projects display their title and dynamic tags upon hover using staggered animations
 */

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink } from "lucide-react";
import { useLocation } from "wouter";
import { flushSync } from "react-dom";

export const projects = [
  {
    id: "equiledger",
    title: "EquiLedger",
    type: "Personal · Live App",
    coverImage: "/project_equiledger.png",
    tags: ["React", "TypeScript", "Turso", "PWA"],
    url: "https://equiledger.ajq8.com",
    summary: {
      problem:
        "Splitwise capped its free tier (3–5 expenses/day, ads, paywalled essentials), making it unusable for casual group trips and dinners.",
      approach:
        "Built a frictionless, account-free expense splitter: share a link, log unlimited bills with four split types, and auto-settle with a greedy debt-simplification algorithm. Money is stored as integer cents to avoid rounding errors.",
      stack: ["React", "TypeScript", "Express", "libSQL / Turso", "Vite PWA", "Vercel"],
      result:
        "An installable PWA on Vercel + Turso — no sign-up, no caps, no ads — that settles any group in at most n-1 payments.",
    },
  },
  {
    id: "macys-ai-coworker",
    title: "Macy's AI Marketing Coworker",
    type: "Team Project",
    coverImage: "https://d2xsxph8kpxj0f.cloudfront.net/114078457/ULQx4AJViqVMVWnbawSWeU/project_macys_dark-YCoRpRaiXXvckqiTxdGxXu.webp",
    tags: ["Next.js", "Python", "LLMs", "RAG"],
    summary: {
      problem: "Macy's media buyers spent 6+ hours weekly parsing scattered excel sheets to optimize $30M campaigns.",
      approach: "Built a RAG-powered LLM agent (Next.js + Python + Claude) that ingests live Campaign Manager 360 data.",
      stack: ["Next.js", "React", "Python", "FastAPI", "Anthropic API", "Vector DB"],
      result: "Reduced reporting time by 85%, enabling real-time conversational queries on campaign performance."
    }
  },
  {
    id: "bayesian-mmm-capstone",
    title: "Bayesian MMM Capstone",
    type: "Capstone",
    coverImage: "https://d2xsxph8kpxj0f.cloudfront.net/114078457/ULQx4AJViqVMVWnbawSWeU/project_bayesian_mmm_dark-8h6Z9jLEykDH87WB3DNfaJ.webp",
    tags: ["Bayesian MMM", "PyMC", "Streamlit"],
    summary: {
      problem: "Traditional MMM fails to account for prior business knowledge and outputs point estimates with no uncertainty bounds.",
      approach: "Developed a Bayesian hierarchical model using PyMC to incorporate adstock and diminishing returns.",
      stack: ["Python", "PyMC", "ArviZ", "Streamlit", "Pandas"],
      result: "Achieved 15% better out-of-sample prediction and provided actionable ROAS distributions for executives."
    }
  },
  {
    id: "neural-vault",
    title: "Neural Vault",
    type: "Personal",
    coverImage: "https://d2xsxph8kpxj0f.cloudfront.net/114078457/ULQx4AJViqVMVWnbawSWeU/project_neural_vault_dark-2mhf8LzFiG7ZVxkooSr2up.webp",
    tags: ["Claude MCP", "Obsidian", "Agent Design"],
    summary: {
      problem: "Personal knowledge graphs in Obsidian were static and required manual querying.",
      approach: "Implemented the Model Context Protocol (MCP) to allow Claude Desktop to natively read and write to the Obsidian vault.",
      stack: ["TypeScript", "Node.js", "MCP", "Obsidian", "Claude API"],
      result: "Created a 'second brain' that autonomously summarizes notes and connects disparate ideas."
    }
  },
  {
    id: "ab-testing",
    title: "A/B Testing a CTA",
    type: "Academic",
    coverImage: "https://d2xsxph8kpxj0f.cloudfront.net/114078457/ULQx4AJViqVMVWnbawSWeU/project_ab_testing_dark-aVeFLTSn9xgTBaEjfKywrK.webp",
    tags: ["A/B Testing", "Statistics", "Python"],
    url: "/projects/ab-testing.html",
    summary: {
      problem: "Understanding statistical significance in the context of e-commerce conversion rates.",
      approach: "Simulated and analyzed frequentist A/B testing frameworks focusing on Type I and Type II errors.",
      stack: ["Python", "SciPy", "Statsmodels", "Matplotlib"],
      result: "Generated a reproducible QMD report demonstrating power analysis and minimum detectable effects."
    }
  },
  {
    id: "card-krueger",
    title: "Card & Krueger Replication",
    type: "Academic",
    coverImage: "https://d2xsxph8kpxj0f.cloudfront.net/114078457/ULQx4AJViqVMVWnbawSWeU/project_card_krueger_dark-EasqFTyftE8hLKBDYy6gKm.webp",
    tags: ["Causal Inference", "DiD", "Economics"],
    url: "/projects/hw2.html",
    summary: {
      problem: "Replicating the seminal 1994 economics paper on minimum wage effects using modern data tools.",
      approach: "Applied Difference-in-Differences (DiD) methodology to analyze fast-food employment data in NJ and PA.",
      stack: ["R", "Tidyverse", "Fixest", "ggplot2"],
      result: "Successfully replicated the original findings showing no employment drop following a minimum wage hike."
    }
  },
  {
    id: "poisson-mle",
    title: "Poisson MLE",
    type: "Academic",
    coverImage: "https://d2xsxph8kpxj0f.cloudfront.net/114078457/ULQx4AJViqVMVWnbawSWeU/project_poisson_mle_themed-TXwTh4uFv8vjdn64XEY6sb.webp",
    tags: ["MLE", "Optimization", "Plotly"],
    url: "/projects/hw3-mle.html",
    summary: {
      problem: "Modeling count data (software/patent awards) which violates standard OLS assumptions.",
      approach: "Derived and implemented a Maximum Likelihood Estimator for a Poisson regression model from scratch.",
      stack: ["Python", "NumPy", "SciPy Optimize", "Plotly"],
      result: "Built an interactive visualization of the log-likelihood surface to demonstrate convergence."
    }
  },
  {
    id: "key-drivers",
    title: "Key Drivers Analysis",
    type: "Academic",
    coverImage: "/key_drivers_abstract.png",
    tags: ["Random Forest", "Python", "Feature Importance"],
    summary: {
      problem: "Identifying which brand perception variables most strongly influence overall customer satisfaction in survey data.",
      approach: "Used Random Forest feature importance and linear regression coefficients to allocate impact across highly correlated variables.",
      stack: ["Python", "scikit-learn", "Pandas", "Shapley Values"],
      result: "Isolated the top 3 high-leverage drivers, providing clear strategic recommendations for marketing interventions."
    }
  },
];

// Variants for staggered children
const overlayVariants = {
  initial: { opacity: 0 },
  hover: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.1 },
  },
};

const itemVariants = {
  initial: { opacity: 0, y: 15 },
  hover: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 20 } },
};

export default function ProjectsSection() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true });
  const [, setLocation] = useLocation();

  const handleNavigate = (e: React.MouseEvent<HTMLDivElement>, projectId: string) => {
    const img = e.currentTarget.querySelector('img');
    
    // Clear previous view transition names
    document.querySelectorAll('.project-thumbnail').forEach((el) => {
      (el as HTMLElement).style.viewTransitionName = '';
    });

    if (img) {
      img.style.viewTransitionName = 'project-hero';
    }

    if (!(document as any).startViewTransition) {
      setLocation(`/projects/${projectId}`);
      return;
    }
    
    (document as any).startViewTransition(() => {
      flushSync(() => {
        setLocation(`/projects/${projectId}`);
      });
    });
  };

  return (
    <section
      id="projects"
      className="py-24 relative"
      style={{ background: "linear-gradient(180deg, #0A0E1A 0%, #0D1525 100%)" }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center gap-4 mb-16"
        >
          <div className="flex-1 section-divider" />
          <div className="mono-label tracking-[0.2em]">05 / Projects</div>
          <div className="flex-1 section-divider" />
        </motion.div>

        {/* 3-Column Visual Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {projects.map((project, index) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover="hover"
              className="relative group rounded-[1rem] overflow-hidden cursor-pointer border border-[rgba(232,237,245,0.08)]"
              style={{
                aspectRatio: "4/3",
                boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
              }}
              onClick={(e) => handleNavigate(e as any, project.id)}
            >
              {/* Cover Image */}
              <motion.img
                src={project.coverImage}
                alt={project.title}
                className="project-thumbnail w-full h-full object-cover"
                variants={{
                  initial: { scale: 1 },
                  hover: { scale: 1.05, transition: { duration: 0.7, ease: "easeOut" } },
                }}
              />

              {/* Hover Overlay (Frosted Glass) */}
              <motion.div
                variants={overlayVariants}
                className="absolute inset-0 flex flex-col justify-end p-6"
                style={{
                  background: "linear-gradient(to top, rgba(10,14,26,0.95) 0%, rgba(10,14,26,0.5) 50%, transparent 100%)",
                }}
              >
                <motion.span variants={itemVariants} className="text-[10px] font-['JetBrains_Mono'] uppercase tracking-widest text-cyan-400 mb-2 block">
                  {project.type}
                </motion.span>
                
                <motion.h3 variants={itemVariants} className="font-['Playfair_Display'] font-bold text-white text-xl leading-tight mb-4">
                  {project.title}
                </motion.h3>

                {/* Dynamic Tags */}
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <motion.span
                      key={tag}
                      variants={itemVariants}
                      className="px-2.5 py-1 text-[10px] font-['JetBrains_Mono'] text-[#B8C8DC] bg-[rgba(232,237,245,0.06)] border border-[rgba(232,237,245,0.15)] rounded-sm backdrop-blur-md"
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            </motion.article>
          ))}
        </div>

        {/* View All CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <a
            href="/projects"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full font-['Playfair_Display'] font-bold text-sm text-[#0A0E1A] bg-white transition-all duration-300 hover:scale-105 shadow-[0_0_20px_rgba(255,255,255,0.15)]"
          >
            <ExternalLink size={14} />
            View Full Portfolio
          </a>
        </motion.div>
      </div>
    </section>
  );
}
