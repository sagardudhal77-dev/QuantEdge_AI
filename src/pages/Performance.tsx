import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";

const pnlData = [
  { month: "Jan", profit: 4500, loss: -1200 },
  { month: "Feb", profit: 3200, loss: -2100 },
  { month: "Mar", profit: 5800, loss: -900 },
  { month: "Apr", profit: 2100, loss: -3400 },
  { month: "May", profit: 6700, loss: -1500 },
  { month: "Jun", profit: 4100, loss: -2800 },
];

const metrics = [
  { label: "Sharpe Ratio", value: "1.85", status: "excellent" },
  { label: "Sortino Ratio", value: "2.41", status: "excellent" },
  { label: "Profit Factor", value: "1.68", status: "good" },
  { label: "Expectancy", value: "$142.50", status: "good" },
  { label: "Recovery Factor", value: "4.2", status: "excellent" },
  { label: "Equity Volatility", value: "8.4%", status: "warning" },
];

export function Performance() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight text-white">Quantitative Analytics</h1>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
        {metrics.map((metric) => (
          <Card key={metric.label} className="bg-[#111111] border-white/5">
            <CardContent className="p-4 flex flex-col items-center justify-center text-center">
              <p className="text-xs text-gray-400 mb-1">{metric.label}</p>
              <p className="text-xl font-bold text-white">{metric.value}</p>
              <div className={`mt-2 h-1 w-full rounded-full ${
                metric.status === 'excellent' ? 'bg-emerald-500' : 
                metric.status === 'good' ? 'bg-blue-500' : 'bg-amber-500'
              }`} />
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card className="bg-[#111111] border-white/5">
          <CardHeader>
            <CardTitle>Monthly PnL Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={pnlData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                  <XAxis dataKey="month" stroke="#ffffff50" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#ffffff50" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip 
                    cursor={{ fill: '#ffffff05' }}
                    contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px', color: '#fff' }}
                  />
                  <Bar dataKey="profit" fill="#10b981" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="loss" fill="#ef4444" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#111111] border-white/5">
          <CardHeader>
            <CardTitle>Trade Clustering Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex h-[300px] items-center justify-center rounded-lg border border-dashed border-white/10 bg-white/5">
              <p className="text-sm text-gray-400">Advanced Scatter Plot Visualization Loading...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
