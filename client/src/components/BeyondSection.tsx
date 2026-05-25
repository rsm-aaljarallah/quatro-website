import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Anchor, Globe, TrendingUp, Coffee } from "lucide-react";

const items = [
  {
    icon: Anchor,
    title: "Scuba Diving",
    subtitle: "PADI Certified · Kuwait & Red Sea",
    description:
      "Certified diver and co-founder of a dive tourism venture in Kuwait. The ocean is where I disconnect — and where I learned that patience and precision matter as much underwater as they do in analytics.",
    color: "#5A9AB8",
    tag: "Venture",
  },
  {
    icon: Globe,
    title: "Travel & Culture",
    subtitle: "GCC · Europe · Southeast Asia",
    description:
      "Living and working across Kuwait, Saudi Arabia, and the US has shaped how I think about markets, consumer behavior, and what 'local' really means for global brands.",
    color: "#7A8FA8",
    tag: "Life",
  },
  {
    icon: TrendingUp,
    title: "Growth Consulting",
    subtitle: "Founder · Independent",
    description:
      "Running a side consulting practice for SMEs in the Gulf — mostly helping founders who are great at their craft but drowning in spreadsheets and gut-feel decisions.",
    color: "#B8C8DC",
    tag: "Venture",
  },
  {
    icon: Coffee,
    title: "Building in Public",
    subtitle: "AI Tools · Knowledge Systems",
    description:
      "Outside class hours I'm building Neural Vault — a personal AI knowledge system using Claude and Obsidian. I treat my own workflow as a product to be measured and improved.",
    color: "#6A8AA8",
    tag: "Side Project",
  },
];

export default function BeyondSection() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true });

  return (
    <section
      id="beyond"
      className="py-24 relative"
      style={{ background: "linear-gradient(180deg, #0D1525 0%, #0A0E1A 100%)" }}
    >
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(184,200,220,0.15), transparent)" }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-16"
        >
          <div className="mono-label">08 / Beyond the Data</div>
          <div className="flex-1 section-divider" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-12"
        >
          <h2 className="font-['Playfair_Display'] font-extrabold text-4xl lg:text-5xl text-white mb-4">
            What I Do When I'm <span className="text-gradient-cyan">Not Modeling</span>
          </h2>
          <p className="font-['Lato'] text-[#7A8FA8] text-lg max-w-2xl">
            The projects and pursuits that don't fit on a resume but shape how I think.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {items.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -6, boxShadow: `0 20px 60px ${item.color}15` }}
              className="relative rounded-lg p-6 flex flex-col"
              style={{
                background: "linear-gradient(135deg, rgba(19,29,46,0.6) 0%, rgba(13,21,37,0.8) 100%)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                border: `1px solid ${item.color}20`,
                boxShadow: `0 0 30px ${item.color}06`,
                transition: "all 0.3s ease",
              }}
            >
              {/* Tag */}
              <span
                className="absolute top-4 right-4 text-[9px] font-['JetBrains_Mono'] uppercase tracking-widest px-2 py-0.5 rounded-sm"
                style={{ color: `${item.color}80`, background: `${item.color}10`, border: `1px solid ${item.color}20` }}
              >
                {item.tag}
              </span>

              {/* Icon */}
              <div
                className="w-10 h-10 rounded-sm flex items-center justify-center mb-5"
                style={{ background: `${item.color}12`, border: `1px solid ${item.color}25` }}
              >
                <item.icon size={18} style={{ color: item.color }} />
              </div>

              <h3 className="font-['Playfair_Display'] font-bold text-white text-base mb-1">
                {item.title}
              </h3>
              <p
                className="font-['JetBrains_Mono'] text-[10px] uppercase tracking-wider mb-3"
                style={{ color: `${item.color}70` }}
              >
                {item.subtitle}
              </p>
              <p className="font-['Lato'] text-[#6A7A8A] text-sm leading-relaxed">
                {item.description}
              </p>

              {/* Bottom accent line */}
              <div
                className="absolute bottom-0 left-6 right-6 h-px rounded-full"
                style={{ background: `linear-gradient(90deg, transparent, ${item.color}30, transparent)` }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
