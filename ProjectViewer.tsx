/*
 * DESIGN: Enhanced Project Viewer
 * Features:
 * - View Transitions: Image smoothly expands from grid
 * - Full-Bleed Glass Header
 * - Agentic Sidebar (JSON-style technical summary)
 * - Scrollytelling progress bar
 */

import { useState, useEffect } from "react";
import { Link, useParams } from "wouter";
import { motion, useScroll, useSpring } from "framer-motion";
import { ArrowLeft, ExternalLink, Maximize2, Minimize2, Terminal, ChevronRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import { projects } from "./ProjectsSection";

export default function ProjectViewer() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug || "";
  const project = projects.find(p => p.id === slug);
  const [fullscreen, setFullscreen] = useState(false);
  
  // Reading progress bar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0A0E1A]">
        <div className="text-center">
          <p className="text-[#7A8FA8] mb-4">Project not found.</p>
          <Link href="/projects">
            <button className="text-sm px-4 py-2 border border-[#B8C8DC] text-[#B8C8DC] rounded-sm">
              Back to Projects
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#050810]">
      {/* Scrollytelling Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-cyan-400 origin-left z-50"
        style={{ scaleX }}
      />

      {!fullscreen && <Navbar />}

      {/* Full-Bleed Glass Header */}
      <div className="relative w-full h-[50vh] md:h-[60vh] mt-16" style={{ viewTransitionName: "project-hero" }}>
        {/* Cover Image */}
        <img 
          src={project.coverImage} 
          alt={project.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050810] via-[rgba(5,8,16,0.5)] to-transparent" />
        
        <div className="absolute inset-0 flex flex-col justify-end max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <Link href="/projects">
            <button className="flex items-center gap-2 text-sm text-[#B8C8DC] hover:text-white mb-6 w-fit transition-colors">
              <ArrowLeft size={16} />
              Back to Projects
            </button>
          </Link>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="text-cyan-400 font-['JetBrains_Mono'] text-sm tracking-widest uppercase mb-3 block">
                {project.type}
              </span>
              <h1 className="font-['Playfair_Display'] font-extrabold text-4xl md:text-6xl text-white leading-tight">
                {project.title}
              </h1>
            </div>
            
            {project.url && (
              <a href={project.url} target="_blank" rel="noopener noreferrer">
                <button className="flex items-center gap-2 px-8 py-3.5 rounded-full bg-white text-[#0A0E1A] font-bold text-sm hover:scale-105 transition-transform shadow-[0_0_20px_rgba(255,255,255,0.15)]">
                  <ExternalLink size={16} />
                  Live Preview
                </button>
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Document Viewer (Iframe / Content) */}
        <div className="lg:col-span-8 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-['Playfair_Display'] font-bold text-xl text-white">Project Document</h3>
            <button
              onClick={() => setFullscreen(!fullscreen)}
              className="flex items-center gap-2 text-sm text-[#7A8FA8] hover:text-[#B8C8DC]"
            >
              {fullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
              {fullscreen ? "Exit Fullscreen" : "Fullscreen"}
            </button>
          </div>
          
          <div className={`relative rounded-xl overflow-hidden border border-[rgba(232,237,245,0.1)] bg-[rgba(10,14,26,0.5)] ${fullscreen ? "fixed inset-4 z-[100] mt-0" : "h-[800px]"}`}>
            {fullscreen && (
               <button
                 onClick={() => setFullscreen(false)}
                 className="absolute top-4 right-4 z-10 flex items-center gap-2 px-4 py-2 rounded-full bg-black/50 text-white border border-white/20 backdrop-blur-md hover:bg-black/80"
               >
                 <Minimize2 size={16} /> Exit
               </button>
            )}
            {project.url ? (
              <iframe
                src={project.url}
                title={project.title}
                className="w-full h-full border-0 rounded-xl"
                style={{ background: "white" }}
              />
            ) : (
              <div className="flex items-center justify-center h-full text-[#7A8FA8]">
                Detailed view not available for this project.
              </div>
            )}
          </div>
        </div>

        {/* Right Sidebar: Agentic Summary */}
        <div className="lg:col-span-4">
          <div className="sticky top-24 rounded-xl overflow-hidden"
            style={{
              background: "rgba(10, 14, 26, 0.6)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(232, 237, 245, 0.1)",
              boxShadow: "0 20px 40px rgba(0,0,0,0.4)"
            }}
          >
            <div className="flex items-center gap-2 px-4 py-3 border-b border-[rgba(232,237,245,0.1)] bg-[rgba(0,0,0,0.2)]">
              <Terminal size={14} className="text-[#B8C8DC]" />
              <span className="font-['JetBrains_Mono'] text-xs text-[#7A8FA8] tracking-widest uppercase">Agentic Summary</span>
            </div>
            
            <div className="p-6 font-['JetBrains_Mono'] text-sm space-y-6">
              
              <div>
                <div className="text-[#4A5A6A] text-xs uppercase mb-2 flex items-center gap-1">
                  <ChevronRight size={12} className="text-cyan-400" /> The Problem
                </div>
                <p className="text-[#B8C8DC] leading-relaxed">
                  {project.summary?.problem || "Not specified."}
                </p>
              </div>

              <div>
                <div className="text-[#4A5A6A] text-xs uppercase mb-2 flex items-center gap-1">
                  <ChevronRight size={12} className="text-cyan-400" /> Approach
                </div>
                <p className="text-[#B8C8DC] leading-relaxed">
                  {project.summary?.approach || "Not specified."}
                </p>
              </div>

              <div>
                <div className="text-[#4A5A6A] text-xs uppercase mb-2 flex items-center gap-1">
                  <ChevronRight size={12} className="text-cyan-400" /> Tech Stack
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.summary?.stack.map(tech => (
                    <span key={tech} className="px-2 py-1 text-xs bg-[rgba(34,211,238,0.1)] text-cyan-400 border border-cyan-400/20 rounded-sm">
                      {tech}
                    </span>
                  )) || "Not specified."}
                </div>
              </div>

              <div>
                <div className="text-[#4A5A6A] text-xs uppercase mb-2 flex items-center gap-1">
                  <ChevronRight size={12} className="text-cyan-400" /> Result
                </div>
                <p className="text-white font-medium leading-relaxed">
                  {project.summary?.result || "Not specified."}
                </p>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
