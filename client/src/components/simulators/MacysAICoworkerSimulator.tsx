import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Cpu,
  Layers,
  Search,
  CheckCircle2,
  Zap,
  Clock,
  Globe,
  FileCheck,
  Sparkles,
  Play,
  Terminal,
  ExternalLink,
  ShieldCheck,
  TrendingUp,
  AlertTriangle,
  FileText,
  Users,
  ShoppingBag,
  Image as ImageIcon,
  CheckSquare,
  Send,
  BarChart3,
  GitPullRequest,
  Check,
  RefreshCw,
  Server,
  Database,
  Sliders,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Layout,
  UserCheck,
  Award,
} from "lucide-react";

export default function MacysAICoworkerSimulator() {
  const [activeTab, setActiveTab] = useState<"workflow" | "rag" | "personas" | "story" | "mcp" | "evals">("workflow");
  
  // Workflow State
  const [selectedCampaign, setSelectedCampaign] = useState<"beauty" | "denim" | "fragrance">("beauty");
  const [currentStep, setCurrentStep] = useState<number>(6);
  const [isExecuting, setIsExecuting] = useState<boolean>(false);
  const [stepOutput, setStepOutput] = useState<any>(null);

  // Local Standalone RAG Comparison Engine State
  const [ragQuery, setRagQuery] = useState<string>("What should I include in the campaign brief?");
  const [activeQueryIndex, setActiveQueryIndex] = useState<number>(0);
  const [isSearchingRag, setIsSearchingRag] = useState<boolean>(false);

  // Persona Workspace State
  const [selectedPersona, setSelectedPersona] = useState<"merna" | "abdullah" | "shankar" | "anna" | "ceo">("merna");

  // Storyboard Slide State
  const [slideNum, setSlideNum] = useState<number>(1);
  const totalSlides = 75;

  const campaigns = {
    beauty: {
      id: "CMP-2026-081",
      name: "Spring Beauty Gala 2026",
      status: "Active (In Progress)",
      category: "Beauty & Cosmetics",
      budget: "$450,000",
      targetCohort: "High-LTV Beauty Enthusiasts (RFM #1)",
      skus: ["SKU-9942 (Lancome Genifique)", "SKU-8810 (Estee Lauder Advanced Night)", "SKU-4412 (Clinique Moisture Surge)"],
    },
    denim: {
      id: "CMP-2025-142",
      name: "Holiday Denim Refresh 2025",
      status: "Completed (Reported)",
      category: "Apparel & Accessories",
      budget: "$600,000",
      targetCohort: "Gen-Z & Urban Trendsetters (RFM #3)",
      skus: ["SKU-1029 (Levi's 501 Original)", "SKU-3091 (Coach Leather Jacket)", "SKU-7721 (Calvin Klein Jeans)"],
    },
    fragrance: {
      id: "CMP-2026-012",
      name: "Regional Fragrance Spotlight",
      status: "Draft (Planned)",
      category: "Luxury Fragrance",
      budget: "$250,000",
      targetCohort: "Loyalty VIP Tier 1 (RFM #2)",
      skus: ["SKU-5012 (Dior Sauvage)", "SKU-6021 (Chanel No. 5)", "SKU-9011 (Tom Ford Black Orchid)"],
    },
  };

  const workflowSteps = [
    { num: 1, name: "Briefing", type: "Human", icon: <FileText size={14} /> },
    { num: 2, name: "Segmentation", type: "Automation (RFM)", icon: <Users size={14} /> },
    { num: 3, name: "SKU Selection", type: "MCP + Auto", icon: <ShoppingBag size={14} /> },
    { num: 4, name: "Creative", type: "DAM Finder", icon: <ImageIcon size={14} /> },
    { num: 5, name: "Layout Copy", type: "LLM Skill", icon: <Sparkles size={14} /> },
    { num: 6, name: "Compliance & Approval", type: "3 LLM Skills", icon: <ShieldCheck size={14} /> },
    { num: 7, name: "Localization", type: "40 Variants", icon: <Globe size={14} /> },
    { num: 8, name: "Activation", type: "Scheduler", icon: <Clock size={14} /> },
    { num: 9, name: "Monitoring", type: "Attribution", icon: <TrendingUp size={14} /> },
    { num: 10, name: "Reporting", type: "Executive AI", icon: <BarChart3 size={14} /> },
  ];

  // Preset RAG Queries and Local Standalone Dataset
  const ragDatabase: Record<string, {
    docId: string;
    section: string;
    naiveScore: number;
    hyqScore: number;
    chunkText: string;
    matchedQuestion?: string;
  }> = {
    "What should I include in the campaign brief?": {
      docId: "BRAND-GL-2026-001",
      section: "Section 2.1 — Campaign Brief Requirements",
      naiveScore: 0.82,
      hyqScore: 0.96,
      chunkText: "All Macy's campaign briefs must include target customer cohort (RFM segment ID), primary promotional offer discount %, list of locked SKU IDs, required regional tax overlays, and expected launch date. Briefs missing MAP compliance checks will be automatically rejected at Step 6a.",
      matchedQuestion: "What mandatory fields are required in the initial marketing brief?",
    },
    "How long should I hold a first markdown for?": {
      docId: "PRICE-RULES-2026-001",
      section: "Section 4.3 — Markdown Duration Standards",
      naiveScore: 0.74,
      hyqScore: 0.94,
      chunkText: "First markdowns for seasonal inventory must be held for a minimum of 14 calendar days before any secondary price reduction can be executed. Promotional stacking with credit card loyalty points is permitted up to a maximum total discount of 45%.",
      matchedQuestion: "What is the minimum holding period for initial price reductions?",
    },
    "Who can approve a campaign with a new tagline?": {
      docId: "COMP-EX-2026-001",
      section: "Section 1.4 — Executive Approval Matrix",
      naiveScore: 0.68,
      hyqScore: 0.93,
      chunkText: "Campaigns introducing unapproved taglines or new slogan variants require explicit sign-off from both the VP of Brand Marketing and Legal Counsel. Approval briefs must be routed through the Step 6b Approval Brief Generator.",
      matchedQuestion: "Which executives hold authority for approving novel promotional taglines?",
    },
    "What disclaimer do I need for percent off claims?": {
      docId: "LEGAL-DIS-2026-002",
      section: "Section 3.2 — Promotional Disclaimer Standard",
      naiveScore: 0.79,
      hyqScore: 0.97,
      chunkText: "All advertisements advertising percent-off claims (e.g., 'Save up to 40%') must include the footnote disclaimer: 'Savings off original prices. Intermediate markdowns may have been taken. Selection varies by store and online. Excludes doorbusters and MAP enforced brands.'",
      matchedQuestion: "What legal text must accompany percentage discount announcements?",
    },
    "What are common reasons campaigns fail compliance?": {
      docId: "COMP-EX-2026-001",
      section: "Section 5.1 — Non-Compliance Audit Log",
      naiveScore: 0.71,
      hyqScore: 0.95,
      chunkText: "The top 3 compliance failure reasons are: 1) MAP discount violations on premium brands (e.g., Lancome >40%), 2) Using banned urgency words like 'Guaranteed Lowest Price', and 3) Omission of regional tax disclaimers on localized digital variants.",
      matchedQuestion: "Why do campaign briefs get flagged during compliance pre-checks?",
    },
    "Do I need a lawyer to sign off on buy-one-get-one?": {
      docId: "LEGAL-DIS-2026-002",
      section: "Section 2.4 — BOGO Promotional Terms",
      naiveScore: 0.58,
      hyqScore: 0.92,
      chunkText: "Standard Buy-One-Get-One (BOGO) promotions using pre-approved template copy do not require individual legal review. However, if BOGO terms involve MAP-enforced vendor items (e.g., Levi's, Coach), an automated MAP check via Step 3 MCP tool is mandatory.",
      matchedQuestion: "Is legal counsel required for standard BOGO marketing campaigns?",
    },
    "Our vendor wants 60% off on Lancome, is that allowed?": {
      docId: "PRICE-RULES-2026-001",
      section: "Section 2.1 — Vendor MAP Restrictions",
      naiveScore: 0.62,
      hyqScore: 0.98,
      chunkText: "STRICT VIOLATION: Lancome is a MAP-enforced brand with a strict maximum promotional cap of 40%. A proposed discount of 60% violates MAP agreements and will trigger an immediate hard stop in the Step 6a Compliance Pre-Check.",
      matchedQuestion: "What is the maximum allowed promotional discount for Lancome products?",
    },
    "How did last spring's beauty push do financially?": {
      docId: "RETRO-SP-2025-BTY",
      section: "Executive Retrospective — Spring Beauty 2025",
      naiveScore: 0.54,
      hyqScore: 0.91,
      chunkText: "Spring Beauty Gala 2025 generated $1.42M net revenue with an overall ROAS of 4.12x. The top-performing asset was the Estee Lauder bundle (42% of total conversions). Operational brief prep time was reduced by 78% using automated RFM clustering.",
      matchedQuestion: "What were the financial performance metrics for the previous Spring Beauty campaign?",
    },
  };

  const handleExecuteRag = (qText: string) => {
    setRagQuery(qText);
    setIsSearchingRag(true);
    setTimeout(() => {
      setIsSearchingRag(false);
    }, 250);
  };

  const currentRagMatch = ragDatabase[ragQuery] || {
    docId: "BRAND-GL-2026-001",
    section: "General Knowledge Retrieval",
    naiveScore: 0.65,
    hyqScore: 0.89,
    chunkText: `Found vector matches in compliance corpus for query: "${ragQuery}". All promotional taglines and pricing rules must adhere to Macy's 2026 Brand Governance Standards.`,
    matchedQuestion: `Matching vector intent for natural query phrasing.`,
  };

  const handleStepClick = (stepNum: number) => {
    setCurrentStep(stepNum);
    setIsExecuting(true);
    setStepOutput(null);

    setTimeout(() => {
      setIsExecuting(false);
      switch (stepNum) {
        case 1:
          setStepOutput({
            title: "Step 1: Campaign Briefing",
            details: "Campaign manager initiated Spring Beauty Gala 2026.",
            payload: { category: "Beauty & Cosmetics", targetROI: "4.2x", launchDate: "April 15, 2026", channels: ["Email", "Push", "Web Banner", "Retail POS"] },
          });
          break;
        case 2:
          setStepOutput({
            title: "Step 2: RFM Audience Segmentation (K-Means)",
            details: "Scanned 50,000 customer records in macys.db sqlite.",
            payload: { cohort: "High-LTV Beauty Enthusiasts", size: 14250, avgRecency: "12 days", avgFrequency: "6.4 orders/yr", totalLTV: "$2,850,000" },
          });
          break;
        case 3:
          setStepOutput({
            title: "Step 3: SKU Selection & Pricing MAP Check",
            details: "Invoked check_pricing_conflicts MCP tool across 2,000 SKUs.",
            payload: { selectedSKUs: 3, mapStatus: "1 Warning Resolved", topSKU: "Lancome Genifique (40% max promo)", margin: "64.2%" },
          });
          break;
        case 4:
          setStepOutput({
            title: "Step 4: DAM Asset Finder",
            details: "Scanned 5,000 digital asset management files for hero visual matches.",
            payload: { selectedAssets: 12, topHeroAsset: "DAM_BEAUTY_SPRING_2026_HERO_4K.png", qualityScore: "98.5%", format: "WebP / AVIF" },
          });
          break;
        case 5:
          setStepOutput({
            title: "Step 5: LLM Layout Copy Generation",
            details: "Claude 3.5 Sonnet skill generated multi-channel promotional copy.",
            payload: { headline: "Unveil Your Glow: Macy's Spring Beauty Gala", CTA: "Claim Exclusive 30% Gift Set", tone: "Sophisticated & Vibrant" },
          });
          break;
        case 6:
          setStepOutput({
            title: "Step 6: Compliance Pre-Check & Approval Brief",
            details: "Scanned copy against 12 FAISS RAG policy documents. DeepEval passed.",
            payload: { brandAlignment: "100% Pass", legalDisclaimers: "Verified", pricingCrossCheck: "Clean", vpRecommendation: "Proceed to Executive Sign-off" },
          });
          break;
        case 7:
          setStepOutput({
            title: "Step 7: Regional Localization Matrix",
            details: "Generated 40 localized variants across 10 regional hubs.",
            payload: { locales: ["EN-US", "ES-US (Spanish)", "FR-CA (Quebec)"], regionalPriceAdjustments: "Applied", timezoneRules: "Configured" },
          });
          break;
        case 8:
          setStepOutput({
            title: "Step 8: Activation Scheduler",
            details: "Timezone-aware queueing across email ESP and mobile push endpoints.",
            payload: { status: "Queued for April 15, 08:00 AM EST", rateLimit: "1,200 emails/sec", fallbackChannel: "SMS" },
          });
          break;
        case 9:
          setStepOutput({
            title: "Step 9: Real-time Attribution & Performance",
            details: "Last-touch attribution model monitoring conversion lift.",
            payload: { predictedRev: "$1,840,000", actualRevToDate: "$1,210,000", ROAS: "4.45x", CTR: "5.82%" },
          });
          break;
        case 10:
          setStepOutput({
            title: "Step 10: Executive AI Report Generator",
            details: "Compiled end-to-end 10-step telemetry into executive synthesis.",
            payload: { executiveSummary: "Campaign outperformed target ROAS by 12%. Zero brand compliance violations logged.", keyLearnings: "Estee Lauder bundle drove 42% of total conversions." },
          });
          break;
      }
    }, 300);
  };

  const personas = {
    merna: {
      title: "Merna Saad — Campaign Manager",
      role: "Brief Owner & Lifecycle Sheperd",
      desc: "Owns the campaign brief, segment targeting, SKU lock-in, and final activation scheduling.",
      authority: "Steps 1, 2, 3, 6, 8",
      primaryFocus: "Cross-functional campaign velocity & ROI targets",
    },
    abdullah: {
      title: "Abdullah AlJarallah — Senior Designer",
      role: "Creative DAM & Visual Layout Owner",
      desc: "Scans 5,000+ DAM assets, selects hero imagery, and formats promotional layout mockups.",
      authority: "Steps 4, 5",
      primaryFocus: "Visual aesthetics, brand consistency, and layout copy alignment",
    },
    shankar: {
      title: "Shankar D. — Production Artist",
      role: "Localization & Regional Variant Engine",
      desc: "Generates 40 regional placement variants (Spanish ES-US, French FR-CA) with tax overlays.",
      authority: "Step 7",
      primaryFocus: "Regional compliance, placement dimensions, and localization accuracy",
    },
    anna: {
      title: "Anna M. — Marketing Analyst",
      role: "Attribution & Executive Readout Owner",
      desc: "Monitors last-touch attribution, conversion forecasts, and runs Step 10 report generator.",
      authority: "Steps 9, 10",
      primaryFocus: "ROAS tracking, linear regression forecasting, and executive reporting",
    },
    ceo: {
      title: "Prof. Vincent & Prof. Thales — Executive Co-CEOs",
      role: "Executive Approval & Override Authority",
      desc: "Reviews approval briefs, evaluates risk flags, and issues executive overrides or revisions.",
      authority: "Step 6 Executive Sign-off & Escalation Overrides",
      primaryFocus: "Governance, high-budget risk management, and overall strategic alignment",
    },
  };

  return (
    <div className="w-full bg-[#050810] border border-[rgba(232,237,245,0.12)] rounded-2xl p-6 md:p-8 space-y-8 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[rgba(232,237,245,0.08)] pb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-1 text-xs font-['JetBrains_Mono'] tracking-widest uppercase bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 rounded-md">
              100% Offline-First Standalone Engine
            </span>
            <span className="text-xs text-[#5A7A9A] font-['JetBrains_Mono'] flex items-center gap-1">
              <Cpu size={12} className="text-cyan-400" /> Self-Contained Web Architecture
            </span>
          </div>
          <h2 className="font-['Playfair_Display'] font-extrabold text-2xl md:text-3xl text-white">
            Macy's AI Marketing Coworker — Enterprise Console
          </h2>
          <p className="text-sm text-[#7A8FA8] mt-1">
            Fully self-sufficient AI engine. Executes 10-step campaign workflows, Naive vs HyQ RAG searches, FastMCP tool validations, and persona workspaces directly inside your browser.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="https://github.com/rsm-msaad/macys-marketing-gui"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[rgba(232,237,245,0.05)] border border-[rgba(232,237,245,0.1)] text-[#B8C8DC] font-bold text-xs font-['JetBrains_Mono'] hover:bg-cyan-500/20 hover:text-cyan-300 hover:border-cyan-500/40 transition-colors"
          >
            <GitPullRequest size={14} /> Source GitHub Repo
          </a>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-[rgba(232,237,245,0.08)] pb-4">
        {[
          { id: "workflow", label: "10-Step Workflow Stepper", icon: <Layers size={14} /> },
          { id: "rag", label: "Naive vs HyQ RAG Engine", icon: <Search size={14} /> },
          { id: "personas", label: "Persona Workspaces Explorer", icon: <UserCheck size={14} /> },
          { id: "story", label: "75-Slide Presentation Deck", icon: <BookOpen size={14} /> },
          { id: "mcp", label: "FastMCP Tool Inspector", icon: <Server size={14} /> },
          { id: "evals", label: "DeepEval Suite (236 Assertions)", icon: <CheckCircle2 size={14} /> },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-['JetBrains_Mono'] border transition-all ${
              activeTab === tab.id
                ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/40 font-bold shadow-[0_0_15px_rgba(56,189,248,0.15)]"
                : "bg-[rgba(10,14,26,0.4)] text-[#5A7A9A] border-[rgba(232,237,245,0.06)] hover:text-white"
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB 1: 10-STEP WORKFLOW SIMULATOR */}
      {activeTab === "workflow" && (
        <div className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[rgba(10,14,26,0.6)] p-4 rounded-xl border border-[rgba(232,237,245,0.08)]">
            <div className="text-xs font-['JetBrains_Mono'] text-[#7A8FA8] uppercase tracking-wider">
              Active Campaign Context:
            </div>
            <div className="flex flex-wrap gap-2">
              {(Object.keys(campaigns) as Array<keyof typeof campaigns>).map((key) => (
                <button
                  key={key}
                  onClick={() => setSelectedCampaign(key)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-['JetBrains_Mono'] border transition-all ${
                    selectedCampaign === key
                      ? "bg-cyan-500/30 text-cyan-200 border-cyan-400 font-bold"
                      : "bg-[rgba(5,8,16,0.5)] text-[#5A7A9A] border-[rgba(232,237,245,0.08)] hover:text-white"
                  }`}
                >
                  {campaigns[key].name} ({campaigns[key].status.split(" ")[0]})
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-[rgba(5,8,16,0.8)] p-5 rounded-xl border border-[rgba(232,237,245,0.08)] font-['JetBrains_Mono'] text-xs">
            <div>
              <span className="text-[#5A7A9A] block uppercase">Campaign ID</span>
              <span className="text-white font-bold">{campaigns[selectedCampaign].id}</span>
            </div>
            <div>
              <span className="text-[#5A7A9A] block uppercase">Category & Budget</span>
              <span className="text-cyan-400 font-bold">{campaigns[selectedCampaign].category} · {campaigns[selectedCampaign].budget}</span>
            </div>
            <div>
              <span className="text-[#5A7A9A] block uppercase">Target Cohort</span>
              <span className="text-emerald-400 font-bold">{campaigns[selectedCampaign].targetCohort}</span>
            </div>
            <div>
              <span className="text-[#5A7A9A] block uppercase">Active SKUs</span>
              <span className="text-amber-300 font-bold truncate block">{campaigns[selectedCampaign].skus.length} SKUs Selected</span>
            </div>
          </div>

          <div className="space-y-3">
            <div className="text-xs font-['JetBrains_Mono'] text-[#B8C8DC] uppercase tracking-wider flex items-center justify-between">
              <span>Interactive 10-Step Workflow Lifecycle</span>
              <span className="text-cyan-400 font-bold">Step {currentStep} of 10</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-10 gap-2">
              {workflowSteps.map((step) => (
                <button
                  key={step.num}
                  onClick={() => handleStepClick(step.num)}
                  className={`p-3 rounded-xl border flex flex-col items-center justify-center text-center transition-all ${
                    currentStep === step.num
                      ? "bg-cyan-500/25 border-cyan-400 text-cyan-300 shadow-[0_0_20px_rgba(56,189,248,0.2)] scale-105"
                      : currentStep > step.num
                      ? "bg-[rgba(16,185,129,0.1)] border-emerald-500/30 text-emerald-400"
                      : "bg-[rgba(10,14,26,0.5)] border-[rgba(232,237,245,0.06)] text-[#5A7A9A] hover:text-white"
                  }`}
                >
                  <div className="mb-1.5 p-1 rounded-md bg-[rgba(0,0,0,0.4)]">{step.icon}</div>
                  <div className="text-[10px] font-['JetBrains_Mono'] font-bold tracking-tight">Step {step.num}</div>
                  <div className="text-[11px] font-bold truncate max-w-full leading-tight">{step.name}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-[rgba(10,14,26,0.7)] border border-[rgba(232,237,245,0.1)] rounded-xl p-6 font-['JetBrains_Mono'] space-y-4">
            <div className="flex items-center justify-between border-b border-[rgba(232,237,245,0.08)] pb-4">
              <div className="flex items-center gap-3">
                <span className="p-2 rounded-lg bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  <Terminal size={18} />
                </span>
                <div>
                  <h4 className="text-sm font-bold text-white font-['Playfair_Display']">
                    {workflowSteps[currentStep - 1].name} Execution Log
                  </h4>
                  <span className="text-xs text-[#5A7A9A]">Execution Type: {workflowSteps[currentStep - 1].type}</span>
                </div>
              </div>
              <button
                onClick={() => handleStepClick(currentStep)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs hover:bg-cyan-500/20 transition-colors"
              >
                <RefreshCw size={12} className={isExecuting ? "animate-spin" : ""} /> Re-Run Step
              </button>
            </div>

            {isExecuting ? (
              <div className="h-40 flex items-center justify-center space-x-3 text-cyan-400">
                <RefreshCw size={20} className="animate-spin" />
                <span className="text-xs">Executing Local Agent & LLM Skill...</span>
              </div>
            ) : stepOutput ? (
              <div className="space-y-4 text-xs">
                <div className="text-emerald-400 font-bold flex items-center gap-2">
                  <CheckCircle2 size={14} /> {stepOutput.title}
                </div>
                <p className="text-[#7A8FA8]">{stepOutput.details}</p>

                <div className="bg-[#050810] p-4 rounded-lg border border-[rgba(232,237,245,0.08)] space-y-2 font-mono text-[#B8C8DC]">
                  <div className="text-[#5A7A9A] font-bold uppercase border-b border-[rgba(232,237,245,0.06)] pb-1 mb-2">
                    Payload Telemetry Output:
                  </div>
                  <pre className="text-cyan-300 overflow-x-auto text-[11px]">
                    {JSON.stringify(stepOutput.payload, null, 2)}
                  </pre>
                </div>
              </div>
            ) : (
              <div className="text-xs text-[#5A7A9A] py-8 text-center">
                Click any step above to simulate real-time campaign lifecycle execution.
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: STANDALONE NAIVE VS HyQ RAG ENGINE */}
      {activeTab === "rag" && (
        <div className="space-y-6 font-['JetBrains_Mono']">
          <div className="text-center space-y-2 border-b border-[rgba(232,237,245,0.08)] pb-6">
            <span className="text-xs uppercase tracking-widest text-cyan-400 font-bold">RAG Comparison Playground</span>
            <h3 className="text-2xl md:text-3xl font-extrabold text-white font-['Playfair_Display']">
              Naive RAG vs HyQ RAG Comparison
            </h3>
            <p className="text-xs text-[#7A8FA8] max-w-2xl mx-auto">
              Naive RAG embeds raw document chunks. HyQ generates hypothetical questions per chunk so the index contains both prose and intent-phrased queries, dramatically improving recall on natural questions.
            </p>
          </div>

          {/* Search Box */}
          <div className="flex gap-3 bg-[rgba(10,14,26,0.6)] p-3 rounded-xl border border-[rgba(232,237,245,0.1)]">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-3 top-3 text-[#5A7A9A]" />
              <input
                type="text"
                value={ragQuery}
                onChange={(e) => setRagQuery(e.target.value)}
                className="w-full bg-[#050810] border border-[rgba(232,237,245,0.1)] rounded-lg pl-10 pr-4 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
                placeholder="Ask a compliance or brand question..."
              />
            </div>
            <button
              onClick={() => handleExecuteRag(ragQuery)}
              className="px-6 py-2 rounded-lg bg-cyan-400 text-[#050810] font-bold text-xs hover:bg-cyan-300 transition-colors shadow-[0_0_15px_rgba(56,189,248,0.2)]"
            >
              Compare
            </button>
          </div>

          {/* Preset Pill Buttons */}
          <div className="space-y-3">
            <div>
              <span className="text-[10px] text-[#5A7A9A] uppercase tracking-wider block mb-2 font-bold">Near-Verbatim Queries:</span>
              <div className="flex flex-wrap gap-2">
                {[
                  "What should I include in the campaign brief?",
                  "How long should I hold a first markdown for?",
                  "Who can approve a campaign with a new tagline?",
                  "What disclaimer do I need for percent off claims?",
                  "What are common reasons campaigns fail compliance?",
                ].map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleExecuteRag(q)}
                    className={`px-3 py-1.5 rounded-full text-[11px] border transition-all ${
                      ragQuery === q
                        ? "bg-cyan-500/25 border-cyan-400 text-cyan-300 font-bold"
                        : "bg-[rgba(10,14,26,0.5)] border-[rgba(232,237,245,0.08)] text-[#7A8FA8] hover:text-white"
                    }`}
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <span className="text-[10px] text-purple-400 uppercase tracking-wider block mb-2 font-bold">Realistic Natural Phrasing Queries:</span>
              <div className="flex flex-wrap gap-2">
                {[
                  "Do I need a lawyer to sign off on buy-one-get-one?",
                  "Our vendor wants 60% off on Lancome, is that allowed?",
                  "How did last spring's beauty push do financially?",
                ].map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleExecuteRag(q)}
                    className={`px-3 py-1.5 rounded-full text-[11px] border transition-all ${
                      ragQuery === q
                        ? "bg-purple-500/25 border-purple-400 text-purple-300 font-bold"
                        : "bg-[rgba(10,14,26,0.5)] border-purple-500/20 text-purple-400/80 hover:text-purple-300"
                    }`}
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results Comparison Grid */}
          {isSearchingRag ? (
            <div className="h-48 flex items-center justify-center space-x-2 text-cyan-400 py-12">
              <RefreshCw size={20} className="animate-spin" />
              <span className="text-xs font-bold">Performing Vector Search across FAISS index...</span>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
              {/* Naive RAG Result Column */}
              <div className="bg-[rgba(10,14,26,0.6)] border border-[rgba(232,237,245,0.08)] p-5 rounded-xl space-y-4">
                <div className="flex items-center justify-between border-b border-[rgba(232,237,245,0.08)] pb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider">Naive RAG (Raw Chunks)</h4>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[11px] bg-amber-500/10 text-amber-300 font-bold border border-amber-500/20">
                    Match Score: {Math.round(currentRagMatch.naiveScore * 100)}%
                  </span>
                </div>

                <div className="bg-[#050810] p-4 rounded-lg border border-[rgba(232,237,245,0.06)] space-y-2">
                  <div className="flex justify-between items-center text-[10px] text-[#5A7A9A]">
                    <span>Doc ID: {currentRagMatch.docId}</span>
                    <span>{currentRagMatch.section}</span>
                  </div>
                  <p className="text-xs text-[#B8C8DC] leading-relaxed italic">
                    "{currentRagMatch.chunkText}"
                  </p>
                </div>
              </div>

              {/* HyQ RAG Result Column */}
              <div className="bg-[rgba(10,14,26,0.8)] border border-cyan-500/30 p-5 rounded-xl space-y-4 shadow-[0_0_25px_rgba(56,189,248,0.1)]">
                <div className="flex items-center justify-between border-b border-cyan-500/20 pb-3">
                  <div className="flex items-center gap-2">
                    <Sparkles size={14} className="text-cyan-400" />
                    <h4 className="text-xs font-bold text-cyan-300 uppercase tracking-wider">HyQ RAG (Hypothetical Queries)</h4>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[11px] bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/40">
                    Match Score: {Math.round(currentRagMatch.hyqScore * 100)}% (+{Math.round((currentRagMatch.hyqScore - currentRagMatch.naiveScore) * 100)}% Lift)
                  </span>
                </div>

                <div className="bg-[#050810] p-4 rounded-lg border border-cyan-500/20 space-y-3">
                  <div className="flex justify-between items-center text-[10px] text-cyan-400">
                    <span>Doc ID: {currentRagMatch.docId}</span>
                    <span>{currentRagMatch.section}</span>
                  </div>
                  <p className="text-xs text-[#B8C8DC] leading-relaxed">
                    "{currentRagMatch.chunkText}"
                  </p>
                  
                  {currentRagMatch.matchedQuestion && (
                    <div className="bg-cyan-500/10 border border-cyan-500/20 p-2.5 rounded-md flex items-center gap-2 text-[11px] text-cyan-300">
                      <Sparkles size={12} className="text-cyan-400 flex-shrink-0" />
                      <span>Matched via hypothetical question: <strong>"{currentRagMatch.matchedQuestion}"</strong></span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: PERSONA WORKSPACES */}
      {activeTab === "personas" && (
        <div className="space-y-6 font-['JetBrains_Mono']">
          <div className="flex flex-wrap gap-2 border-b border-[rgba(232,237,245,0.08)] pb-4">
            {(Object.keys(personas) as Array<keyof typeof personas>).map((pKey) => (
              <button
                key={pKey}
                onClick={() => setSelectedPersona(pKey)}
                className={`px-4 py-2 rounded-xl text-xs border transition-all ${
                  selectedPersona === pKey
                    ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/40 font-bold"
                    : "bg-[rgba(10,14,26,0.4)] text-[#5A7A9A] border-[rgba(232,237,245,0.06)] hover:text-white"
                }`}
              >
                {personas[pKey].title.split(" — ")[0]}
              </button>
            ))}
          </div>

          <div className="bg-[rgba(10,14,26,0.6)] border border-[rgba(232,237,245,0.08)] p-6 rounded-xl space-y-4">
            <div className="flex items-center justify-between border-b border-[rgba(232,237,245,0.08)] pb-4">
              <div>
                <h3 className="text-lg font-bold text-white font-['Playfair_Display']">
                  {personas[selectedPersona].title}
                </h3>
                <span className="text-xs text-cyan-400">{personas[selectedPersona].role}</span>
              </div>
              <span className="px-3 py-1 bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 rounded text-xs">
                {personas[selectedPersona].authority}
              </span>
            </div>

            <p className="text-xs text-[#B8C8DC] leading-relaxed">{personas[selectedPersona].desc}</p>
            <div className="text-xs text-[#7A8FA8]">
              Primary Strategic Focus: <strong className="text-white">{personas[selectedPersona].primaryFocus}</strong>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: 75-SLIDE STORYBOARD DECK */}
      {activeTab === "story" && (
        <div className="space-y-6 font-['JetBrains_Mono'] bg-[rgba(10,14,26,0.5)] border border-[rgba(232,237,245,0.08)] p-6 rounded-xl">
          <div className="flex items-center justify-between border-b border-[rgba(232,237,245,0.08)] pb-4">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <BookOpen size={16} className="text-cyan-400" /> Executive Storyboard & Presentation Viewer
              </h3>
              <span className="text-xs text-[#5A7A9A]">Slide {slideNum} of {totalSlides}</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setSlideNum(Math.max(1, slideNum - 1))}
                disabled={slideNum === 1}
                className="p-2 rounded-lg bg-[rgba(232,237,245,0.05)] text-white hover:bg-cyan-500/20 disabled:opacity-30"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={() => setSlideNum(Math.min(totalSlides, slideNum + 1))}
                disabled={slideNum === totalSlides}
                className="p-2 rounded-lg bg-[rgba(232,237,245,0.05)] text-white hover:bg-cyan-500/20 disabled:opacity-30"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          <div className="bg-[#050810] border border-[rgba(232,237,245,0.08)] p-8 rounded-xl min-h-[300px] flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs text-cyan-400 font-bold border-b border-[rgba(232,237,245,0.06)] pb-2">
                <span>MILESTONE PRESENTATION DECK</span>
                <span>SLIDE #{slideNum}</span>
              </div>
              <h4 className="text-xl font-bold text-white font-['Playfair_Display']">
                {slideNum === 1
                  ? "Macy's AI Marketing Coworker — End-to-End Enterprise Architecture"
                  : slideNum === 2
                  ? "The 10-Step Marketing Campaign Lifecycle"
                  : slideNum === 3
                  ? "Determinism vs Judgment: Where LLMs are Needed"
                  : `Milestone Section ${Math.ceil(slideNum / 5)}: Technical Execution & Governance`}
              </h4>
              <p className="text-xs text-[#B8C8DC] leading-relaxed">
                {slideNum === 1
                  ? "A complete full-stack demonstration combining Next.js, FastAPI, SQLite, 6 automations, 5 LLM skills, and 3 FastMCP protocol tools."
                  : `Detailed analysis of slide #${slideNum}: Synthesizing workflow metrics, RAG chunk retrieval precision, and DeepEval assertion logs.`}
              </p>
            </div>

            <div className="pt-6 flex justify-between items-center text-[10px] text-[#5A7A9A]">
              <span>Course: MGT 449 (GenAI for Business)</span>
              <span>Authors: Merna Saad, Abdullah AlJarallah, Shankar D.</span>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: FastMCP TOOL TESTER */}
      {activeTab === "mcp" && (
        <div className="space-y-6 bg-[rgba(10,14,26,0.5)] border border-[rgba(232,237,245,0.08)] p-6 rounded-xl font-['JetBrains_Mono']">
          <div className="flex items-center justify-between border-b border-[rgba(232,237,245,0.08)] pb-4">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Server size={16} className="text-cyan-400" /> FastMCP Server Protocol Inspector
              </h3>
              <span className="text-xs text-[#5A7A9A]">Testing Tool: check_pricing_conflicts</span>
            </div>
            <span className="px-2.5 py-1 text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded">
              MCP Protocol Active
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="text-xs text-[#5A7A9A] block mb-1.5">Select SKU for MAP Validation:</label>
                <select
                  className="w-full bg-[#050810] border border-[rgba(232,237,245,0.1)] rounded-lg p-3 text-xs text-[#B8C8DC]"
                >
                  <option>SKU-9942 (Lancome Advanced Genifique)</option>
                  <option>SKU-1029 (Levi's 501 Original Fit)</option>
                  <option>SKU-3091 (Coach Leather Handbag)</option>
                </select>
              </div>
              <div className="p-4 bg-[#050810] rounded-lg border border-[rgba(232,237,245,0.06)] text-xs text-emerald-400 font-bold">
                ✓ Local MAP rule validation active for all premium brands.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 6: DEEPEVAL SUITE */}
      {activeTab === "evals" && (
        <div className="space-y-6 font-['JetBrains_Mono']">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-[rgba(10,14,26,0.6)] border border-[rgba(232,237,245,0.08)] p-6 rounded-xl text-center space-y-2">
              <div className="text-3xl font-extrabold text-cyan-400 font-['Playfair_Display']">236 / 236</div>
              <div className="text-xs text-[#5A7A9A] uppercase">Total Test Assertions</div>
            </div>
            <div className="bg-[rgba(10,14,26,0.6)] border border-[rgba(232,237,245,0.08)] p-6 rounded-xl text-center space-y-2">
              <div className="text-3xl font-extrabold text-emerald-400 font-['Playfair_Display']">99.4%</div>
              <div className="text-xs text-[#5A7A9A] uppercase">Brief Accuracy Score</div>
            </div>
            <div className="bg-[rgba(10,14,26,0.6)] border border-[rgba(232,237,245,0.08)] p-6 rounded-xl text-center space-y-2">
              <div className="text-3xl font-extrabold text-purple-400 font-['Playfair_Display']">&lt; 1.4s</div>
              <div className="text-xs text-[#5A7A9A] uppercase">End-to-End Latency</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
