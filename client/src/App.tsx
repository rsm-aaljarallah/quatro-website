import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import ThemePreview from "./pages/ThemePreview";
import Projects from "./pages/Projects";
import ProjectViewer from "./pages/ProjectViewer";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function SpotlightCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", updateMousePosition);
    return () => window.removeEventListener("mousemove", updateMousePosition);
  }, []);

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-50 transition-opacity duration-300"
      animate={{
        background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(184, 200, 220, 0.04), transparent 40%)`
      }}
      style={{ mixBlendMode: "screen" }}
    />
  );
}

function useWebMCP() {
  useEffect(() => {
    // Feature detection for WebMCP
    if ('modelContext' in navigator && 'registerTool' in (navigator as any).modelContext) {
      const controller = new AbortController();
      const modelContext = (navigator as any).modelContext;

      // Tool 1: Get Projects
      modelContext.registerTool({
        name: "get_portfolio_projects",
        description: "Retrieves a list of Abdullah Aljarallah's portfolio projects, including tools, methodologies, and context.",
        inputSchema: { type: "object", properties: {} },
        execute() {
          return [
            { title: "Macy's AI Marketing Coworker", tags: ["Next.js", "Python", "LLMs", "RAG"] },
            { title: "Bayesian MMM Capstone", tags: ["Bayesian MMM", "PyMC", "Streamlit"] },
            { title: "Neural Vault", tags: ["Claude MCP", "Obsidian", "Agent Design"] },
            { title: "A/B Testing a CTA", tags: ["A/B Testing", "Statistics", "Python"] },
            { title: "Card & Krueger Replication", tags: ["Causal Inference", "DiD", "Economics"] },
            { title: "Poisson MLE", tags: ["MLE", "Optimization", "Plotly"] }
          ];
        },
        annotations: { readOnlyHint: true }
      }, { signal: controller.signal });

      // Tool 2: Get Background
      modelContext.registerTool({
        name: "get_candidate_background",
        description: "Retrieves Abdullah Aljarallah's structured work history, core competencies, and educational background.",
        inputSchema: { type: "object", properties: {} },
        execute() {
          return {
            education: "MSBA Candidate @ UC San Diego (STEM-designated)",
            core_competencies: ["Bayesian MMM", "Marketing Science", "Python", "SQL", "Claude / MCP", "Causal Inference"],
            experience: [
              { title: "SVP, Strategic Venture Manager", company: "Banque Misr", years: "2020 - 2023" },
              { title: "Manager, Corporate & Credit", company: "Corplease S.A.E", years: "2018 - 2020" }
            ],
            summary: "Marketing operator turned measurement specialist. 10+ years bridging data science, marketing strategy, and digital transformation."
          };
        },
        annotations: { readOnlyHint: true }
      }, { signal: controller.signal });

      return () => controller.abort();
    }
  }, []);
}

import { useLocation } from "wouter";

function Router() {
  const [location] = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location}
        initial={{ opacity: 0, filter: "blur(4px)" }}
        animate={{ opacity: 1, filter: "blur(0px)" }}
        exit={{ opacity: 0, filter: "blur(4px)" }}
        transition={{ duration: 0.35, ease: "easeOut" }}
      >
        <Switch>
          <Route path={"/"} component={Home} />
          <Route path={"/theme-preview"} component={ThemePreview} />
          <Route path={"/projects"} component={Projects} />
          <Route path={"/projects/:slug"} component={ProjectViewer} />
          <Route path={"/404"} component={NotFound} />
          <Route component={NotFound} />
        </Switch>
      </motion.div>
    </AnimatePresence>
  );
}

import { Analytics } from "@vercel/analytics/react";

function App() {
  useWebMCP();

  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <div className="bg-noise" />
        <SpotlightCursor />
        <TooltipProvider>
          <Toaster />
          <Router />
          <Analytics />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
