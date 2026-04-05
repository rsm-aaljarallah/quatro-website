/*
 * DESIGN: Cyber-Dark Projects Section
 * Three real analytics projects from the Quarto site
 * Card grid with hover glow, tech tags, key results highlighted
 */

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Brain, BarChart2, Zap, ExternalLink, ChevronRight } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "Customer Churn Prediction Model",
    date: "Sep 2025",
    description:
      "Developed a machine learning model to predict customer churn for a financial services case study, identifying key retention drivers and recommending targeted intervention strategies.",
    icon: Brain,
    color: "#B8C8DC",
    categories: ["Machine Learning", "Python", "Customer Analytics"],
    approach: [
      "Cleaned and preprocessed customer data including demographics, transaction history, and engagement metrics",
      "Trained and compared Logistic Regression, Random Forest, and Gradient Boosting models",
      "Visualized key findings and retention drivers in Tableau",
    ],
    results: [
      { metric: "87%", label: "Prediction Accuracy" },
      { metric: "15%", label: "Projected Churn Reduction" },
    ],
    tools: ["Python", "Pandas", "NumPy", "Scikit-learn", "Tableau"],
  },
  {
    id: 2,
    title: "Marketing Campaign ROI Dashboard",
    date: "Jun 2025",
    description:
      "Built an interactive Power BI dashboard analyzing multi-channel campaign performance across digital and traditional media, enabling real-time budget reallocation decisions.",
    icon: BarChart2,
    color: "#7A8FA8",
    categories: ["Data Visualization", "Marketing Analytics", "Power BI"],
    approach: [
      "Aggregated campaign data from digital and traditional media channels using SQL",
      "Designed interactive Power BI dashboard with drill-down by channel, region, and time",
      "Automated data refresh pipelines using Python for near real-time reporting",
    ],
    results: [
      { metric: "23%", label: "ROI Improvement" },
      { metric: "Real-time", label: "Budget Reallocation" },
    ],
    tools: ["Power BI", "SQL", "Python", "Marketing Analytics"],
  },
  {
    id: 3,
    title: "Digital Transformation Case Study",
    date: "Mar 2025",
    description:
      "Documented and analyzed an organizational transformation at the Public Institution for Social Security in Kuwait that achieved 100% digital adoption across 3,000+ employees.",
    icon: Zap,
    color: "#6A8AA8",
    categories: ["Change Management", "Digital Transformation", "Data Analytics"],
    approach: [
      "Designed training campaigns, social media competitions, and change management strategies",
      "Tracked adoption metrics across 20+ departments using data tracking systems",
      "Created a high-performance employee recognition program with HR to incentivize engagement",
    ],
    results: [
      { metric: "100%", label: "Digital Adoption" },
      { metric: "3 months", label: "Full Rollout" },
      { metric: "3,000+", label: "Employees" },
    ],
    tools: ["Change Management", "Data Analytics", "Strategic Comms", "Data Storytelling"],
  },
];

export default function ProjectsSection() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true });

  return (
    <section
      id="projects"
      className="py-24 relative"
      style={{ background: "linear-gradient(180deg, #0A0E1A 0%, #0D1525 100%)" }}
    >
      {/* Background accent */}
      <div
        className="absolute top-1/2 right-0 w-96 h-96 rounded-full opacity-5 pointer-events-none"
        style={{
          background: "radial-gradient(circle, #7A8FA8 0%, transparent 70%)",
          transform: "translate(40%, -50%)",
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
          <div className="mono-label">05 / Projects</div>
          <div className="flex-1 section-divider" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-16"
        >
          <h2 className="font-['Playfair_Display'] font-extrabold text-4xl lg:text-5xl text-white mb-4">
            Analytics <span className="text-gradient-cyan">Projects</span>
          </h2>
          <p className="font-['Lato'] text-[#7A8FA8] text-lg max-w-2xl">
            Real-world applications of machine learning, data visualization, and strategic analytics — from predictive models to organizational transformation.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="card-cyber rounded-lg p-6 flex flex-col group"
              style={{ borderColor: `${project.color}20` }}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div
                  className="w-11 h-11 rounded-sm flex items-center justify-center flex-shrink-0"
                  style={{
                    background: `${project.color}15`,
                    border: `1px solid ${project.color}30`,
                  }}
                >
                  <project.icon size={20} style={{ color: project.color }} />
                </div>
                <span
                  className="text-xs font-['JetBrains_Mono'] px-2 py-1 rounded-sm"
                  style={{
                    color: project.color,
                    background: `${project.color}10`,
                    border: `1px solid ${project.color}25`,
                  }}
                >
                  {project.date}
                </span>
              </div>

              {/* Title & description */}
              <h3 className="font-['Playfair_Display'] font-bold text-white text-lg leading-tight mb-2">
                {project.title}
              </h3>
              <p className="font-['Lato'] text-[#7A8FA8] text-sm leading-relaxed mb-4">
                {project.description}
              </p>

              {/* Key results */}
              <div className="flex flex-wrap gap-3 mb-4">
                {project.results.map(({ metric, label }) => (
                  <div
                    key={label}
                    className="flex-1 min-w-[80px] text-center py-2 px-3 rounded-sm"
                    style={{
                      background: `${project.color}08`,
                      border: `1px solid ${project.color}20`,
                    }}
                  >
                    <div
                      className="font-['Playfair_Display'] font-extrabold text-lg"
                      style={{ color: project.color }}
                    >
                      {metric}
                    </div>
                    <div className="font-['Lato'] text-[#4A5A6A] text-xs mt-0.5">{label}</div>
                  </div>
                ))}
              </div>

              {/* Approach bullets */}
              <div className="space-y-1.5 mb-4 flex-1">
                {project.approach.map((step, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <ChevronRight
                      size={12}
                      className="mt-1 flex-shrink-0"
                      style={{ color: project.color }}
                    />
                    <span className="font-['Lato'] text-[#7A98B8] text-xs leading-relaxed">
                      {step}
                    </span>
                  </div>
                ))}
              </div>

              {/* Tool tags */}
              <div className="flex flex-wrap gap-1.5 mt-auto pt-4 border-t border-[rgba(255,255,255,0.05)]">
                {project.tools.map((tool) => (
                  <span
                    key={tool}
                    className="text-xs font-['JetBrains_Mono'] px-2 py-0.5 rounded-sm"
                    style={{
                      color: `${project.color}CC`,
                      background: `${project.color}08`,
                      border: `1px solid ${project.color}18`,
                    }}
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* GitHub CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-10 text-center"
        >
          <a
            href="https://github.com/rsm-aaljarallah"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-sm font-['Playfair_Display'] font-bold text-sm text-[#B8C8DC] transition-all duration-200 hover:bg-[rgba(184,200,220,0.08)] hover:scale-105"
            style={{ border: "1px solid rgba(184,200,220,0.25)" }}
          >
            <ExternalLink size={14} />
            View All Projects on GitHub
          </a>
        </motion.div>
      </div>
    </section>
  );
}
