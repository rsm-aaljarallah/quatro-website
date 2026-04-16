/*
 * DESIGN: Project Viewer — Full-screen iframe with site Navbar
 * Deep Navy & Crisp White theme — Playfair Display + Lato
 * Site navbar stays at top so visitors remain in context
 */

import { useState } from "react";
import { Link, useParams } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink, Maximize2, Minimize2, Download } from "lucide-react";
import Navbar from "@/components/Navbar";

const projectData: Record<string, { title: string; url: string; subtitle: string; downloadUrl?: string }> = {
  "ab-testing": {
    title: "A/B Testing a Call to Action",
    subtitle: "Simulating Key Ideas from Classical Frequentist Statistics",
    url: "/projects/ab-testing.html",
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
      {/* Site Navbar — always visible unless fullscreen */}
      {!fullscreen && <Navbar />}

      {/* Project sub-bar — sits below the site navbar */}
      {!fullscreen && (
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex-shrink-0 flex items-center justify-between px-5 py-2.5 border-b"
          style={{
            marginTop: "64px", /* height of the site navbar */
            background: "rgba(17,24,39,0.95)",
            borderColor: "rgba(232,237,245,0.08)",
            backdropFilter: "blur(12px)",
          }}
        >
          {/* Left: back to projects */}
          <Link href="/projects">
            <motion.button
              whileHover={{ x: -3 }}
              className="flex items-center gap-2 text-sm"
              style={{ color: "#7A8FA8", fontFamily: "'Lato', sans-serif" }}
            >
              <ArrowLeft size={14} />
              <span>All Projects</span>
            </motion.button>
          </Link>

          {/* Center: project title */}
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
                <span className="hidden sm:inline">Open in Tab</span>
              </motion.button>
            </a>
          </div>
        </motion.div>
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

      {/* iframe — fills remaining height */}
      <div
        className="flex-1 relative"
        style={{
          overflow: "hidden",
          /* When not fullscreen, navbar (64px) + sub-bar (~48px) = 112px total offset */
          marginTop: fullscreen ? 0 : undefined,
        }}
      >
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
