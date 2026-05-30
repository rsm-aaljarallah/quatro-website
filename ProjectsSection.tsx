/*
 * DESIGN: Visual Gallery Projects Section (Cinematic)
 * Strips away text clutter in favor of a beautiful, image-first grid
 * Projects display their title and dynamic tags upon hover using staggered animations
 */

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink } from "lucide-react";

const projects = [
  {
    id: "macys",
    title: "Macy's AI Marketing Coworker",
    type: "Team Project",
    coverImage: "https://d2xsxph8kpxj0f.cloudfront.net/114078457/ULQx4AJViqVMVWnbawSWeU/project_macys_dark-YCoRpRaiXXvckqiTxdGxXu.webp",
    tags: ["Next.js", "Python", "LLMs", "RAG"],
  },
  {
    id: "bayesian-mmm",
    title: "Bayesian MMM Capstone",
    type: "Capstone",
    coverImage: "https://d2xsxph8kpxj0f.cloudfront.net/114078457/ULQx4AJViqVMVWnbawSWeU/project_bayesian_mmm_dark-8h6Z9jLEykDH87WB3DNfaJ.webp",
    tags: ["Bayesian MMM", "PyMC", "Streamlit"],
  },
  {
    id: "neural-vault",
    title: "Neural Vault",
    type: "Personal",
    coverImage: "https://d2xsxph8kpxj0f.cloudfront.net/114078457/ULQx4AJViqVMVWnbawSWeU/project_neural_vault_dark-2mhf8LzFiG7ZVxkooSr2up.webp",
    tags: ["Claude MCP", "Obsidian", "Agent Design"],
  },
  {
    id: "ab-testing",
    title: "A/B Testing a CTA",
    type: "Academic",
    coverImage: "https://d2xsxph8kpxj0f.cloudfront.net/114078457/ULQx4AJViqVMVWnbawSWeU/project_ab_testing_dark-aVeFLTSn9xgTBaEjfKywrK.webp",
    tags: ["A/B Testing", "Statistics", "Python"],
  },
  {
    id: "card-krueger",
    title: "Card & Krueger Replication",
    type: "Academic",
    coverImage: "https://d2xsxph8kpxj0f.cloudfront.net/114078457/ULQx4AJViqVMVWnbawSWeU/project_card_krueger_dark-EasqFTyftE8hLKBDYy6gKm.webp",
    tags: ["Causal Inference", "DiD", "Economics"],
  },
  {
    id: "poisson-mle",
    title: "Poisson MLE",
    type: "Academic",
    coverImage: "https://d2xsxph8kpxj0f.cloudfront.net/114078457/ULQx4AJViqVMVWnbawSWeU/project_poisson_mle_themed-TXwTh4uFv8vjdn64XEY6sb.webp",
    tags: ["MLE", "Optimization", "Plotly"],
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
  hover: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 20 } },
};

export default function ProjectsSection() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true });

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
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover="hover"
              initial="initial"
              className="relative group rounded-[1rem] overflow-hidden cursor-pointer"
              style={{
                aspectRatio: "4/3",
                boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
              }}
              onClick={() => {
                window.location.href = "/projects";
              }}
            >
              {/* Cover Image */}
              <motion.img
                src={project.coverImage}
                alt={project.title}
                className="w-full h-full object-cover"
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
            </motion.div>
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
