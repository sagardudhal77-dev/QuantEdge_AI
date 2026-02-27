import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card";
import { BrainCircuit, AlertTriangle, CheckCircle2, TrendingDown } from "lucide-react";

const behavioralPatterns = [
  {
    type: "Revenge Trading",
    status: "critical",
    description: "Detected 3 instances of immediate re-entry after a stop-out on XAUUSD within 5 minutes.",
    impact: "-$1,240.00",
    icon: AlertTriangle,
    color: "text-rose-500",
    bg: "bg-rose-500/10",
    border: "border-rose-500/20"
  },
  {
    type: "Fear-Based Early Exits",
    status: "warning",
    description: "Average hold time on winning trades is 40% shorter than backtested strategy parameters.",
    impact: "Missed +$3,100.00",
    icon: TrendingDown,
    color: "text-amber-500",
    bg: "bg-amber-500/10",
    border: "border-amber-500/20"
  },
  {
    type: "Strategy Consistency",
    status: "good",
    description: "Risk sizing remained perfectly consistent at 1% per trade during the last drawdown phase.",
    impact: "Protected Capital",
    icon: CheckCircle2,
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20"
  }
];

export function Behavioral() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight text-white">Behavioral Intelligence</h1>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="bg-[#111111] border-white/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BrainCircuit className="h-5 w-5 text-indigo-400" />
              Psychological Profile
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-400">Discipline Score</span>
                <span className="font-medium text-emerald-400">84/100</span>
              </div>
              <div className="h-2 w-full rounded-full bg-white/10">
                <div className="h-2 rounded-full bg-emerald-500" style={{ width: '84%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-400">Emotional Stability</span>
                <span className="font-medium text-amber-400">62/100</span>
              </div>
              <div className="h-2 w-full rounded-full bg-white/10">
                <div className="h-2 rounded-full bg-amber-500" style={{ width: '62%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-400">Risk Consistency</span>
                <span className="font-medium text-emerald-400">91/100</span>
              </div>
              <div className="h-2 w-full rounded-full bg-white/10">
                <div className="h-2 rounded-full bg-emerald-500" style={{ width: '91%' }}></div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="col-span-2 space-y-4">
          <h3 className="text-lg font-medium text-white">Detected Patterns</h3>
          {behavioralPatterns.map((pattern, idx) => (
            <div key={idx} className={`rounded-xl border p-5 ${pattern.bg} ${pattern.border}`}>
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div className={`mt-0.5 rounded-full p-1.5 ${pattern.bg}`}>
                    <pattern.icon className={`h-5 w-5 ${pattern.color}`} />
                  </div>
                  <div>
                    <h4 className={`font-semibold ${pattern.color}`}>{pattern.type}</h4>
                    <p className="mt-1 text-sm text-gray-300">{pattern.description}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">Impact</span>
                  <p className={`text-sm font-bold mt-0.5 ${pattern.color}`}>{pattern.impact}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
