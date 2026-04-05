/*
 * DESIGN: Cyber-Dark Hero Section
 * Full-screen hero with tech background, profile photo, animated text
 * Floating particles, glowing profile ring, typed role text
 * LinkedIn + GitHub social links from Quarto site
 */

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Mail, Phone, ChevronDown, Github, Linkedin } from "lucide-react";

const PROFILE_PIC = "https://d2xsxph8kpxj0f.cloudfront.net/114078457/ULQx4AJViqVMVWnbawSWeU/profile_pic_bf3dcadd.webp";
const HERO_BG = "https://d2xsxph8kpxj0f.cloudfront.net/114078457/ULQx4AJViqVMVWnbawSWeU/hero_bg-QFyRfnQn3Ak7Ux6DgUzGdx.webp";

const roles = [
  "Business Analytics Professional",
  "Data-Driven Strategist",
  "Marketing Analytics Expert",
  "Digital Transformation Leader",
];

function useTypingEffect(texts: string[], speed = 60, pause = 2000) {
  const [displayed, setDisplayed] = useState("");
  const [roleIdx, setRoleIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = texts[roleIdx];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && charIdx < current.length) {
      timeout = setTimeout(() => setCharIdx(c => c + 1), speed);
    } else if (!deleting && charIdx === current.length) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && charIdx > 0) {
      timeout = setTimeout(() => setCharIdx(c => c - 1), speed / 2);
    } else if (deleting && charIdx === 0) {
      setDeleting(false);
      setRoleIdx(r => (r + 1) % texts.length);
    }

    setDisplayed(current.slice(0, charIdx));
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, roleIdx, texts, speed, pause]);

  return displayed;
}

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
        color: Math.random() > 0.5 ? "#00D4FF" : "#0066FF",
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
            ctx.strokeStyle = `rgba(0, 212, 255, ${0.08 * (1 - dist / 120)})`;
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
  const typedRole = useTypingEffect(roles);

  const handleScrollDown = () => {
    const el = document.getElementById("about");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: "linear-gradient(135deg, #050A18 0%, #0A1628 50%, #050A18 100%)" }}
    >
      {/* Hero background image */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `url(${HERO_BG})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      <ParticleCanvas />

      {/* Radial glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #00D4FF 0%, transparent 70%)" }}
        />
      </div>

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,212,255,1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,212,255,1) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-24">
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12 lg:gap-20">

          {/* Profile Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex-shrink-0 relative"
          >
            <div className="absolute -inset-4 rounded-full opacity-30 animate-pulse-glow"
              style={{ background: "radial-gradient(circle, rgba(0,212,255,0.4) 0%, transparent 70%)" }}
            />
            <div className="absolute -inset-1 rounded-full"
              style={{
                background: "conic-gradient(from 0deg, #00D4FF, #0066FF, transparent, #00D4FF)",
                animation: "spin 4s linear infinite",
              }}
            />
            <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
            <div className="relative w-48 h-48 lg:w-56 lg:h-56 rounded-full overflow-hidden border-2 border-[rgba(0,212,255,0.3)]">
              <img
                src={PROFILE_PIC}
                alt="Abdullah Aljarallah"
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[rgba(0,102,255,0.1)]" />
            </div>
            {/* Status badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="absolute -bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0A1628] border border-[rgba(0,212,255,0.3)] whitespace-nowrap"
            >
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-xs font-['JetBrains_Mono'] text-[#00D4FF]">Open to Work</span>
            </motion.div>
          </motion.div>

          {/* Text Content */}
          <div className="flex-1 text-center lg:text-left">
            {/* Mono label */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="mono-label mb-4 inline-flex items-center gap-2"
            >
              <span className="w-8 h-px bg-[#00D4FF]" />
              MSBA Candidate @ UC San Diego
              <span className="w-8 h-px bg-[#00D4FF]" />
            </motion.div>

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7 }}
              className="font-['Syne'] font-extrabold text-5xl lg:text-7xl text-white leading-none mb-4"
            >
              Abdullah
              <br />
              <span className="text-gradient-cyan">Aljarallah</span>
            </motion.h1>

            {/* Typed role */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="h-8 mb-6"
            >
              <span className="font-['DM_Sans'] text-xl text-[#8BA8CC]">
                {typedRole}
                <span className="animate-blink text-[#00D4FF]">|</span>
              </span>
            </motion.div>

            {/* Brief bio */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="font-['DM_Sans'] text-[#8BA8CC] text-base lg:text-lg max-w-2xl leading-relaxed mb-8"
            >
              Bridging the gap between data science and business strategy.
              Currently pursuing MSBA at UC San Diego's Rady School of Management,
              with a track record of managing $30M+ marketing portfolios and driving digital transformation.
            </motion.p>

            {/* Contact pills */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex flex-wrap justify-center lg:justify-start gap-3 mb-6"
            >
              {[
                { icon: MapPin, text: "San Diego, CA" },
                { icon: Mail, text: "mr.a.aljarallah@gmail.com", href: "mailto:mr.a.aljarallah@gmail.com" },
                { icon: Phone, text: "+1 619-314-1187", href: "tel:+16193141187" },
              ].map(({ icon: Icon, text, href }) => (
                <a
                  key={text}
                  href={href || "#"}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-sm bg-[rgba(0,212,255,0.05)] border border-[rgba(0,212,255,0.15)] text-[#8BA8CC] text-sm font-['DM_Sans'] hover:border-[rgba(0,212,255,0.4)] hover:text-[#00D4FF] transition-all duration-200"
                >
                  <Icon size={13} className="text-[#00D4FF]" />
                  {text}
                </a>
              ))}
            </motion.div>

            {/* Social links */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.75 }}
              className="flex justify-center lg:justify-start gap-3 mb-8"
            >
              <a
                href="https://www.linkedin.com/in/abdullah-aljarallah-a72512b7/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-1.5 rounded-sm bg-[rgba(10,102,194,0.1)] border border-[rgba(10,102,194,0.3)] text-[#8BA8CC] text-sm font-['DM_Sans'] hover:border-[rgba(10,102,194,0.6)] hover:text-[#0A66C2] transition-all duration-200"
              >
                <Linkedin size={13} className="text-[#0A66C2]" />
                LinkedIn
              </a>
              <a
                href="https://github.com/rsm-aaljarallah"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-1.5 rounded-sm bg-[rgba(139,168,204,0.08)] border border-[rgba(139,168,204,0.2)] text-[#8BA8CC] text-sm font-['DM_Sans'] hover:border-[rgba(139,168,204,0.5)] hover:text-white transition-all duration-200"
              >
                <Github size={13} className="text-[#8BA8CC]" />
                GitHub
              </a>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-wrap justify-center lg:justify-start gap-4"
            >
              <button
                onClick={() => document.getElementById("experience")?.scrollIntoView({ behavior: "smooth" })}
                className="px-6 py-3 rounded-sm bg-gradient-to-r from-[#0066FF] to-[#00D4FF] text-[#050A18] font-['Syne'] font-bold text-sm hover:shadow-[0_0_30px_rgba(0,212,255,0.5)] hover:scale-105 transition-all duration-200"
              >
                View My Work
              </button>
              <a
                href="mailto:mr.a.aljarallah@gmail.com"
                className="px-6 py-3 rounded-sm border border-[rgba(0,212,255,0.3)] text-[#00D4FF] font-['Syne'] font-bold text-sm hover:bg-[rgba(0,212,255,0.08)] hover:border-[rgba(0,212,255,0.6)] transition-all duration-200"
              >
                Get In Touch
              </a>
            </motion.div>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.0 }}
              className="mt-12 flex flex-wrap justify-center lg:justify-start gap-8"
            >
              {[
                { value: "$30M+", label: "Portfolio Managed" },
                { value: "10+", label: "Years Experience" },
                { value: "3", label: "Industries" },
                { value: "2", label: "Languages" },
              ].map(({ value, label }) => (
                <div key={label} className="text-center lg:text-left">
                  <div className="font-['Syne'] font-extrabold text-2xl text-gradient-cyan">{value}</div>
                  <div className="font-['DM_Sans'] text-xs text-[#5A7A9A] uppercase tracking-wider mt-0.5">{label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        onClick={handleScrollDown}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-[#5A7A9A] hover:text-[#00D4FF] transition-colors"
      >
        <span className="text-xs font-['JetBrains_Mono'] tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={18} />
        </motion.div>
      </motion.button>
    </section>
  );
}
