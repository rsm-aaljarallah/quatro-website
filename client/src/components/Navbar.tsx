/*
 * DESIGN: Cyber-Dark Navbar
 * Sticky top nav with glassmorphism blur, electric cyan accent
 * Mobile hamburger menu with slide-down panel
 */

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Mail, FolderOpen } from "lucide-react";
import { Link, useLocation } from "wouter";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Education", href: "#education" },
  { label: "Skills", href: "#skills" },
  { label: "Ventures", href: "#ventures" },
  { label: "Certifications", href: "#certifications" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("about");
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = navLinks.map((l) => l.href.replace("#", ""));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0A0E1A]/90 backdrop-blur-xl border-b border-[rgba(184,200,220,0.15)] shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo / Name */}
          <motion.div className="flex items-center gap-3" whileHover={{ scale: 1.02 }}>
            <div className="w-8 h-8 rounded-sm bg-gradient-to-br from-[#B8C8DC] to-[#7A8FA8] flex items-center justify-center text-[#0A0E1A] font-bold text-sm font-mono">
              AA
            </div>
            <span className="font-['Playfair_Display'] font-bold text-white text-sm tracking-wide hidden sm:block">
              Abdullah Aljarallah
            </span>
          </motion.div>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-0.5">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className={`relative px-3 py-1.5 text-sm font-['Lato'] font-medium transition-all duration-200 rounded-sm ${
                  activeSection === link.href.replace("#", "") && location === "/"
                    ? "text-[#B8C8DC]"
                    : "text-[#7A8FA8] hover:text-white"
                }`}
              >
                {activeSection === link.href.replace("#", "") && location === "/" && (
                  <motion.span
                    layoutId="nav-indicator"
                    className="absolute inset-0 bg-[rgba(184,200,220,0.08)] rounded-sm border border-[rgba(184,200,220,0.2)]"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                  />
                )}
                <span className="relative z-10">{link.label}</span>
              </button>
            ))}
            {/* Projects page link */}
            <Link href="/projects">
              <button
                className={`relative flex items-center gap-1.5 px-3 py-1.5 text-sm font-['Lato'] font-medium transition-all duration-200 rounded-sm ${
                  location.startsWith("/projects")
                    ? "text-[#B8C8DC]"
                    : "text-[#7A8FA8] hover:text-white"
                }`}
              >
                {location.startsWith("/projects") && (
                  <motion.span
                    layoutId="nav-indicator"
                    className="absolute inset-0 bg-[rgba(184,200,220,0.08)] rounded-sm border border-[rgba(184,200,220,0.2)]"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                  />
                )}
                <FolderOpen size={13} className="relative z-10" />
                <span className="relative z-10">Projects</span>
              </button>
            </Link>
          </div>

          {/* CTA + Mobile Toggle */}
          <div className="flex items-center gap-3">
            <a
              href="mailto:mr.a.aljarallah@gmail.com"
              className="hidden sm:flex items-center gap-2 px-4 py-1.5 rounded-sm bg-gradient-to-r from-[#7A8FA8] to-[#B8C8DC] text-[#0A0E1A] text-sm font-['Playfair_Display'] font-bold transition-all duration-200 hover:shadow-[0_0_20px_rgba(184,200,220,0.4)] hover:scale-105"
            >
              <Mail size={13} />
              Hire Me
            </a>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 text-[#7A8FA8] hover:text-[#B8C8DC] transition-colors"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-[#0A0E1A]/95 backdrop-blur-xl border-b border-[rgba(184,200,220,0.15)]"
          >
            <div className="px-4 py-4 space-y-1">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className="w-full text-left px-4 py-3 text-sm font-['Lato'] text-[#7A8FA8] hover:text-[#B8C8DC] hover:bg-[rgba(184,200,220,0.05)] rounded-sm transition-all duration-200"
                >
                  {link.label}
                </button>
              ))}
              <Link href="/projects">
                <button
                  onClick={() => setMobileOpen(false)}
                  className="w-full text-left flex items-center gap-2 px-4 py-3 text-sm font-['Lato'] text-[#B8C8DC] hover:bg-[rgba(184,200,220,0.05)] rounded-sm transition-all duration-200"
                >
                  <FolderOpen size={14} />
                  Projects
                </button>
              </Link>
              <a
                href="mailto:mr.a.aljarallah@gmail.com"
                className="flex items-center gap-2 px-4 py-3 mt-2 rounded-sm bg-gradient-to-r from-[#7A8FA8] to-[#B8C8DC] text-[#0A0E1A] text-sm font-['Playfair_Display'] font-bold"
              >
                <Mail size={14} />
                Hire Me
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
