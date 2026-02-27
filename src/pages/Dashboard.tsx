import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card";
import { ArrowUpRight, ArrowDownRight, Activity, TrendingUp, ShieldAlert, BrainCircuit } from "lucide-react";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

const equityData = [
  { date: "Jan", value: 100000 },
  { date: "Feb", value: 102500 },
  { date: "Mar", value: 101200 },
  { date: "Apr", value: 105800 },
  { date: "May", value: 104500 },
  { date: "Jun", value: 108900 },
  { date: "Jul", value: 112400 },
];

const stats = [
  { name: "Total Equity", value: "$112,400.00", change: "+12.4%", trend: "up", icon: Activity },
  { name: "Win Rate", value: "68.5%", change: "+2.1%", trend: "up", icon: TrendingUp },
  { name: "Max Drawdown", value: "4.2%", change: "-0.5%", trend: "down", icon: ShieldAlert },
  { name: "Discipline Score", value: "92/100", change: "+5", trend: "up", icon: BrainCircuit },
];

export function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight text-white">Dashboard Overview</h1>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-400">Last updated: Just now</span>
          <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.name} className="bg-[#111111] border-white/5">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <stat.icon className="h-4 w-4 text-gray-400" />
                  <p className="text-sm font-medium text-gray-400">{stat.name}</p>
                </div>
                <div className={`flex items-center text-xs font-medium ${
                  stat.trend === 'up' ? 'text-emerald-400' : 'text-rose-400'
                }`}>
                  {stat.trend === 'up' ? <ArrowUpRight className="mr-1 h-3 w-3" /> : <ArrowDownRight className="mr-1 h-3 w-3" />}
                  {stat.change}
                </div>
              </div>
              <div className="mt-4 flex items-baseline text-2xl font-semibold text-white">
                {stat.value}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="col-span-2 bg-[#111111] border-white/5">
          <CardHeader>
            <CardTitle>Equity Curve</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={equityData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#4f46e5" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                  <XAxis dataKey="date" stroke="#ffffff50" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#ffffff50" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value/1000}k`} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px', color: '#fff' }}
                    itemStyle={{ color: '#fff' }}
                  />
                  <Area type="monotone" dataKey="value" stroke="#4f46e5" strokeWidth={2} fillOpacity={1} fill="url(#colorValue)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#111111] border-white/5">
          <CardHeader>
            <CardTitle>AI Behavioral Alert</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-lg border border-amber-500/20 bg-amber-500/10 p-4">
              <div className="flex items-center gap-2 text-amber-500">
                <ShieldAlert className="h-5 w-5" />
                <h4 className="font-semibold">Risk Escalation Warning</h4>
              </div>
              <p className="mt-2 text-sm text-amber-200/80">
                Detected a 15% increase in position sizing following your last 2 consecutive losses. This pattern historically leads to a 3x higher drawdown probability.
              </p>
            </div>
            
            <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/10 p-4">
              <div className="flex items-center gap-2 text-emerald-500">
                <BrainCircuit className="h-5 w-5" />
                <h4 className="font-semibold">Strategy Consistency</h4>
              </div>
              <p className="mt-2 text-sm text-emerald-200/80">
                Your entry timing on EURUSD aligns perfectly with your backtested edge. Maintain current discipline.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
