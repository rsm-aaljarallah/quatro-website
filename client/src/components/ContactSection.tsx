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
    color: "#B8C8DC",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+1 619-314-1187",
    href: "tel:+16193141187",
    color: "#7A8FA8",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "San Diego, CA",
    href: "#",
    color: "#6A8AA8",
  },
];

const socialLinks = [
  {
    icon: Linkedin,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/abdullah-aljarallah-a72512b7/",
    color: "#5A8AB0",
    bg: "rgba(10,102,194,0.12)",
    border: "rgba(10,102,194,0.35)",
  },
  {
    icon: Github,
    label: "GitHub",
    href: "https://github.com/rsm-aaljarallah",
    color: "#D8E4F0",
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
          background: "linear-gradient(180deg, #0A0E1A 0%, #0D1525 100%)",
        }}
      >
        {/* Decorative top line */}
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(184,200,220,0.3), transparent)",
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
              <h2 className="font-['Playfair_Display'] font-extrabold text-4xl lg:text-5xl text-white mb-6 leading-tight">
                Let's Build Something
                <br />
                <span className="text-gradient-cyan">Data-Driven</span>
              </h2>
              <p className="font-['Lato'] text-[#7A8FA8] text-lg leading-relaxed mb-8">
                Whether you're looking for a business analytics expert, a
                marketing strategist, or someone who can bridge the gap between
                data and decisions — I'd love to connect.
              </p>

              {/* Availability badge */}
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-sm bg-[rgba(184,200,220,0.05)] border border-[rgba(184,200,220,0.2)] mb-8">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="font-['JetBrains_Mono'] text-sm text-[#B8C8DC]">
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
                    className="flex items-center gap-2 px-5 py-2.5 rounded-sm font-['Lato'] font-medium text-sm transition-all duration-200 hover:scale-105"
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
                      background: "rgba(184,200,220,0.04)",
                      border: "1px solid rgba(184,200,220,0.1)",
                    }}
                  >
                    <div className="font-['Playfair_Display'] font-extrabold text-2xl text-gradient-cyan">
                      {value}
                    </div>
                    <div className="font-['Lato'] text-xs text-[#4A5A6A] mt-0.5">
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
                    "linear-gradient(135deg, rgba(19,29,46,0.8) 0%, rgba(17,24,39,0.9) 100%)",
                  border: "1px solid rgba(184,200,220,0.2)",
                  boxShadow: "0 0 40px rgba(184,200,220,0.08)",
                }}
              >
                <h3 className="font-['Playfair_Display'] font-bold text-white text-xl mb-6 flex items-center gap-2">
                  <span className="w-1 h-5 bg-gradient-to-b from-[#B8C8DC] to-[#7A8FA8] rounded-full" />
                  Get In Touch
                </h3>

                {/* Contact items */}
                <div className="space-y-4 mb-8">
                  {contactItems.map(({ icon: Icon, label, value, href, color }) => (
                    <a
                      key={label}
                      href={href}
                      className="flex items-center gap-4 p-4 rounded-sm group transition-all duration-200 hover:bg-[rgba(184,200,220,0.04)]"
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
                        <div className="text-xs font-['JetBrains_Mono'] text-[#4A5A6A] uppercase tracking-wider">
                          {label}
                        </div>
                        <div className="font-['Lato'] text-[#D8E4F0] text-sm mt-0.5 group-hover:text-white transition-colors">
                          {value}
                        </div>
                      </div>
                      <ExternalLink
                        size={12}
                        className="ml-auto text-[#4A5A6A] group-hover:text-[#B8C8DC] transition-colors"
                      />
                    </a>
                  ))}
                </div>

                {/* CTA Button */}
                <a
                  href="mailto:mr.a.aljarallah@gmail.com"
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-sm font-['Playfair_Display'] font-bold text-sm transition-all duration-200 hover:shadow-[0_0_30px_rgba(184,200,220,0.4)] hover:scale-[1.02]"
                  style={{
                    background: "linear-gradient(90deg, #7A8FA8, #B8C8DC)",
                    color: "#0A0E1A",
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
        className="py-8 border-t border-[rgba(184,200,220,0.1)]"
        style={{ background: "#0A0E1A" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-sm bg-gradient-to-br from-[#B8C8DC] to-[#7A8FA8] flex items-center justify-center text-[#0A0E1A] font-bold text-xs font-mono">
                AA
              </div>
              <span className="font-['Lato'] text-[#4A5A6A] text-sm">
                Abdullah Aljarallah © {new Date().getFullYear()}
              </span>
            </div>
            <div className="flex items-center gap-4">
              <a
                href="https://www.linkedin.com/in/abdullah-aljarallah-a72512b7/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#2A3A4A] hover:text-[#5BA3E0] transition-colors"
              >
                <Linkedin size={16} />
              </a>
              <a
                href="https://github.com/rsm-aaljarallah"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#2A3A4A] hover:text-[#D8E4F0] transition-colors"
              >
                <Github size={16} />
              </a>
              <span className="font-['JetBrains_Mono'] text-xs text-[#2A3A4A]">
                Business Analytics & Strategy
              </span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
