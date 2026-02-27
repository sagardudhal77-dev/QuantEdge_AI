import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card";
import { ShieldAlert, AlertTriangle, CheckCircle2, TrendingDown, Activity } from "lucide-react";
import { ResponsiveContainer, ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Cell } from "recharts";

const riskData = [
  { risk: 0.5, return: 1.2, type: "win" },
  { risk: 1.0, return: 2.5, type: "win" },
  { risk: 1.5, return: -1.5, type: "loss" },
  { risk: 2.0, return: -2.0, type: "loss" },
  { risk: 0.8, return: 1.8, type: "win" },
  { risk: 1.2, return: -1.2, type: "loss" },
  { risk: 3.0, return: -3.0, type: "loss" }, // outlier
  { risk: 1.0, return: 2.0, type: "win" },
  { risk: 0.5, return: -0.5, type: "loss" },
  { risk: 1.5, return: 3.5, type: "win" },
];

export function Risk() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
          <ShieldAlert className="h-6 w-6 text-indigo-500" />
          Risk Diagnostics & Predictive Warnings
        </h1>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="col-span-2 bg-[#111111] border-white/5">
          <CardHeader>
            <CardTitle>Risk vs Return Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                  <XAxis type="number" dataKey="risk" name="Risk %" stroke="#ffffff50" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis type="number" dataKey="return" name="Return %" stroke="#ffffff50" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip cursor={{ strokeDasharray: '3 3' }} contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px', color: '#fff' }} />
                  <Scatter name="Trades" data={riskData}>
                    {riskData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.type === 'win' ? '#10b981' : '#ef4444'} />
                    ))}
                  </Scatter>
                </ScatterChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card className="bg-[#111111] border-white/5">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Risk of Ruin</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-emerald-400">0.02%</div>
              <p className="mt-1 text-xs text-gray-500">Probability of losing 50% of capital based on current metrics.</p>
            </CardContent>
          </Card>
          
          <Card className="bg-[#111111] border-white/5">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Max Daily Risk Limit</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">3.0%</div>
              <div className="mt-2 h-2 w-full rounded-full bg-white/10">
                <div className="h-2 rounded-full bg-indigo-500" style={{ width: '45%' }}></div>
              </div>
              <p className="mt-1 text-xs text-gray-500">Current daily exposure: 1.35%</p>
            </CardContent>
          </Card>
          
          <Card className="bg-[#111111] border-white/5 border-amber-500/20">
            <CardContent className="p-4 flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-amber-500 shrink-0" />
              <div>
                <h4 className="text-sm font-semibold text-amber-500">Predictive Warning</h4>
                <p className="mt-1 text-xs text-amber-200/80">
                  High probability of violating prop firm drawdown rules if current position sizing variance continues. Recommend standardizing lot sizes to 1% risk immediately.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
