/*
 * DESIGN: Cyber-Dark Contact Section + Footer
 * Clean contact card with email, phone, location
 * Glowing CTA button, social links (LinkedIn + GitHub from Quarto site)
 */

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Mail, Phone, MapPin, Send, Linkedin, Github, ExternalLink } from "lucide-react";

const contactItems = [
  {
    icon: Mail,
    label: "Email",
    value: "mr.a.aljarallah@gmail.com",
    href: "mailto:mr.a.aljarallah@gmail.com",
    color: "#00D4FF",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+965 97733691",
    href: "tel:+96597733691",
    color: "#0066FF",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Kuwait City, Kuwait",
    href: "#",
    color: "#4A90D9",
  },
];

const socialLinks = [
  {
    icon: Linkedin,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/abdullah-aljarallah-a72512b7/",
    color: "#0A66C2",
    bg: "rgba(10,102,194,0.12)",
    border: "rgba(10,102,194,0.35)",
  },
  {
    icon: Github,
    label: "GitHub",
    href: "https://github.com/rsm-aaljarallah",
    color: "#C8D8F0",
    bg: "rgba(255,255,255,0.06)",
    border: "rgba(255,255,255,0.15)",
  },
];

export default function ContactSection() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true });

  return (
    <>
      <section
        id="contact"
        className="py-24 relative"
        style={{
          background: "linear-gradient(180deg, #050A18 0%, #070E20 100%)",
        }}
      >
        {/* Decorative top line */}
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(0,212,255,0.3), transparent)",
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section header */}
          <motion.div
            ref={headerRef}
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-4 mb-16"
          >
            <div className="mono-label">08 / Contact</div>
            <div className="flex-1 section-divider" />
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left: CTA text */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <h2 className="font-['Syne'] font-extrabold text-4xl lg:text-5xl text-white mb-6 leading-tight">
                Let's Build Something
                <br />
                <span className="text-gradient-cyan">Data-Driven</span>
              </h2>
              <p className="font-['DM_Sans'] text-[#8BA8CC] text-lg leading-relaxed mb-8">
                Whether you're looking for a business analytics expert, a
                marketing strategist, or someone who can bridge the gap between
                data and decisions — I'd love to connect.
              </p>

              {/* Availability badge */}
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-sm bg-[rgba(0,212,255,0.05)] border border-[rgba(0,212,255,0.2)] mb-8">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="font-['JetBrains_Mono'] text-sm text-[#00D4FF]">
                  Available for opportunities
                </span>
              </div>

              {/* Social links */}
              <div className="flex gap-3 mb-8">
                {socialLinks.map(({ icon: Icon, label, href, color, bg, border }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-5 py-2.5 rounded-sm font-['DM_Sans'] font-medium text-sm transition-all duration-200 hover:scale-105"
                    style={{ color, background: bg, border: `1px solid ${border}` }}
                  >
                    <Icon size={15} />
                    {label}
                  </a>
                ))}
              </div>

              {/* Quick stats */}
              <div className="grid grid-cols-3 gap-4">
                {[
                  { value: "10+", label: "Years Exp." },
                  { value: "3", label: "Industries" },
                  { value: "2", label: "Languages" },
                ].map(({ value, label }) => (
                  <div
                    key={label}
                    className="text-center p-3 rounded-sm"
                    style={{
                      background: "rgba(0,212,255,0.04)",
                      border: "1px solid rgba(0,212,255,0.1)",
                    }}
                  >
                    <div className="font-['Syne'] font-extrabold text-2xl text-gradient-cyan">
                      {value}
                    </div>
                    <div className="font-['DM_Sans'] text-xs text-[#5A7A9A] mt-0.5">
                      {label}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right: Contact card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div
                className="rounded-lg p-8"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(13,31,60,0.8) 0%, rgba(10,22,40,0.9) 100%)",
                  border: "1px solid rgba(0,212,255,0.2)",
                  boxShadow: "0 0 40px rgba(0,212,255,0.08)",
                }}
              >
                <h3 className="font-['Syne'] font-bold text-white text-xl mb-6 flex items-center gap-2">
                  <span className="w-1 h-5 bg-gradient-to-b from-[#00D4FF] to-[#0066FF] rounded-full" />
                  Get In Touch
                </h3>

                {/* Contact items */}
                <div className="space-y-4 mb-8">
                  {contactItems.map(({ icon: Icon, label, value, href, color }) => (
                    <a
                      key={label}
                      href={href}
                      className="flex items-center gap-4 p-4 rounded-sm group transition-all duration-200 hover:bg-[rgba(0,212,255,0.04)]"
                      style={{ border: `1px solid ${color}15` }}
                    >
                      <div
                        className="w-10 h-10 rounded-sm flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform"
                        style={{
                          background: `${color}15`,
                          border: `1px solid ${color}30`,
                        }}
                      >
                        <Icon size={16} style={{ color }} />
                      </div>
                      <div>
                        <div className="text-xs font-['JetBrains_Mono'] text-[#5A7A9A] uppercase tracking-wider">
                          {label}
                        </div>
                        <div className="font-['DM_Sans'] text-[#C8D8F0] text-sm mt-0.5 group-hover:text-white transition-colors">
                          {value}
                        </div>
                      </div>
                      <ExternalLink
                        size={12}
                        className="ml-auto text-[#5A7A9A] group-hover:text-[#00D4FF] transition-colors"
                      />
                    </a>
                  ))}
                </div>

                {/* CTA Button */}
                <a
                  href="mailto:mr.a.aljarallah@gmail.com"
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-sm font-['Syne'] font-bold text-sm transition-all duration-200 hover:shadow-[0_0_30px_rgba(0,212,255,0.4)] hover:scale-[1.02]"
                  style={{
                    background: "linear-gradient(90deg, #0066FF, #00D4FF)",
                    color: "#050A18",
                  }}
                >
                  <Send size={14} />
                  Send a Message
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="py-8 border-t border-[rgba(0,212,255,0.1)]"
        style={{ background: "#050A18" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-sm bg-gradient-to-br from-[#00D4FF] to-[#0066FF] flex items-center justify-center text-[#050A18] font-bold text-xs font-mono">
                AA
              </div>
              <span className="font-['DM_Sans'] text-[#5A7A9A] text-sm">
                Abdullah Aljarallah © {new Date().getFullYear()}
              </span>
            </div>
            <div className="flex items-center gap-4">
              <a
                href="https://www.linkedin.com/in/abdullah-aljarallah-a72512b7/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#3A5A7A] hover:text-[#5BA3E0] transition-colors"
              >
                <Linkedin size={16} />
              </a>
              <a
                href="https://github.com/rsm-aaljarallah"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#3A5A7A] hover:text-[#C8D8F0] transition-colors"
              >
                <Github size={16} />
              </a>
              <span className="font-['JetBrains_Mono'] text-xs text-[#3A5A7A]">
                Business Analytics & Strategy
              </span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
