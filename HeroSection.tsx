/*
 * DESIGN: Cinematic Glass Hero Section
 * Central frosted glass card over a fluid, slow-moving cinematic background
 * Minimalist, high-impact typography inspired by merna.org
 */

import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown, ArrowRight } from "lucide-react";

// Cinematic fluid background using CSS animations on blurred orbs
function CinematicBackground() {
  const { scrollY } = useScroll();
  // Deep parallax: the background moves down 300px as user scrolls 1000px
  const bgY = useTransform(scrollY, [0, 1000], [0, 300]);

  return (
    <motion.div 
      className="absolute inset-0 overflow-hidden pointer-events-none" 
      style={{ background: "#050810", y: bgY }}
    >
      {/* Orb 1 - Deep Blue */}
      <motion.div
        className="absolute w-[80vw] h-[80vw] rounded-full mix-blend-screen filter blur-[100px] opacity-30"
        style={{ background: "radial-gradient(circle, #0F2027 0%, transparent 70%)" }}
        animate={{
          x: ["-20%", "20%", "-20%"],
          y: ["-20%", "20%", "-20%"],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      />
      {/* Orb 2 - Cyan/Teal */}
      <motion.div
        className="absolute right-0 w-[60vw] h-[60vw] rounded-full mix-blend-screen filter blur-[120px] opacity-20"
        style={{ background: "radial-gradient(circle, #203A43 0%, transparent 70%)" }}
        animate={{
          x: ["20%", "-20%", "20%"],
          y: ["20%", "-20%", "20%"],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />
      {/* Orb 3 - Soft Blue highlight */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] rounded-full mix-blend-screen filter blur-[150px] opacity-10"
        style={{ background: "radial-gradient(circle, #2C5364 0%, transparent 70%)" }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Noise overlay to give it a film grain cinematic feel */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </motion.div>
  );
}

export default function HeroSection() {
  const { scrollY } = useScroll();
  // Card moves UP slightly faster than the background when scrolling down
  const cardY = useTransform(scrollY, [0, 800], [0, -150]);
  const cardOpacity = useTransform(scrollY, [0, 600], [1, 0]);

  const handleScrollDown = () => {
    const el = document.getElementById("projects");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <CinematicBackground />

      {/* Grid overlay (static over the moving background) */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(184,200,220,1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(184,200,220,1) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Central Glass Card with Parallax */}
      <motion.div 
        className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 py-24 flex justify-center"
        style={{ y: cardY, opacity: cardOpacity }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-center text-center p-10 md:p-16 rounded-[2rem] w-full"
          style={{
            background: "rgba(10, 14, 26, 0.45)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            border: "1px solid rgba(232, 237, 245, 0.08)",
            boxShadow: "0 30px 60px -15px rgba(0, 0, 0, 0.6), inset 0 0 0 1px rgba(255,255,255,0.03)",
          }}
        >
          {/* Status badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="flex items-center gap-2 px-4 py-1.5 rounded-full mb-8"
            style={{ background: "rgba(232, 237, 245, 0.05)", border: "1px solid rgba(232, 237, 245, 0.1)" }}
          >
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
            <span className="text-xs font-['JetBrains_Mono'] tracking-wide text-[#B8C8DC] uppercase">Available for work</span>
          </motion.div>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="font-['Playfair_Display'] font-extrabold text-5xl md:text-7xl lg:text-8xl text-white leading-tight mb-4"
            style={{ textShadow: "0 10px 30px rgba(0,0,0,0.5)" }}
          >
            Abdullah Aljarallah
          </motion.h1>

          {/* Punchy Tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="font-['Playfair_Display'] text-xl md:text-3xl italic text-[#B8C8DC] mb-10"
          >
            I uncover value with data.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-sm font-['Lato'] text-[#7A8FA8] uppercase tracking-[0.2em] mb-12"
          >
            MSBA Candidate @ UC San Diego
          </motion.div>

          {/* Button Row */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <button
              onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
              className="flex items-center gap-2 px-8 py-3.5 rounded-full bg-white text-[#0A0E1A] font-bold text-sm hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.15)]"
            >
              See my work
              <ArrowRight size={16} />
            </button>
            <button
              onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
              className="px-8 py-3.5 rounded-full border border-[rgba(232,237,245,0.2)] text-[#B8C8DC] font-bold text-sm hover:bg-[rgba(232,237,245,0.05)] hover:border-[rgba(232,237,245,0.4)] transition-all duration-300"
            >
              About me
            </button>
            <a
              href="/Abdullah_Aljarallah_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3.5 rounded-full border border-[rgba(232,237,245,0.2)] text-[#B8C8DC] font-bold text-sm hover:bg-[rgba(232,237,245,0.05)] hover:border-[rgba(232,237,245,0.4)] transition-all duration-300"
            >
              Resume
            </a>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator (fades out on scroll) */}
      <motion.button
        onClick={handleScrollDown}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        style={{ opacity: cardOpacity }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#4A5A6A] hover:text-[#B8C8DC] transition-colors"
      >
        <span className="text-[10px] font-['JetBrains_Mono'] tracking-[0.3em] uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={20} strokeWidth={1.5} />
        </motion.div>
      </motion.button>
    </section>
  );
}
