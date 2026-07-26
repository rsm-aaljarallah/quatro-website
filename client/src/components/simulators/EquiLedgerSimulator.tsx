import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CreditCard,
  Plus,
  Trash2,
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  Users,
  DollarSign,
  Share2,
  Zap,
  ShieldCheck,
  Smartphone,
  RefreshCw,
  Copy,
  Check,
} from "lucide-react";

type Participant = {
  id: string;
  name: string;
};

type Expense = {
  id: string;
  description: string;
  amountCents: number; // Stored in integer cents to prevent rounding errors
  paidBy: string; // Participant ID
  splitType: "equal" | "percentage" | "exact";
  splitDetails?: Record<string, number>;
};

export default function EquiLedgerSimulator() {
  const [participants, setParticipants] = useState<Participant[]>([
    { id: "p1", name: "Abdullah" },
    { id: "p2", name: "Merna" },
    { id: "p3", name: "Shankar" },
    { id: "p4", name: "Anna" },
  ]);

  const [expenses, setExpenses] = useState<Expense[]>([
    {
      id: "e1",
      description: "Team Dinner at Nobu",
      amountCents: 24000, // $240.00
      paidBy: "p1",
      splitType: "equal",
    },
    {
      id: "e2",
      description: "Airbnb Beach House (2 Nights)",
      amountCents: 80000, // $800.00
      paidBy: "p2",
      splitType: "equal",
    },
    {
      id: "e3",
      description: "Uber XL from Airport",
      amountCents: 6000, // $60.00
      paidBy: "p3",
      splitType: "equal",
    },
  ]);

  const [newDesc, setNewDesc] = useState<string>("");
  const [newAmount, setNewAmount] = useState<string>("");
  const [newPaidBy, setNewPaidBy] = useState<string>("p1");
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

  // Add new expense
  const handleAddExpense = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDesc.trim() || !newAmount || isNaN(Number(newAmount))) return;
    const cents = Math.round(parseFloat(newAmount) * 100);
    if (cents <= 0) return;

    const newExp: Expense = {
      id: `e${Date.now()}`,
      description: newDesc.trim(),
      amountCents: cents,
      paidBy: newPaidBy,
      splitType: "equal",
    };

    setExpenses([...expenses, newExp]);
    setNewDesc("");
    setNewAmount("");
  };

  const handleDeleteExpense = (id: string) => {
    setExpenses(expenses.filter((e) => e.id !== id));
  };

  // Compute Net Balances in Cents
  const balances = useMemo(() => {
    const netCents: Record<string, number> = {};
    participants.forEach((p) => (netCents[p.id] = 0));

    expenses.forEach((exp) => {
      const sharePerPerson = Math.floor(exp.amountCents / participants.length);
      const remainder = exp.amountCents % participants.length;

      // Payer gets credit for full amount paid
      netCents[exp.paidBy] += exp.amountCents;

      // Everyone owes their equal share
      participants.forEach((p, idx) => {
        // Distribute remainder cents to first few participants for exact sum
        const extraCent = idx < remainder ? 1 : 0;
        netCents[p.id] -= sharePerPerson + extraCent;
      });
    });

    return netCents;
  }, [participants, expenses]);

  // Greedy Debt Simplification Algorithm (n - 1 max transactions)
  const simplifiedDebts = useMemo(() => {
    const debtors: { id: string; name: string; amount: number }[] = [];
    const creditors: { id: string; name: string; amount: number }[] = [];

    participants.forEach((p) => {
      const bal = balances[p.id] || 0;
      if (bal < -1) {
        debtors.push({ id: p.id, name: p.name, amount: -bal });
      } else if (bal > 1) {
        creditors.push({ id: p.id, name: p.name, amount: bal });
      }
    });

    const transactions: { from: string; to: string; amountCents: number }[] = [];

    let i = 0;
    let j = 0;

    while (i < debtors.length && j < creditors.length) {
      const debtor = debtors[i];
      const creditor = creditors[j];

      const minAmount = Math.min(debtor.amount, creditor.amount);
      transactions.push({
        from: debtor.name,
        to: creditor.name,
        amountCents: minAmount,
      });

      debtor.amount -= minAmount;
      creditor.amount -= minAmount;

      if (debtor.amount <= 1) i++;
      if (creditor.amount <= 1) j++;
    }

    return transactions;
  }, [participants, balances]);

  const handleCopyShareLink = () => {
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="w-full bg-[#050810] border border-[rgba(232,237,245,0.12)] rounded-2xl p-6 md:p-8 space-y-8 shadow-[0_0_50px_rgba(0,0,0,0.5)] font-['JetBrains_Mono']">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[rgba(232,237,245,0.08)] pb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-1 text-xs tracking-widest uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-md font-bold">
              Account-Free & Frictionless
            </span>
            <span className="text-xs text-[#5A7A9A] flex items-center gap-1">
              <Zap size={12} className="text-emerald-400" /> Turso SQLite + Integer Cent Math
            </span>
          </div>
          <h2 className="font-['Playfair_Display'] font-extrabold text-2xl md:text-3xl text-white">
            EquiLedger — Interactive Debt Simplification Engine
          </h2>
          <p className="text-sm text-[#7A8FA8] mt-1 font-sans">
            Splitwise alternative with zero sign-up. Calculates real-time group balances with integer-cent accuracy and settles any group in at most $n-1$ transactions.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="https://equiledger.ajq8.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-400 text-[#050810] font-bold text-xs hover:bg-emerald-300 transition-colors shadow-[0_0_20px_rgba(52,211,153,0.25)]"
          >
            Launch equiledger.ajq8.com <ExternalLink size={14} />
          </a>
        </div>
      </div>

      {/* Group Controls & Share link */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[rgba(10,14,26,0.6)] p-4 rounded-xl border border-[rgba(232,237,245,0.08)]">
        <div className="flex items-center gap-3 text-xs">
          <Users size={16} className="text-cyan-400" />
          <span className="text-white font-bold">Active Group:</span>
          <div className="flex flex-wrap gap-1.5">
            {participants.map((p) => (
              <span key={p.id} className="px-2.5 py-1 rounded bg-[rgba(5,8,16,0.8)] border border-[rgba(232,237,245,0.1)] text-cyan-300 text-[11px]">
                {p.name}
              </span>
            ))}
          </div>
        </div>

        <button
          onClick={handleCopyShareLink}
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[rgba(232,237,245,0.05)] border border-[rgba(232,237,245,0.1)] text-[#B8C8DC] text-xs hover:bg-cyan-500/20 hover:text-cyan-300 transition-colors"
        >
          {copiedLink ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
          {copiedLink ? "Link Copied!" : "Share Instant Link"}
        </button>
      </div>

      {/* Main Grid: Add Expense + Expense List + Debt Simplification */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Add Expense & Ledger */}
        <div className="lg:col-span-7 space-y-6">
          {/* Add Expense Form */}
          <form onSubmit={handleAddExpense} className="bg-[rgba(10,14,26,0.6)] border border-[rgba(232,237,245,0.08)] p-5 rounded-xl space-y-4">
            <div className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Plus size={14} className="text-emerald-400" /> Add New Group Expense
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <input
                type="text"
                placeholder="Description (e.g. Dinner)"
                value={newDesc}
                onChange={(e) => setNewDesc(e.target.value)}
                className="bg-[#050810] border border-[rgba(232,237,245,0.1)] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-400"
              />
              <input
                type="number"
                step="0.01"
                placeholder="Amount ($)"
                value={newAmount}
                onChange={(e) => setNewAmount(e.target.value)}
                className="bg-[#050810] border border-[rgba(232,237,245,0.1)] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-400"
              />
              <select
                value={newPaidBy}
                onChange={(e) => setNewPaidBy(e.target.value)}
                className="bg-[#050810] border border-[rgba(232,237,245,0.1)] rounded-lg px-3 py-2 text-xs text-[#B8C8DC]"
              >
                {participants.map((p) => (
                  <option key={p.id} value={p.id}>
                    Paid by {p.name}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-bold hover:bg-emerald-500/30 transition-colors flex items-center justify-center gap-2"
            >
              <Plus size={14} /> Add Bill to Ledger
            </button>
          </form>

          {/* Expense History List */}
          <div className="space-y-3">
            <div className="text-xs text-[#7A8FA8] uppercase tracking-wider font-bold">
              Current Group Ledger ({expenses.length} Expenses)
            </div>

            <div className="space-y-2">
              {expenses.map((exp) => {
                const payer = participants.find((p) => p.id === exp.paidBy)?.name || "Unknown";
                return (
                  <div
                    key={exp.id}
                    className="bg-[rgba(5,8,16,0.8)] border border-[rgba(232,237,245,0.08)] p-4 rounded-xl flex items-center justify-between gap-4"
                  >
                    <div>
                      <div className="text-sm font-bold text-white font-['Playfair_Display']">{exp.description}</div>
                      <div className="text-xs text-[#7A8FA8]">
                        Paid by <span className="text-cyan-300 font-bold">{payer}</span> · Split Equally
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <span className="text-sm font-bold text-emerald-400">
                        ${(exp.amountCents / 100).toFixed(2)}
                      </span>
                      <button
                        onClick={() => handleDeleteExpense(exp.id)}
                        className="text-[#5A7A9A] hover:text-rose-400 transition-colors p-1"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Real-time Balances & Simplified Settlement */}
        <div className="lg:col-span-5 space-y-6">
          {/* Real-time Net Balances */}
          <div className="bg-[rgba(10,14,26,0.6)] border border-[rgba(232,237,245,0.08)] p-5 rounded-xl space-y-3">
            <div className="text-xs text-white font-bold uppercase tracking-wider flex items-center gap-2 border-b border-[rgba(232,237,245,0.08)] pb-3">
              <DollarSign size={14} className="text-cyan-400" /> Real-time Net Balances
            </div>

            <div className="space-y-2 text-xs">
              {participants.map((p) => {
                const net = (balances[p.id] || 0) / 100;
                const isPositive = net > 0.01;
                const isNegative = net < -0.01;

                return (
                  <div key={p.id} className="flex items-center justify-between p-2.5 bg-[#050810] rounded-lg border border-[rgba(232,237,245,0.06)]">
                    <span className="text-white font-bold">{p.name}</span>
                    <span
                      className={`font-bold ${
                        isPositive ? "text-emerald-400" : isNegative ? "text-rose-400" : "text-[#5A7A9A]"
                      }`}
                    >
                      {isPositive ? `+${net.toFixed(2)}` : isNegative ? `-${Math.abs(net).toFixed(2)}` : "$0.00"}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Greedy Settlement Algorithm Results */}
          <div className="bg-[rgba(10,14,26,0.8)] border border-emerald-500/30 p-5 rounded-xl space-y-4 shadow-[0_0_25px_rgba(52,211,153,0.1)]">
            <div className="flex items-center justify-between border-b border-emerald-500/20 pb-3">
              <div className="flex items-center gap-2">
                <ShieldCheck size={16} className="text-emerald-400" />
                <h4 className="text-xs font-bold text-emerald-300 uppercase tracking-wider">
                  Greedy Debt Simplification
                </h4>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/20 text-emerald-300 font-bold">
                Max {participants.length - 1} Transfers
              </span>
            </div>

            <p className="text-xs text-[#7A8FA8]">
              Minimal payments required to settle all group debts completely:
            </p>

            <div className="space-y-2">
              {simplifiedDebts.length === 0 ? (
                <div className="text-xs text-emerald-400 font-bold py-4 text-center">
                  ✓ All group balances are fully settled!
                </div>
              ) : (
                simplifiedDebts.map((tx, idx) => (
                  <div key={idx} className="bg-[#050810] p-3 rounded-lg border border-emerald-500/20 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2 text-[#B8C8DC]">
                      <span className="text-rose-400 font-bold">{tx.from}</span>
                      <ArrowRight size={12} className="text-[#5A7A9A]" />
                      <span className="text-emerald-400 font-bold">{tx.to}</span>
                    </div>
                    <span className="font-bold text-white">${(tx.amountCents / 100).toFixed(2)}</span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
