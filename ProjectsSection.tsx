/*
 * DESIGN: Cyber-Dark Projects Section
 * Three real analytics projects — STAR narrative structure
 * Situation → Task → Action → Result flow per card
 */

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Brain, BarChart2, Zap, FlaskConical, ExternalLink } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "Customer Churn Prediction Model",
    date: "Sep 2025",
    icon: Brain,
    color: "#B8C8DC",
    categories: ["Machine Learning", "Python", "Customer Analytics"],
    situation:
      "A financial services firm was losing customers with no early-warning system in place — retention decisions were reactive and based on gut feel rather than data.",
    task: "Build a predictive model to flag at-risk customers before they churn, and surface the key behavioral drivers so the retention team could act early.",
    action: [
      "Cleaned and engineered features from demographics, transaction history, and engagement data",
      "Trained and benchmarked Logistic Regression, Random Forest, and Gradient Boosting models",
      "Visualized driver importance and segment breakdowns in Tableau for the retention team",
    ],
    results: [
      { metric: "87%", label: "Prediction Accuracy" },
      { metric: "15%", label: "Projected Churn Reduction" },
    ],
    tools: ["Python", "Pandas", "Scikit-learn", "Tableau"],
  },
  {
    id: 2,
    title: "Marketing Campaign ROI Dashboard",
    date: "Jun 2025",
    icon: BarChart2,
    color: "#7A8FA8",
    categories: ["Data Visualization", "Marketing Analytics", "Power BI"],
    situation:
      "A marketing team managing $30M+ in spend across digital and traditional channels had no unified view of performance — budget decisions were delayed by slow, manual reporting.",
    task: "Design a real-time dashboard that consolidates all channel data and enables the team to reallocate budget on the fly based on live ROI signals.",
    action: [
      "Aggregated multi-channel campaign data using SQL and automated refresh pipelines in Python",
      "Built interactive Power BI dashboard with drill-down by channel, region, and time period",
      "Embedded statistical significance flags so the team could distinguish real lifts from noise",
    ],
    results: [
      { metric: "23%", label: "ROI Improvement" },
      { metric: "Real-time", label: "Budget Reallocation" },
    ],
    tools: ["Power BI", "SQL", "Python", "Marketing Analytics"],
  },
  {
    id: 4,
    title: "MaxDiff Analysis — MSBA Class Preferences",
    date: "May 2026",
    icon: FlaskConical,
    color: "#A89BC8",
    categories: ["Discrete Choice Modeling", "Bayesian Statistics", "Python"],
    situation:
      "MSBA students ranked core courses via a Best-Worst Scaling (MaxDiff) survey — 15 forced trade-off screens, each showing 4 classes. Rating scales would have introduced bias; discrete choices extract honest preferences.",
    task: "Estimate and compare class preference rankings using three progressively richer methods, and quantify uncertainty around share-of-preference for each course.",
    action: [
      "Computed descriptive Best-Minus-Worst scores as a baseline ranking",
      "Fit a Multinomial Logit (MNL) model via Maximum Likelihood Estimation with classical standard errors",
      "Fit the same MNL model using a Bayesian random-walk Metropolis-Hastings sampler for full posterior inference",
    ],
    results: [
      { metric: "3", label: "Estimation Methods" },
      { metric: "MLE + MCMC", label: "Inference Approaches" },
    ],
    tools: ["Python", "NumPy", "SciPy", "Bayesian MCMC", "Discrete Choice"],
    link: "/hw4_maxdiff.html",
  },
  {
    id: 3,
    title: "Digital Transformation — PIFSS",
    date: "Mar 2025",
    icon: Zap,
    color: "#6A8AA8",
    categories: ["Change Management", "Digital Transformation", "Data Analytics"],
    situation:
      "Kuwait's Public Institution for Social Security (3,000+ employees, 20+ departments) had near-zero adoption of its new digital systems three months after launch — the rollout was stalling.",
    task: "Design and lead a change management campaign to drive full digital adoption across all departments within a tight three-month window.",
    action: [
      "Launched targeted training campaigns and social media competitions to build internal momentum",
      "Tracked adoption rates by department using custom data dashboards and weekly reporting",
      "Partnered with HR to build a recognition program that incentivized early adopters",
    ],
    results: [
      { metric: "0→100%", label: "Digital Adoption" },
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

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
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

              {/* Title */}
              <h3 className="font-['Playfair_Display'] font-bold text-white text-lg leading-tight mb-4">
                {project.title}
              </h3>

              {/* STAR narrative */}
              <div className="space-y-3 mb-4 flex-1">
                {/* Situation */}
                <div>
                  <span
                    className="text-[10px] font-['JetBrains_Mono'] uppercase tracking-widest"
                    style={{ color: `${project.color}99` }}
                  >
                    Situation
                  </span>
                  <p className="font-['Lato'] text-[#7A8FA8] text-xs leading-relaxed mt-0.5">
                    {project.situation}
                  </p>
                </div>

                {/* Task */}
                <div>
                  <span
                    className="text-[10px] font-['JetBrains_Mono'] uppercase tracking-widest"
                    style={{ color: `${project.color}99` }}
                  >
                    Task
                  </span>
                  <p className="font-['Lato'] text-[#7A8FA8] text-xs leading-relaxed mt-0.5">
                    {project.task}
                  </p>
                </div>

                {/* Action */}
                <div>
                  <span
                    className="text-[10px] font-['JetBrains_Mono'] uppercase tracking-widest"
                    style={{ color: `${project.color}99` }}
                  >
                    Action
                  </span>
                  <ul className="mt-0.5 space-y-1">
                    {project.action.map((step, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span
                          className="mt-1.5 w-1 h-1 rounded-full flex-shrink-0"
                          style={{ background: project.color }}
                        />
                        <span className="font-['Lato'] text-[#7A98B8] text-xs leading-relaxed">
                          {step}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Result metrics */}
              <div
                className="rounded-sm p-3 mb-4"
                style={{
                  background: `${project.color}06`,
                  border: `1px solid ${project.color}18`,
                }}
              >
                <span
                  className="text-[10px] font-['JetBrains_Mono'] uppercase tracking-widest block mb-2"
                  style={{ color: `${project.color}99` }}
                >
                  Result
                </span>
                <div className="flex flex-wrap gap-3">
                  {project.results.map(({ metric, label }) => (
                    <div key={label} className="text-center">
                      <div
                        className="font-['Playfair_Display'] font-extrabold text-xl"
                        style={{ color: project.color }}
                      >
                        {metric}
                      </div>
                      <div className="font-['Lato'] text-[#4A5A6A] text-[10px] mt-0.5">{label}</div>
                    </div>
                  ))}
                </div>
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

              {"link" in project && project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-1.5 text-xs font-['JetBrains_Mono'] transition-opacity duration-200 hover:opacity-80"
                  style={{ color: project.color }}
                >
                  <ExternalLink size={11} />
                  View Report
                </a>
              )}
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
