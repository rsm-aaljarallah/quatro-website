/*
 * Color Theme Preview Page
 * Shows 4 distinct palette options as mini resume card mockups
 * User picks one to apply to the full site
 */

import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Mail, Briefcase, GraduationCap, Code2, ChevronRight, Check } from "lucide-react";

const themes = [
  {
    id: "gold",
    name: "Slate & Warm Gold",
    tagline: "Premium · Executive · Sophisticated",
    bg: "#0F0F0F",
    surface: "#1A1A1A",
    surfaceBorder: "#2A2A2A",
    accent: "#C9A84C",
    accentSoft: "rgba(201,168,76,0.12)",
    accentBorder: "rgba(201,168,76,0.25)",
    text: "#F0EDE8",
    textMuted: "#8A8480",
    textDim: "#4A4440",
    label: "#C9A84C",
    gradient: "linear-gradient(135deg, #C9A84C, #E8C97A)",
    gradientBg: "linear-gradient(135deg, #0F0F0F 0%, #161410 100%)",
    description: "Deep charcoal with warm amber/gold. Feels like a premium business card — confident and executive.",
  },
  {
    id: "navy",
    name: "Deep Navy & Crisp White",
    tagline: "Clean · Minimal · Bloomberg-meets-Apple",
    bg: "#0A0E1A",
    surface: "#111827",
    surfaceBorder: "#1E2A3A",
    accent: "#E8EDF5",
    accentSoft: "rgba(232,237,245,0.07)",
    accentBorder: "rgba(232,237,245,0.15)",
    text: "#F8FAFC",
    textMuted: "#7A8FA8",
    textDim: "#3A4A5A",
    label: "#94A8C0",
    gradient: "linear-gradient(135deg, #E8EDF5, #B8C8DC)",
    gradientBg: "linear-gradient(135deg, #0A0E1A 0%, #0D1525 100%)",
    description: "Very clean dark navy with crisp white text. No gimmicks — just pure clarity and professionalism.",
  },
  {
    id: "emerald",
    name: "Graphite & Emerald",
    tagline: "Modern · Distinctive · Grounded",
    bg: "#0C0F0C",
    surface: "#141A14",
    surfaceBorder: "#1E2A1E",
    accent: "#4ADE80",
    accentSoft: "rgba(74,222,128,0.08)",
    accentBorder: "rgba(74,222,128,0.2)",
    text: "#E8F0E8",
    textMuted: "#7A9A7A",
    textDim: "#3A5A3A",
    label: "#4ADE80",
    gradient: "linear-gradient(135deg, #22C55E, #4ADE80)",
    gradientBg: "linear-gradient(135deg, #0C0F0C 0%, #0F1410 100%)",
    description: "Near-black with deep emerald green. Modern and distinctive — stands out without being flashy.",
  },
  {
    id: "coral",
    name: "Midnight & Warm Coral",
    tagline: "Human · Warm · Memorable",
    bg: "#0F0C0A",
    surface: "#1A1410",
    surfaceBorder: "#2A1E18",
    accent: "#E8856A",
    accentSoft: "rgba(232,133,106,0.1)",
    accentBorder: "rgba(232,133,106,0.22)",
    text: "#F5EDE8",
    textMuted: "#9A7A6A",
    textDim: "#4A3A30",
    label: "#E8856A",
    gradient: "linear-gradient(135deg, #E8856A, #F0A080)",
    gradientBg: "linear-gradient(135deg, #0F0C0A 0%, #160F0A 100%)",
    description: "Dark warm background with muted coral. Unique and human — feels different from every other tech resume.",
  },
];

function MiniResumeCard({ theme, selected, onClick }: {
  theme: typeof themes[0];
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      onClick={onClick}
      className="cursor-pointer relative rounded-xl overflow-hidden"
      style={{
        background: theme.bg,
        border: selected ? `2px solid ${theme.accent}` : `2px solid ${theme.surfaceBorder}`,
        boxShadow: selected ? `0 0 30px ${theme.accentSoft}, 0 8px 40px rgba(0,0,0,0.5)` : "0 8px 40px rgba(0,0,0,0.4)",
        transition: "border 0.2s, box-shadow 0.2s",
      }}
    >
      {/* Selected badge */}
      {selected && (
        <div
          className="absolute top-3 right-3 z-10 w-7 h-7 rounded-full flex items-center justify-center"
          style={{ background: theme.accent }}
        >
          <Check size={14} color={theme.bg} strokeWidth={3} />
        </div>
      )}

      {/* Mini hero */}
      <div className="p-5 pb-4" style={{ background: theme.gradientBg }}>
        {/* Navbar mockup */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <div
              className="w-6 h-6 rounded-sm flex items-center justify-center text-[9px] font-bold"
              style={{ background: theme.gradient, color: theme.bg }}
            >
              AA
            </div>
            <span className="text-[10px] font-bold" style={{ color: theme.text, fontFamily: "sans-serif" }}>
              Abdullah Aljarallah
            </span>
          </div>
          <div
            className="text-[9px] px-2 py-0.5 rounded-sm font-bold"
            style={{ background: theme.gradient, color: theme.bg }}
          >
            Hire Me
          </div>
        </div>

        {/* Hero content */}
        <div className="flex items-center gap-4 mb-4">
          {/* Avatar */}
          <div
            className="w-14 h-14 rounded-full flex-shrink-0 flex items-center justify-center text-lg font-bold"
            style={{
              background: theme.accentSoft,
              border: `2px solid ${theme.accent}`,
              color: theme.accent,
              fontFamily: "sans-serif",
            }}
          >
            AJ
          </div>
          <div>
            <div
              className="text-[9px] mb-1 font-mono"
              style={{ color: theme.label, letterSpacing: "0.1em" }}
            >
              MSBA @ UC SAN DIEGO
            </div>
            <div
              className="text-xl font-extrabold leading-tight"
              style={{ color: theme.text, fontFamily: "sans-serif" }}
            >
              Abdullah
              <br />
              <span style={{ background: theme.gradient, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Aljarallah
              </span>
            </div>
          </div>
        </div>

        {/* Contact pills */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {[
            { icon: MapPin, text: "San Diego, CA" },
            { icon: Mail, text: "mr.a.aljarallah@gmail.com" },
          ].map(({ icon: Icon, text }) => (
            <div
              key={text}
              className="flex items-center gap-1 px-2 py-1 rounded-sm text-[9px]"
              style={{
                background: theme.accentSoft,
                border: `1px solid ${theme.accentBorder}`,
                color: theme.textMuted,
              }}
            >
              <Icon size={8} style={{ color: theme.accent }} />
              {text}
            </div>
          ))}
        </div>

        {/* CTA buttons */}
        <div className="flex gap-2">
          <div
            className="px-3 py-1.5 rounded-sm text-[9px] font-bold"
            style={{ background: theme.gradient, color: theme.bg }}
          >
            View Projects
          </div>
          <div
            className="px-3 py-1.5 rounded-sm text-[9px] font-bold"
            style={{
              border: `1px solid ${theme.accentBorder}`,
              color: theme.accent,
            }}
          >
            Get In Touch
          </div>
        </div>
      </div>

      {/* Mini sections preview */}
      <div className="p-5 pt-4 space-y-3">
        {/* Experience card */}
        <div
          className="p-3 rounded-sm"
          style={{ background: theme.surface, border: `1px solid ${theme.surfaceBorder}` }}
        >
          <div className="flex items-center gap-2 mb-1.5">
            <div
              className="w-5 h-5 rounded-sm flex items-center justify-center"
              style={{ background: theme.accentSoft }}
            >
              <Briefcase size={9} style={{ color: theme.accent }} />
            </div>
            <div>
              <div className="text-[9px] font-bold" style={{ color: theme.text }}>
                Public Relations Specialist
              </div>
              <div className="text-[8px]" style={{ color: theme.accent }}>
                Public Institution for Social Security
              </div>
            </div>
          </div>
          <div className="flex items-start gap-1">
            <ChevronRight size={8} style={{ color: theme.accent }} className="mt-0.5 flex-shrink-0" />
            <span className="text-[8px]" style={{ color: theme.textMuted }}>
              Drove email adoption from 0% to 100% across 3,000+ employees
            </span>
          </div>
        </div>

        {/* Skills bar */}
        <div
          className="p-3 rounded-sm"
          style={{ background: theme.surface, border: `1px solid ${theme.surfaceBorder}` }}
        >
          <div className="flex items-center gap-1.5 mb-2">
            <Code2 size={9} style={{ color: theme.accent }} />
            <span className="text-[9px] font-bold" style={{ color: theme.text }}>Skills</span>
          </div>
          {[
            { label: "Python / ML", pct: 82 },
            { label: "Power BI", pct: 90 },
            { label: "Marketing Strategy", pct: 95 },
          ].map(({ label, pct }) => (
            <div key={label} className="mb-1.5">
              <div className="flex justify-between mb-0.5">
                <span className="text-[8px]" style={{ color: theme.textMuted }}>{label}</span>
                <span className="text-[8px]" style={{ color: theme.accent }}>{pct}%</span>
              </div>
              <div className="h-1 rounded-full" style={{ background: theme.accentSoft }}>
                <div
                  className="h-full rounded-full"
                  style={{ width: `${pct}%`, background: theme.gradient }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Education */}
        <div
          className="p-3 rounded-sm"
          style={{ background: theme.surface, border: `1px solid ${theme.surfaceBorder}` }}
        >
          <div className="flex items-center gap-2">
            <div
              className="w-5 h-5 rounded-sm flex items-center justify-center"
              style={{ background: theme.accentSoft }}
            >
              <GraduationCap size={9} style={{ color: theme.accent }} />
            </div>
            <div>
              <div className="text-[9px] font-bold" style={{ color: theme.text }}>
                MS Business Analytics
              </div>
              <div className="text-[8px]" style={{ color: theme.textMuted }}>
                UC San Diego · Rady School of Management
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Theme label */}
      <div
        className="px-5 py-3 border-t"
        style={{ borderColor: theme.surfaceBorder, background: theme.surface }}
      >
        <div className="font-bold text-sm mb-0.5" style={{ color: theme.text, fontFamily: "sans-serif" }}>
          {theme.name}
        </div>
        <div className="text-[10px]" style={{ color: theme.textMuted }}>
          {theme.tagline}
        </div>
      </div>
    </motion.div>
  );
}

export default function ThemePreview() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div
      className="min-h-screen py-16 px-4"
      style={{ background: "#080808" }}
    >
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div
            className="inline-block text-xs font-mono px-3 py-1 rounded-full mb-4"
            style={{ background: "rgba(255,255,255,0.05)", color: "#888", border: "1px solid rgba(255,255,255,0.1)" }}
          >
            COLOR THEME SELECTOR
          </div>
          <h1 className="text-3xl font-extrabold text-white mb-3" style={{ fontFamily: "sans-serif" }}>
            Pick Your Color Theme
          </h1>
          <p className="text-[#666] text-sm max-w-md mx-auto">
            Each option uses the same layout and content — only the colors change. Click one to select it, then tell me your choice.
          </p>
        </motion.div>

        {/* Theme grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          {themes.map((theme, i) => (
            <motion.div
              key={theme.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <MiniResumeCard
                theme={theme}
                selected={selected === theme.id}
                onClick={() => setSelected(selected === theme.id ? null : theme.id)}
              />
            </motion.div>
          ))}
        </div>

        {/* Description of selected */}
        {selected && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center p-5 rounded-xl mb-6"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
          >
            {(() => {
              const t = themes.find(t => t.id === selected)!;
              return (
                <>
                  <div className="font-bold text-white text-lg mb-1" style={{ fontFamily: "sans-serif" }}>
                    {t.name}
                  </div>
                  <p className="text-[#888] text-sm">{t.description}</p>
                  <div
                    className="mt-3 inline-block text-xs font-mono px-3 py-1 rounded-full"
                    style={{ background: t.accentSoft, color: t.accent, border: `1px solid ${t.accentBorder}` }}
                  >
                    Selected — tell me this is the one and I'll apply it!
                  </div>
                </>
              );
            })()}
          </motion.div>
        )}

        <p className="text-center text-[#555] text-xs">
          Just tell me the name or number (1–4) of the theme you want applied to your full site.
        </p>
      </div>
    </div>
  );
}
