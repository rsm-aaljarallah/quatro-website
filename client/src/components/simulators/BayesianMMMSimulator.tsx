import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
} from "recharts";
import { DollarSign, TrendingUp, Sliders, Cpu, Activity, RefreshCw } from "lucide-react";

export default function BayesianMMMSimulator() {
  const [searchSpend, setSearchSpend] = useState<number>(45000);
  const [socialSpend, setSocialSpend] = useState<number>(35000);
  const [tvSpend, setTvSpend] = useState<number>(20000);
  const [adstockLambda, setAdstockLambda] = useState<number>(0.6); // 60% carryover

  // Model parameters (Simulated PyMC Bayesian MMM posterior means)
  const simulation = useMemo(() => {
    const totalSpend = searchSpend + socialSpend + tvSpend;
    
    // Saturation transformation (Hill function parameters)
    const searchRev = Math.pow(searchSpend / 1000, 0.78) * 4200 * (1 + adstockLambda * 0.15);
    const socialRev = Math.pow(socialSpend / 1000, 0.72) * 3800 * (1 + adstockLambda * 0.20);
    const tvRev = Math.pow(tvSpend / 1000, 0.58) * 4900 * (1 + adstockLambda * 0.35);
    const baseRevenue = 120000;
    
    const totalRevenue = baseRevenue + searchRev + socialRev + tvRev;
    const overallROAS = totalSpend > 0 ? (totalRevenue - baseRevenue) / totalSpend : 0;

    // Marginal ROAS (Derivative at current spend level)
    const searchmROAS = searchSpend > 0 ? (0.78 * searchRev) / searchSpend : 0;
    const socialmROAS = socialSpend > 0 ? (0.72 * socialRev) / socialSpend : 0;
    const tvmROAS = tvSpend > 0 ? (0.58 * tvRev) / tvSpend : 0;

    // Channel breakdown
    const channels = [
      { name: "Paid Search", spend: searchSpend, revenue: searchRev, roas: searchSpend > 0 ? searchRev / searchSpend : 0, mROAS: searchmROAS, color: "#38BDF8" },
      { name: "Social Media", spend: socialSpend, revenue: socialRev, roas: socialSpend > 0 ? socialRev / socialSpend : 0, mROAS: socialmROAS, color: "#818CF8" },
      { name: "Linear TV", spend: tvSpend, revenue: tvRev, roas: tvSpend > 0 ? tvRev / tvSpend : 0, mROAS: tvmROAS, color: "#F472B6" },
    ];

    // Weekly projection curve (8-week horizon with adstock decay)
    const weeklyData = [];
    let cumulativeAdstock = 0;
    const weeklySpend = totalSpend / 4;
    
    for (let w = 1; w <= 8; w++) {
      const currentWeekSpend = w <= 4 ? weeklySpend : 0;
      cumulativeAdstock = currentWeekSpend + cumulativeAdstock * adstockLambda;
      const weekRev = (baseRevenue / 4) + Math.pow(cumulativeAdstock / 1000, 0.7) * 3200;
      weeklyData.push({
        week: `W${w}`,
        Spend: Math.round(currentWeekSpend),
        Revenue: Math.round(weekRev),
        Adstock: Math.round(cumulativeAdstock),
      });
    }

    return {
      totalSpend,
      totalRevenue: Math.round(totalRevenue),
      incrementalRevenue: Math.round(totalRevenue - baseRevenue),
      overallROAS: overallROAS.toFixed(2),
      channels,
      weeklyData,
    };
  }, [searchSpend, socialSpend, tvSpend, adstockLambda]);

  const resetSpend = () => {
    setSearchSpend(45000);
    setSocialSpend(35000);
    setTvSpend(20000);
    setAdstockLambda(0.6);
  };

  return (
    <div className="w-full bg-[#050810] border border-[rgba(232,237,245,0.1)] rounded-2xl p-6 md:p-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[rgba(232,237,245,0.08)] pb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-1 text-xs font-['JetBrains_Mono'] tracking-widest uppercase bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 rounded">
              PyMC Bayesian MMM
            </span>
            <span className="text-xs text-[#5A7A9A] font-['JetBrains_Mono'] flex items-center gap-1">
              <Cpu size={12} className="text-cyan-400" /> Posterior Sampling Engine
            </span>
          </div>
          <h2 className="font-['Playfair_Display'] font-extrabold text-2xl md:text-3xl text-white">
            Media Mix Allocation & Saturation Simulator
          </h2>
          <p className="text-sm text-[#7A8FA8] mt-1">
            Simulate marketing spend allocation across channels, incorporating Hill function saturation and geometric adstock decay.
          </p>
        </div>

        <button
          onClick={resetSpend}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[rgba(232,237,245,0.05)] border border-[rgba(232,237,245,0.1)] text-[#B8C8DC] text-xs font-['JetBrains_Mono'] hover:bg-[rgba(232,237,245,0.1)] transition-colors w-fit"
        >
          <RefreshCw size={12} /> Reset Model
        </button>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[rgba(10,14,26,0.6)] border border-[rgba(232,237,245,0.08)] p-4 rounded-xl">
          <div className="text-xs text-[#5A7A9A] font-['JetBrains_Mono'] uppercase tracking-wider mb-1 flex items-center gap-1.5">
            <DollarSign size={12} className="text-cyan-400" /> Total Media Spend
          </div>
          <div className="text-2xl font-bold text-white font-['Playfair_Display']">
            ${simulation.totalSpend.toLocaleString()}
          </div>
        </div>

        <div className="bg-[rgba(10,14,26,0.6)] border border-[rgba(232,237,245,0.08)] p-4 rounded-xl">
          <div className="text-xs text-[#5A7A9A] font-['JetBrains_Mono'] uppercase tracking-wider mb-1 flex items-center gap-1.5">
            <TrendingUp size={12} className="text-emerald-400" /> Incremental Revenue
          </div>
          <div className="text-2xl font-bold text-emerald-400 font-['Playfair_Display']">
            +${simulation.incrementalRevenue.toLocaleString()}
          </div>
        </div>

        <div className="bg-[rgba(10,14,26,0.6)] border border-[rgba(232,237,245,0.08)] p-4 rounded-xl">
          <div className="text-xs text-[#5A7A9A] font-['JetBrains_Mono'] uppercase tracking-wider mb-1 flex items-center gap-1.5">
            <Activity size={12} className="text-indigo-400" /> Overall Model ROAS
          </div>
          <div className="text-2xl font-bold text-indigo-300 font-['Playfair_Display']">
            {simulation.overallROAS}x
          </div>
        </div>

        <div className="bg-[rgba(10,14,26,0.6)] border border-[rgba(232,237,245,0.08)] p-4 rounded-xl">
          <div className="text-xs text-[#5A7A9A] font-['JetBrains_Mono'] uppercase tracking-wider mb-1 flex items-center gap-1.5">
            <Sliders size={12} className="text-pink-400" /> Adstock Carryover ($\theta$)
          </div>
          <div className="text-2xl font-bold text-pink-300 font-['Playfair_Display']">
            {(adstockLambda * 100).toFixed(0)}%
          </div>
        </div>
      </div>

      {/* Main Grid: Controls & Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Sliders */}
        <div className="lg:col-span-5 space-y-6 bg-[rgba(10,14,26,0.4)] border border-[rgba(232,237,245,0.08)] p-6 rounded-xl">
          <h3 className="text-sm font-['JetBrains_Mono'] text-[#B8C8DC] uppercase tracking-wider flex items-center gap-2">
            <Sliders size={14} className="text-cyan-400" /> Media Channel Inputs
          </h3>

          {/* Paid Search Slider */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-['JetBrains_Mono']">
              <span className="text-[#38BDF8]">Paid Search</span>
              <span className="text-white">${searchSpend.toLocaleString()}</span>
            </div>
            <input
              type="range"
              min="0"
              max="100000"
              step="2500"
              value={searchSpend}
              onChange={(e) => setSearchSpend(Number(e.target.value))}
              className="w-full h-2 bg-[#1A2333] rounded-lg appearance-none cursor-pointer accent-[#38BDF8]"
            />
            <div className="flex justify-between text-[10px] text-[#4A5A6A] font-['JetBrains_Mono']">
              <span>$0</span>
              <span>mROAS: ${simulation.channels[0].mROAS.toFixed(2)}</span>
              <span>$100k</span>
            </div>
          </div>

          {/* Social Media Slider */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-['JetBrains_Mono']">
              <span className="text-[#818CF8]">Social Media</span>
              <span className="text-white">${socialSpend.toLocaleString()}</span>
            </div>
            <input
              type="range"
              min="0"
              max="100000"
              step="2500"
              value={socialSpend}
              onChange={(e) => setSocialSpend(Number(e.target.value))}
              className="w-full h-2 bg-[#1A2333] rounded-lg appearance-none cursor-pointer accent-[#818CF8]"
            />
            <div className="flex justify-between text-[10px] text-[#4A5A6A] font-['JetBrains_Mono']">
              <span>$0</span>
              <span>mROAS: ${simulation.channels[1].mROAS.toFixed(2)}</span>
              <span>$100k</span>
            </div>
          </div>

          {/* Linear TV Slider */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-['JetBrains_Mono']">
              <span className="text-[#F472B6]">Linear TV</span>
              <span className="text-white">${tvSpend.toLocaleString()}</span>
            </div>
            <input
              type="range"
              min="0"
              max="100000"
              step="2500"
              value={tvSpend}
              onChange={(e) => setTvSpend(Number(e.target.value))}
              className="w-full h-2 bg-[#1A2333] rounded-lg appearance-none cursor-pointer accent-[#F472B6]"
            />
            <div className="flex justify-between text-[10px] text-[#4A5A6A] font-['JetBrains_Mono']">
              <span>$0</span>
              <span>mROAS: ${simulation.channels[2].mROAS.toFixed(2)}</span>
              <span>$100k</span>
            </div>
          </div>

          {/* Adstock Decay Slider */}
          <div className="space-y-2 pt-2 border-t border-[rgba(232,237,245,0.08)]">
            <div className="flex justify-between text-xs font-['JetBrains_Mono']">
              <span className="text-[#A7F3D0]">Geometric Adstock ($\theta$)</span>
              <span className="text-white">{(adstockLambda * 100).toFixed(0)}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="0.9"
              step="0.05"
              value={adstockLambda}
              onChange={(e) => setAdstockLambda(Number(e.target.value))}
              className="w-full h-2 bg-[#1A2333] rounded-lg appearance-none cursor-pointer accent-[#A7F3D0]"
            />
            <p className="text-[11px] text-[#5A7A9A] leading-tight pt-1">
              Higher values model longer memory carryover effects of media impressions across subsequent weeks.
            </p>
          </div>
        </div>

        {/* Right Column: Visualizations */}
        <div className="lg:col-span-7 space-y-6 flex flex-col justify-between">
          {/* Channel ROAS Bar Chart */}
          <div className="bg-[rgba(10,14,26,0.4)] border border-[rgba(232,237,245,0.08)] p-6 rounded-xl">
            <h4 className="text-xs font-['JetBrains_Mono'] text-[#7A8FA8] uppercase tracking-wider mb-4">
              Channel ROAS Comparison
            </h4>
            <div className="h-44 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={simulation.channels} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(252,252,252,0.05)" />
                  <XAxis type="number" stroke="#4A5A6A" fontSize={11} tickFormatter={(v) => `${v.toFixed(1)}x`} />
                  <YAxis type="category" dataKey="name" stroke="#B8C8DC" fontSize={11} width={80} />
                  <Tooltip
                    contentStyle={{ backgroundColor: "#0A0E1A", borderColor: "rgba(232,237,245,0.1)", borderRadius: "8px", color: "#fff" }}
                    formatter={(val: any) => [`${Number(val).toFixed(2)}x`, "ROAS"]}
                  />
                  <Bar dataKey="roas" radius={[0, 4, 4, 0]}>
                    {simulation.channels.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Adstock Decay Horizon Chart */}
          <div className="bg-[rgba(10,14,26,0.4)] border border-[rgba(232,237,245,0.08)] p-6 rounded-xl">
            <h4 className="text-xs font-['JetBrains_Mono'] text-[#7A8FA8] uppercase tracking-wider mb-4">
              8-Week Adstock Horizon & Revenue Carryover
            </h4>
            <div className="h-44 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={simulation.weeklyData} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
                  <defs>
                    <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#38BDF8" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#38BDF8" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(252,252,252,0.05)" />
                  <XAxis dataKey="week" stroke="#4A5A6A" fontSize={11} />
                  <YAxis stroke="#4A5A6A" fontSize={11} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
                  <Tooltip
                    contentStyle={{ backgroundColor: "#0A0E1A", borderColor: "rgba(232,237,245,0.1)", borderRadius: "8px", color: "#fff" }}
                    formatter={(val: any) => [`$${Number(val).toLocaleString()}`, "Revenue"]}
                  />
                  <Area type="monotone" dataKey="Revenue" stroke="#38BDF8" strokeWidth={2} fillOpacity={1} fill="url(#colorRev)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
