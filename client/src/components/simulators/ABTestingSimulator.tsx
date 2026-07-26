import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Calculator, Activity, Users, Percent, Sliders, CheckCircle } from "lucide-react";

export default function ABTestingSimulator() {
  const [baselineCR, setBaselineCR] = useState<number>(5.0); // %
  const [mdeLift, setMdeLift] = useState<number>(10.0); // % relative lift
  const [alpha, setAlpha] = useState<number>(0.05); // 5% significance
  const [power, setPower] = useState<number>(0.80); // 80% statistical power

  const calcResults = useMemo(() => {
    const p1 = baselineCR / 100;
    const p2 = p1 * (1 + mdeLift / 100);
    const delta = Math.abs(p2 - p1);

    // Z-scores lookup
    let zAlpha = 1.96; // for 0.05
    if (alpha === 0.01) zAlpha = 2.576;
    if (alpha === 0.10) zAlpha = 1.645;

    let zBeta = 0.842; // for 80% power
    if (power === 0.90) zBeta = 1.282;

    const pBar = (p1 + p2) / 2;
    const sampleSizePerVariant = delta > 0
      ? Math.ceil((2 * Math.pow(zAlpha + zBeta, 2) * pBar * (1 - pBar)) / Math.pow(delta, 2))
      : 0;

    const totalSampleSize = sampleSizePerVariant * 2;

    // Power curve data (Statistical Power vs Sample Size per variant)
    const curveData = [];
    const step = Math.max(100, Math.round(sampleSizePerVariant / 10));

    for (let n = step; n <= sampleSizePerVariant * 1.5; n += step) {
      // Calculate power for given n
      const se = Math.sqrt((2 * pBar * (1 - pBar)) / n);
      const zValue = (delta / se) - zAlpha;
      
      // Standard normal CDF approximation (erf based)
      const approxPower = Math.min(0.999, Math.max(0.05, 0.5 * (1 + Math.tanh(zValue * 0.797884 * (1 + 0.044715 * zValue * zValue)))));
      
      curveData.push({
        sampleSize: n,
        power: Math.round(approxPower * 100),
      });
    }

    return {
      p1Percent: p1 * 100,
      p2Percent: p2 * 100,
      sampleSizePerVariant,
      totalSampleSize,
      curveData,
    };
  }, [baselineCR, mdeLift, alpha, power]);

  return (
    <div className="w-full bg-[#050810] border border-[rgba(232,237,245,0.1)] rounded-2xl p-6 md:p-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[rgba(232,237,245,0.08)] pb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-1 text-xs font-['JetBrains_Mono'] tracking-widest uppercase bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 rounded">
              Frequentist Hypothesis Testing
            </span>
            <span className="text-xs text-[#5A7A9A] font-['JetBrains_Mono'] flex items-center gap-1">
              <Calculator size={12} className="text-cyan-400" /> Statistical Power & Sample Size Calculator
            </span>
          </div>
          <h2 className="font-['Playfair_Display'] font-extrabold text-2xl md:text-3xl text-white">
            A/B Test Sample Size & Statistical Power Engine
          </h2>
          <p className="text-sm text-[#7A8FA8] mt-1">
            Simulate required sample size per variant based on baseline conversion, MDE, significance level ($\alpha$), and power ($1-\beta$).
          </p>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Sliders */}
        <div className="lg:col-span-6 space-y-6 bg-[rgba(10,14,26,0.4)] border border-[rgba(232,237,245,0.08)] p-6 rounded-xl">
          <h3 className="text-sm font-['JetBrains_Mono'] text-[#B8C8DC] uppercase tracking-wider flex items-center gap-2">
            <Sliders size={14} className="text-cyan-400" /> Experiment Parameters
          </h3>

          {/* Baseline Conversion Rate Slider */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-['JetBrains_Mono']">
              <span className="text-[#5A7A9A]">Baseline Conversion Rate ($p_1$)</span>
              <span className="text-white font-bold">{baselineCR.toFixed(1)}%</span>
            </div>
            <input
              type="range"
              min="0.5"
              max="20.0"
              step="0.5"
              value={baselineCR}
              onChange={(e) => setBaselineCR(Number(e.target.value))}
              className="w-full h-2 bg-[#1A2333] rounded-lg appearance-none cursor-pointer accent-[#38BDF8]"
            />
          </div>

          {/* Minimum Detectable Effect (MDE) Slider */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-['JetBrains_Mono']">
              <span className="text-[#5A7A9A]">Minimum Detectable Effect (MDE % Lift)</span>
              <span className="text-white font-bold">+{mdeLift.toFixed(1)}% relative</span>
            </div>
            <input
              type="range"
              min="2.0"
              max="40.0"
              step="1.0"
              value={mdeLift}
              onChange={(e) => setMdeLift(Number(e.target.value))}
              className="w-full h-2 bg-[#1A2333] rounded-lg appearance-none cursor-pointer accent-[#818CF8]"
            />
          </div>

          {/* Significance Level (Alpha) Buttons */}
          <div className="space-y-2">
            <label className="text-xs text-[#5A7A9A] font-['JetBrains_Mono'] block">Significance Level ($\alpha$ / Type I Error)</label>
            <div className="grid grid-cols-3 gap-2">
              {[0.10, 0.05, 0.01].map((val) => (
                <button
                  key={val}
                  onClick={() => setAlpha(val)}
                  className={`py-2 px-3 rounded-lg text-xs font-['JetBrains_Mono'] border transition-all ${
                    alpha === val
                      ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/40"
                      : "bg-[#0A0E1A] text-[#5A7A9A] border-[rgba(232,237,245,0.08)] hover:text-white"
                  }`}
                >
                  $\alpha = {val}$
                </button>
              ))}
            </div>
          </div>

          {/* Statistical Power (1-Beta) Buttons */}
          <div className="space-y-2">
            <label className="text-xs text-[#5A7A9A] font-['JetBrains_Mono'] block">Target Statistical Power ($1-\beta$)</label>
            <div className="grid grid-cols-2 gap-2">
              {[0.80, 0.90].map((val) => (
                <button
                  key={val}
                  onClick={() => setPower(val)}
                  className={`py-2 px-3 rounded-lg text-xs font-['JetBrains_Mono'] border transition-all ${
                    power === val
                      ? "bg-indigo-500/20 text-indigo-300 border-indigo-500/40"
                      : "bg-[#0A0E1A] text-[#5A7A9A] border-[rgba(232,237,245,0.08)] hover:text-white"
                  }`}
                >
                  {(val * 100).toFixed(0)}% Power
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Output Cards & Power Curve */}
        <div className="lg:col-span-6 space-y-6 flex flex-col justify-between">
          {/* Main Sample Size Results */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[rgba(10,14,26,0.6)] border border-[rgba(232,237,245,0.08)] p-5 rounded-xl">
              <div className="text-xs text-[#5A7A9A] font-['JetBrains_Mono'] uppercase tracking-wider mb-1 flex items-center gap-1">
                <Users size={12} className="text-cyan-400" /> Per Variant Sample
              </div>
              <div className="text-2xl font-bold text-cyan-400 font-['Playfair_Display']">
                {calcResults.sampleSizePerVariant.toLocaleString()}
              </div>
              <div className="text-[10px] text-[#4A5A6A] font-['JetBrains_Mono'] mt-1">
                Users required per group
              </div>
            </div>

            <div className="bg-[rgba(10,14,26,0.6)] border border-[rgba(232,237,245,0.08)] p-5 rounded-xl">
              <div className="text-xs text-[#5A7A9A] font-['JetBrains_Mono'] uppercase tracking-wider mb-1 flex items-center gap-1">
                <Activity size={12} className="text-emerald-400" /> Total Test N
              </div>
              <div className="text-2xl font-bold text-emerald-400 font-['Playfair_Display']">
                {calcResults.totalSampleSize.toLocaleString()}
              </div>
              <div className="text-[10px] text-[#4A5A6A] font-['JetBrains_Mono'] mt-1">
                Control + Treatment combined
              </div>
            </div>
          </div>

          {/* Statistical Power Curve Chart */}
          <div className="bg-[rgba(10,14,26,0.4)] border border-[rgba(232,237,245,0.08)] p-6 rounded-xl">
            <h4 className="text-xs font-['JetBrains_Mono'] text-[#7A8FA8] uppercase tracking-wider mb-4">
              Statistical Power Curve vs. Sample Size
            </h4>
            <div className="h-44 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={calcResults.curveData} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(252,252,252,0.05)" />
                  <XAxis dataKey="sampleSize" stroke="#4A5A6A" fontSize={11} tickFormatter={(v) => `${(v / 1000).toFixed(1)}k`} />
                  <YAxis stroke="#4A5A6A" fontSize={11} domain={[0, 100]} tickFormatter={(v) => `${v}%`} />
                  <Tooltip
                    contentStyle={{ backgroundColor: "#0A0E1A", borderColor: "rgba(232,237,245,0.1)", borderRadius: "8px", color: "#fff" }}
                    formatter={(val: any) => [`${val}%`, "Power"]}
                  />
                  <Line type="monotone" dataKey="power" stroke="#38BDF8" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
