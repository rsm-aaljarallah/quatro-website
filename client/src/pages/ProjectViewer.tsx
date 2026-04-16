/*
 * DESIGN: Project Viewer — Full-screen iframe for project HTML files
 * Deep Navy & Crisp White theme header, iframe fills remaining height
 * Fonts: Playfair Display (headings) + Lato (body)
 */

import { useState } from "react";
import { Link, useParams } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink, Maximize2, Minimize2 } from "lucide-react";

const projectData: Record<string, { title: string; url: string; subtitle: string }> = {
  "ab-testing": {
    title: "A/B Testing a Call to Action",
    subtitle: "Simulating Key Ideas from Classical Frequentist Statistics",
    url: "https://d2xsxph8kpxj0f.cloudfront.net/114078457/ULQx4AJViqVMVWnbawSWeU/hw1_solution_4_d3552c46.html",
  },
};

export default function ProjectViewer() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug || "";
  const project = projectData[slug];
  const [fullscreen, setFullscreen] = useState(false);

  if (!project) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: "#0A0E1A" }}
      >
        <div className="text-center">
          <p className="text-lg mb-4" style={{ color: "#7A8FA8", fontFamily: "'Lato', sans-serif" }}>
            Project not found.
          </p>
          <Link href="/projects">
            <button
              className="text-sm px-4 py-2 rounded-sm"
              style={{
                border: "1px solid rgba(232,237,245,0.15)",
                color: "#B8C8DC",
                fontFamily: "'Lato', sans-serif",
              }}
            >
              Back to Projects
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div
      className="flex flex-col"
      style={{ height: "100vh", background: "#0A0E1A", overflow: "hidden" }}
    >
      {/* Top bar */}
      {!fullscreen && (
        <motion.nav
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex-shrink-0 flex items-center justify-between px-5 py-3 border-b"
          style={{
            background: "rgba(10,14,26,0.98)",
            borderColor: "rgba(232,237,245,0.08)",
            backdropFilter: "blur(12px)",
          }}
        >
          {/* Left: back */}
          <Link href="/projects">
            <motion.button
              whileHover={{ x: -3 }}
              className="flex items-center gap-2 text-sm"
              style={{ color: "#7A8FA8", fontFamily: "'Lato', sans-serif" }}
            >
              <ArrowLeft size={15} />
              Projects
            </motion.button>
          </Link>

          {/* Center: title */}
          <div className="hidden md:block text-center">
            <div
              className="text-sm font-bold leading-tight"
              style={{ color: "#F8FAFC", fontFamily: "'Playfair Display', serif" }}
            >
              {project.title}
            </div>
            <div
              className="text-xs italic"
              style={{ color: "#4A5A6A", fontFamily: "'Playfair Display', serif" }}
            >
              {project.subtitle}
            </div>
          </div>

          {/* Right: actions */}
          <div className="flex items-center gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={() => setFullscreen(true)}
              className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-sm"
              style={{
                color: "#7A8FA8",
                border: "1px solid rgba(232,237,245,0.1)",
                fontFamily: "'Lato', sans-serif",
              }}
            >
              <Maximize2 size={12} />
              <span className="hidden sm:inline">Fullscreen</span>
            </motion.button>
            <a href={project.url} target="_blank" rel="noopener noreferrer">
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-sm font-bold"
                style={{
                  background: "linear-gradient(135deg, #4A6A8A, #B8C8DC)",
                  color: "#0A0E1A",
                  fontFamily: "'Lato', sans-serif",
                }}
              >
                <ExternalLink size={12} />
                <span className="hidden sm:inline">Open Original</span>
              </motion.button>
            </a>
          </div>
        </motion.nav>
      )}

      {/* Fullscreen exit bar */}
      {fullscreen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex-shrink-0 flex items-center justify-between px-5 py-2 border-b"
          style={{
            background: "rgba(10,14,26,0.98)",
            borderColor: "rgba(232,237,245,0.06)",
          }}
        >
          <span className="text-xs" style={{ color: "#4A5A6A", fontFamily: "'Lato', sans-serif" }}>
            {project.title}
          </span>
          <button
            onClick={() => setFullscreen(false)}
            className="flex items-center gap-1.5 text-xs px-3 py-1"
            style={{ color: "#7A8FA8", fontFamily: "'Lato', sans-serif" }}
          >
            <Minimize2 size={12} />
            Exit Fullscreen
          </button>
        </motion.div>
      )}

      {/* iframe */}
      <div className="flex-1 relative" style={{ overflow: "hidden" }}>
        <iframe
          src={project.url}
          title={project.title}
          className="w-full h-full border-0"
          style={{ display: "block" }}
          sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
        />
      </div>
    </div>
  );
}
