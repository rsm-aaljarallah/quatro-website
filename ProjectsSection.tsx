/*
 * DESIGN: Visual Gallery Projects Section (Merna Inspired)
 * Strips away text clutter in favor of a beautiful, image-first grid
 * Projects display their title dynamically only upon hover
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
  },
  {
    id: "bayesian-mmm",
    title: "Bayesian MMM Capstone",
    type: "Capstone",
    coverImage: "https://d2xsxph8kpxj0f.cloudfront.net/114078457/ULQx4AJViqVMVWnbawSWeU/project_bayesian_mmm_dark-8h6Z9jLEykDH87WB3DNfaJ.webp",
  },
  {
    id: "neural-vault",
    title: "Neural Vault",
    type: "Personal",
    coverImage: "https://d2xsxph8kpxj0f.cloudfront.net/114078457/ULQx4AJViqVMVWnbawSWeU/project_neural_vault_dark-2mhf8LzFiG7ZVxkooSr2up.webp",
  },
  {
    id: "ab-testing",
    title: "A/B Testing a CTA",
    type: "Academic",
    coverImage: "https://d2xsxph8kpxj0f.cloudfront.net/114078457/ULQx4AJViqVMVWnbawSWeU/project_ab_testing_dark-aVeFLTSn9xgTBaEjfKywrK.webp",
  },
  {
    id: "card-krueger",
    title: "Card & Krueger Replication",
    type: "Academic",
    coverImage: "https://d2xsxph8kpxj0f.cloudfront.net/114078457/ULQx4AJViqVMVWnbawSWeU/project_card_krueger_dark-EasqFTyftE8hLKBDYy6gKm.webp",
  },
  {
    id: "poisson-mle",
    title: "Poisson MLE",
    type: "Academic",
    coverImage: "https://d2xsxph8kpxj0f.cloudfront.net/114078457/ULQx4AJViqVMVWnbawSWeU/project_poisson_mle_themed-TXwTh4uFv8vjdn64XEY6sb.webp",
  },
];

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
              whileHover={{ scale: 1.03, y: -5 }}
              className="relative group rounded-[1rem] overflow-hidden cursor-pointer"
              style={{
                aspectRatio: "4/3",
                boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
              }}
              onClick={() => {
                // Navigate to projects page or trigger a modal
                window.location.href = "/projects";
              }}
            >
              {/* Cover Image */}
              <img
                src={project.coverImage}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Hover Overlay (Frosted Glass) */}
              <div
                className="absolute inset-0 flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: "linear-gradient(to top, rgba(10,14,26,0.95) 0%, rgba(10,14,26,0.4) 50%, transparent 100%)",
                }}
              >
                <motion.div
                  initial={{ y: 10 }}
                  whileInView={{ y: 0 }}
                  className="translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
                >
                  <span className="text-[10px] font-['JetBrains_Mono'] uppercase tracking-widest text-cyan-400 mb-1 block">
                    {project.type}
                  </span>
                  <h3 className="font-['Playfair_Display'] font-bold text-white text-xl leading-tight">
                    {project.title}
                  </h3>
                </motion.div>
              </div>
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
