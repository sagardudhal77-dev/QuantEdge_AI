import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card";
import { Activity, ArrowUpRight, ArrowDownRight, Clock } from "lucide-react";

const activeTrades = [
  { id: "1049281", symbol: "EURUSD", type: "BUY", lot: 2.5, entry: 1.08450, current: 1.08520, sl: 1.08200, tp: 1.09000, pnl: 175.00, risk: 1.2 },
  { id: "1049282", symbol: "XAUUSD", type: "SELL", lot: 0.5, entry: 2045.50, current: 2048.20, sl: 2055.00, tp: 2020.00, pnl: -135.00, risk: 0.8 },
  { id: "1049283", symbol: "GBPUSD", type: "BUY", lot: 1.0, entry: 1.26500, current: 1.26650, sl: 1.26000, tp: 1.27500, pnl: 150.00, risk: 1.0 },
];

export function LiveTrades() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
          <Activity className="h-6 w-6 text-indigo-500" />
          Live Active Trades
        </h1>
        <div className="flex items-center gap-2 rounded-full bg-white/5 px-3 py-1 text-sm text-gray-400">
          <Clock className="h-4 w-4" />
          Real-time Sync Active
        </div>
      </div>

      <Card className="bg-[#111111] border-white/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-400">
            <thead className="bg-white/5 text-xs uppercase text-gray-300">
              <tr>
                <th className="px-6 py-4 font-medium">Symbol</th>
                <th className="px-6 py-4 font-medium">Type</th>
                <th className="px-6 py-4 font-medium">Lot Size</th>
                <th className="px-6 py-4 font-medium">Entry Price</th>
                <th className="px-6 py-4 font-medium">Current Price</th>
                <th className="px-6 py-4 font-medium">SL / TP</th>
                <th className="px-6 py-4 font-medium">Risk %</th>
                <th className="px-6 py-4 font-medium text-right">Floating PnL</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {activeTrades.map((trade) => (
                <tr key={trade.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-6 py-4 font-medium text-white">{trade.symbol}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${
                      trade.type === 'BUY' ? 'bg-emerald-500/10 text-emerald-400 ring-emerald-500/20' : 'bg-rose-500/10 text-rose-400 ring-rose-500/20'
                    }`}>
                      {trade.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-white">{trade.lot.toFixed(2)}</td>
                  <td className="px-6 py-4 font-mono">{trade.entry.toFixed(5)}</td>
                  <td className="px-6 py-4 font-mono text-white">{trade.current.toFixed(5)}</td>
                  <td className="px-6 py-4 font-mono text-gray-500">
                    {trade.sl.toFixed(5)} / {trade.tp.toFixed(5)}
                  </td>
                  <td className="px-6 py-4">{trade.risk}%</td>
                  <td className={`px-6 py-4 text-right font-mono font-medium ${
                    trade.pnl >= 0 ? 'text-emerald-400' : 'text-rose-400'
                  }`}>
                    <div className="flex items-center justify-end gap-1">
                      {trade.pnl >= 0 ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
                      ${Math.abs(trade.pnl).toFixed(2)}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
