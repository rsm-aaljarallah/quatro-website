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
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import { ArrowLeft, ExternalLink, Maximize2, Minimize2, Terminal, ChevronRight, Github } from "lucide-react";
import Navbar from "@/components/Navbar";
import { projects as galleryProjects } from "../components/ProjectsSection";
import { projects as fullProjects, featuredProject } from "./Projects";

export default function ProjectViewer() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug || "";
  
  // Find base project info from the comprehensive Projects page list
  let baseInfo = fullProjects.find(p => p.slug === slug);
  if (slug === featuredProject.slug) {
    baseInfo = featuredProject;
  }
  
  const [fullscreen, setFullscreen] = useState(!!baseInfo?.url);
  
  // Reading progress bar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Lock body scroll when fullscreen
  useEffect(() => {
    if (fullscreen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [fullscreen]);

  if (!baseInfo) {
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

  // Merge with gallery info if it exists to get the rich Agentic Summary
  const galleryInfo = galleryProjects.find(p => p.id === slug || p.id === baseInfo?.id);
  const project = {
    ...baseInfo,
    summary: galleryInfo?.summary || {
      problem: baseInfo.description,
      approach: baseInfo.subtitle,
      stack: baseInfo.tags,
      result: "See full embedded report."
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#050810]">
      {/* Fullscreen Backdrop */}
      <AnimatePresence>
        {fullscreen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setFullscreen(false)}
            className="fixed inset-0 z-[90] bg-[#050810]/80 backdrop-blur-xl"
          />
        )}
      </AnimatePresence>
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
            
            <div className="flex flex-wrap items-center gap-3">
              {project.url && (
                <a href={project.url} target="_blank" rel="noopener noreferrer">
                  <button className="flex items-center gap-2 px-8 py-3.5 rounded-full bg-white text-[#0A0E1A] font-bold text-sm hover:scale-105 transition-transform shadow-[0_0_20px_rgba(255,255,255,0.15)]">
                    <ExternalLink size={16} />
                    Open in New Tab
                  </button>
                </a>
              )}
              {project.githubUrl && (
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                  <button className="flex items-center gap-2 px-8 py-3.5 rounded-full border border-[rgba(232,237,245,0.2)] text-[#B8C8DC] font-bold text-sm hover:bg-[rgba(232,237,245,0.05)] transition-colors">
                    <Github size={16} />
                    GitHub Repo
                  </button>
                </a>
              )}
            </div>
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
          
          <motion.div 
            layout
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className={`relative rounded-xl overflow-hidden border border-[rgba(232,237,245,0.1)] bg-[rgba(10,14,26,0.5)] ${
              fullscreen 
                ? "fixed inset-4 md:inset-8 lg:inset-12 z-[100] mt-0 shadow-[0_0_100px_rgba(0,0,0,0.8)]" 
                : "h-[800px]"
            }`}
          >
            {fullscreen && (
               <motion.button
                 initial={{ opacity: 0, scale: 0.8 }}
                 animate={{ opacity: 1, scale: 1 }}
                 exit={{ opacity: 0, scale: 0.8 }}
                 onClick={() => setFullscreen(false)}
                 className="absolute top-4 right-4 z-[110] flex items-center gap-2 px-4 py-2 rounded-full bg-black/60 text-white border border-white/20 backdrop-blur-md hover:bg-black/90 transition-colors shadow-lg"
               >
                 <Minimize2 size={16} /> Exit
               </motion.button>
            )}
            {project.url ? (
              <iframe
                src={project.url}
                title={project.title}
                className="w-full h-full border-0 rounded-xl"
                style={{ background: "white" }}
              />
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center p-8">
                <Terminal size={48} className="text-[#3A4A5A] mb-4" />
                <h3 className="font-['Playfair_Display'] text-2xl text-white mb-2">Web View Not Available</h3>
                <p className="text-[#7A8FA8] max-w-md">
                  This project does not have a web-accessible report or demo. 
                  Please review the Agentic Summary or visit the GitHub repository for technical details.
                </p>
                {project.githubUrl && (
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="mt-6">
                    <button className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#1A2333] border border-[#2A3A4A] text-[#B8C8DC] font-bold text-sm hover:bg-[#2A3A4A] transition-colors">
                      <Github size={16} />
                      View Source Code
                    </button>
                  </a>
                )}
              </div>
            )}
          </motion.div>
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
