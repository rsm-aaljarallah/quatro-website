/*
 * DESIGN: Cinematic Glass Hero Section
 * Central frosted glass card over dynamic particle background
 * Minimalist, high-impact typography inspired by merna.org
 */

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, ArrowRight } from "lucide-react";

const HERO_BG = "https://d2xsxph8kpxj0f.cloudfront.net/114078457/ULQx4AJViqVMVWnbawSWeU/hero_bg-QFyRfnQn3Ak7Ux6DgUzGdx.webp";

// Particle canvas background
function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const particles: Array<{
      x: number; y: number; vx: number; vy: number;
      size: number; alpha: number; color: string;
    }> = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 2 + 0.5,
        alpha: Math.random() * 0.6 + 0.1,
        color: Math.random() > 0.5 ? "#B8C8DC" : "#7A8FA8",
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(184, 200, 220, ${0.08 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color + Math.round(p.alpha * 255).toString(16).padStart(2, "0");
        ctx.fill();
      });

      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.6 }}
    />
  );
}

export default function HeroSection() {
  const handleScrollDown = () => {
    const el = document.getElementById("projects");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: "linear-gradient(135deg, #0A0E1A 0%, #111827 50%, #0A0E1A 100%)" }}
    >
      {/* Hero background image */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url(${HERO_BG})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      <ParticleCanvas />

      {/* Radial glow for the center */}
      <div className="absolute inset-0 pointer-events-none flex justify-center items-center">
        <div
          className="w-[800px] h-[800px] rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, #4A7A9A 0%, transparent 60%)" }}
        />
      </div>

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(184,200,220,1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(184,200,220,1) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Central Glass Card */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 py-24 flex justify-center">
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-center text-center p-10 md:p-16 rounded-[2rem]"
          style={{
            background: "rgba(15, 22, 40, 0.4)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(232, 237, 245, 0.1)",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5), inset 0 0 0 1px rgba(255,255,255,0.02)",
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
      </div>

      {/* Scroll indicator */}
      <motion.button
        onClick={handleScrollDown}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
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
