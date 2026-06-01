/*
 * DESIGN: Cinematic Glass Hero Section with Interactive Node Graph
 * Central frosted glass card over an interactive WebGL-like canvas
 * Minimalist, high-impact typography inspired by merna.org
 */

import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown, ArrowRight } from "lucide-react";
import { useEffect, useRef } from "react";

// Interactive Data Network (Canvas)
function NodeGraphCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const nodes: { x: number, y: number, vx: number, vy: number, radius: number }[] = [];
    const numNodes = Math.floor((width * height) / 15000); // Responsive node count
    const maxDistance = 150;
    
    let mouse = { x: -1000, y: -1000 };

    for (let i = 0; i < numNodes; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 1.5 + 0.5
      });
    }

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    let animationFrameId: number;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      
      // Update and draw nodes
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        
        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;

        // Interaction with mouse (repel/attract)
        const dx = mouse.x - node.x;
        const dy = mouse.y - node.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < 200) {
          // Attract slowly
          node.x += dx * 0.01;
          node.y += dy * 0.01;
        }

        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(184, 200, 220, 0.5)";
        ctx.fill();

        // Connect nodes
        for (let j = i + 1; j < nodes.length; j++) {
          const other = nodes[j];
          const dx2 = other.x - node.x;
          const dy2 = other.y - node.y;
          const dist2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);

          if (dist2 < maxDistance) {
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(other.x, other.y);
            const alpha = 1 - dist2 / maxDistance;
            ctx.strokeStyle = `rgba(184, 200, 220, ${alpha * 0.15})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      
      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-60 mix-blend-screen" />;
}

// Cinematic fluid background 
function CinematicBackground() {
  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 1000], [0, 300]);

  return (
    <motion.div 
      className="absolute inset-0 overflow-hidden pointer-events-none" 
      style={{ background: "#050810", y: bgY }}
    >
      <NodeGraphCanvas />
      
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
      
      {/* Grid overlay */}
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
    </motion.div>
  );
}

export default function HeroSection() {
  const { scrollY } = useScroll();
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

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="font-['Playfair_Display'] font-extrabold text-5xl md:text-7xl lg:text-8xl text-white leading-tight mb-4"
            style={{ textShadow: "0 10px 30px rgba(0,0,0,0.5)" }}
          >
            Abdullah Aljarallah
          </motion.h1>

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
