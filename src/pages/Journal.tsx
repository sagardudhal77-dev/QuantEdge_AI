import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card";
import { BookOpen, CheckSquare, Square, Save, Plus } from "lucide-react";

interface TradeJournalEntry {
  id: string;
  symbol: string;
  date: string;
  quantity: number;
  entryPrice: number;
  exitPrice: number | null;
  pnl: number | null;
  notes: string;
  checklist: {
    higherTimeframe: boolean;
    fitsPlan: boolean;
    keyLevel: boolean;
    economicCalendar: boolean;
    riskLimits: boolean;
  };
}

const initialTrades: TradeJournalEntry[] = [
  {
    id: "1",
    symbol: "EURUSD",
    date: "2026-02-27 09:15",
    quantity: 2.5,
    entryPrice: 1.08450,
    exitPrice: 1.08850,
    pnl: 1000,
    notes: "Saw a strong rejection at the 1.08400 support level. Entered after the 15m candle closed bullish.",
    checklist: {
      higherTimeframe: true,
      fitsPlan: true,
      keyLevel: true,
      economicCalendar: true,
      riskLimits: true,
    }
  },
  {
    id: "2",
    symbol: "XAUUSD",
    date: "2026-02-26 14:30",
    quantity: 0.5,
    entryPrice: 2045.50,
    exitPrice: null,
    pnl: null,
    notes: "Gold is consolidating. Taking a speculative short position based on the 1H bearish divergence.",
    checklist: {
      higherTimeframe: true,
      fitsPlan: false,
      keyLevel: true,
      economicCalendar: false,
      riskLimits: true,
    }
  }
];

export function Journal() {
  const [trades, setTrades] = useState<TradeJournalEntry[]>(initialTrades);
  const [selectedTradeId, setSelectedTradeId] = useState<string>(initialTrades[0].id);

  const selectedTrade = trades.find(t => t.id === selectedTradeId);

  const handleNoteChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!selectedTrade) return;
    setTrades(trades.map(t => t.id === selectedTrade.id ? { ...t, notes: e.target.value } : t));
  };

  const toggleChecklist = (key: keyof TradeJournalEntry['checklist']) => {
    if (!selectedTrade) return;
    setTrades(trades.map(t => {
      if (t.id === selectedTrade.id) {
        return {
          ...t,
          checklist: {
            ...t.checklist,
            [key]: !t.checklist[key]
          }
        };
      }
      return t;
    }));
  };

  const handleNewJournal = () => {
    const newTrade: TradeJournalEntry = {
      id: Date.now().toString(),
      symbol: "NEW",
      date: new Date().toISOString().slice(0, 16).replace('T', ' '),
      quantity: 0,
      entryPrice: 0,
      exitPrice: null,
      pnl: null,
      notes: "",
      checklist: {
        higherTimeframe: false,
        fitsPlan: false,
        keyLevel: false,
        economicCalendar: false,
        riskLimits: false,
      }
    };
    setTrades([newTrade, ...trades]);
    setSelectedTradeId(newTrade.id);
  };

  return (
    <div className="space-y-6 h-[calc(100vh-8rem)] flex flex-col">
      <div className="flex items-center justify-between shrink-0">
        <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
          <BookOpen className="h-6 w-6 text-indigo-500" />
          Trade Journal
        </h1>
        <button 
          onClick={handleNewJournal}
          className="flex items-center gap-2 rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500 transition-colors"
        >
          <Plus className="h-4 w-4" />
          New Entry
        </button>
      </div>

      <div className="flex gap-6 flex-1 min-h-0">
        {/* Left Sidebar - Trade List */}
        <Card className="w-1/3 bg-[#111111] border-white/5 flex flex-col overflow-hidden">
          <CardHeader className="pb-3 shrink-0 border-b border-white/5">
            <CardTitle className="text-lg">Recent Trades</CardTitle>
          </CardHeader>
          <div className="overflow-y-auto flex-1 p-3 space-y-2">
            {trades.map(trade => (
              <button
                key={trade.id}
                onClick={() => setSelectedTradeId(trade.id)}
                className={`w-full text-left p-3 rounded-lg border transition-colors ${
                  selectedTradeId === trade.id 
                    ? 'bg-indigo-500/10 border-indigo-500/30' 
                    : 'bg-white/5 border-transparent hover:bg-white/10'
                }`}
              >
                <div className="flex justify-between items-center mb-1">
                  <span className="font-semibold text-white">{trade.symbol}</span>
                  <span className={`text-xs font-medium ${
                    trade.pnl === null ? 'text-gray-400' : trade.pnl >= 0 ? 'text-emerald-400' : 'text-rose-400'
                  }`}>
                    {trade.pnl === null ? 'OPEN' : trade.pnl >= 0 ? `+$${trade.pnl}` : `-$${Math.abs(trade.pnl)}`}
                  </span>
                </div>
                <div className="text-xs text-gray-400">{trade.date}</div>
              </button>
            ))}
          </div>
        </Card>

        {/* Right Content - Journal Details */}
        {selectedTrade ? (
          <Card className="flex-1 bg-[#111111] border-white/5 flex flex-col overflow-hidden">
            <CardHeader className="pb-4 shrink-0 border-b border-white/5 flex flex-row justify-between items-start">
              <div>
                <CardTitle className="text-xl flex items-center gap-3">
                  {selectedTrade.symbol}
                  <span className="text-sm font-normal text-gray-400 px-2 py-0.5 rounded bg-white/5">
                    {selectedTrade.date}
                  </span>
                </CardTitle>
              </div>
              <button className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
                <Save className="h-4 w-4" />
                Save Changes
              </button>
            </CardHeader>
            
            <div className="overflow-y-auto flex-1 p-6 space-y-8">
              {/* Trade Details */}
              <div className="grid grid-cols-4 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity (Lots)</label>
                  <input 
                    type="number" 
                    value={selectedTrade.quantity} 
                    onChange={(e) => setTrades(trades.map(t => t.id === selectedTrade.id ? { ...t, quantity: parseFloat(e.target.value) || 0 } : t))}
                    className="w-full bg-transparent border-b border-white/10 py-1 text-white focus:outline-none focus:border-indigo-500 transition-colors"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">Entry Price</label>
                  <input 
                    type="number" 
                    value={selectedTrade.entryPrice} 
                    onChange={(e) => setTrades(trades.map(t => t.id === selectedTrade.id ? { ...t, entryPrice: parseFloat(e.target.value) || 0 } : t))}
                    className="w-full bg-transparent border-b border-white/10 py-1 text-white focus:outline-none focus:border-indigo-500 transition-colors"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">Exit Price</label>
                  <input 
                    type="number" 
                    value={selectedTrade.exitPrice || ''} 
                    placeholder="Open"
                    onChange={(e) => setTrades(trades.map(t => t.id === selectedTrade.id ? { ...t, exitPrice: parseFloat(e.target.value) || null } : t))}
                    className="w-full bg-transparent border-b border-white/10 py-1 text-white focus:outline-none focus:border-indigo-500 transition-colors"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">PnL ($)</label>
                  <input 
                    type="number" 
                    value={selectedTrade.pnl || ''} 
                    placeholder="-"
                    onChange={(e) => setTrades(trades.map(t => t.id === selectedTrade.id ? { ...t, pnl: parseFloat(e.target.value) || null } : t))}
                    className={`w-full bg-transparent border-b border-white/10 py-1 focus:outline-none focus:border-indigo-500 transition-colors ${
                      selectedTrade.pnl === null ? 'text-white' : selectedTrade.pnl >= 0 ? 'text-emerald-400' : 'text-rose-400'
                    }`}
                  />
                </div>
              </div>

              {/* Pre-trade Checklist */}
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-white uppercase tracking-wider flex items-center gap-2">
                  <CheckSquare className="h-4 w-4 text-indigo-400" />
                  Pre-Trade Checklist
                </h3>
                <div className="grid grid-cols-2 gap-3 bg-white/[0.02] p-4 rounded-lg border border-white/5">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <div onClick={() => toggleChecklist('higherTimeframe')} className="text-indigo-500">
                      {selectedTrade.checklist.higherTimeframe ? <CheckSquare className="h-5 w-5" /> : <Square className="h-5 w-5 text-gray-500 group-hover:text-gray-400" />}
                    </div>
                    <span className={`text-sm ${selectedTrade.checklist.higherTimeframe ? 'text-gray-300' : 'text-gray-500'}`}>Checked higher timeframe</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <div onClick={() => toggleChecklist('fitsPlan')} className="text-indigo-500">
                      {selectedTrade.checklist.fitsPlan ? <CheckSquare className="h-5 w-5" /> : <Square className="h-5 w-5 text-gray-500 group-hover:text-gray-400" />}
                    </div>
                    <span className={`text-sm ${selectedTrade.checklist.fitsPlan ? 'text-gray-300' : 'text-gray-500'}`}>Fits my trading plan</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <div onClick={() => toggleChecklist('keyLevel')} className="text-indigo-500">
                      {selectedTrade.checklist.keyLevel ? <CheckSquare className="h-5 w-5" /> : <Square className="h-5 w-5 text-gray-500 group-hover:text-gray-400" />}
                    </div>
                    <span className={`text-sm ${selectedTrade.checklist.keyLevel ? 'text-gray-300' : 'text-gray-500'}`}>Key level identified</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <div onClick={() => toggleChecklist('economicCalendar')} className="text-indigo-500">
                      {selectedTrade.checklist.economicCalendar ? <CheckSquare className="h-5 w-5" /> : <Square className="h-5 w-5 text-gray-500 group-hover:text-gray-400" />}
                    </div>
                    <span className={`text-sm ${selectedTrade.checklist.economicCalendar ? 'text-gray-300' : 'text-gray-500'}`}>Economic calendar checked</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <div onClick={() => toggleChecklist('riskLimits')} className="text-indigo-500">
                      {selectedTrade.checklist.riskLimits ? <CheckSquare className="h-5 w-5" /> : <Square className="h-5 w-5 text-gray-500 group-hover:text-gray-400" />}
                    </div>
                    <span className={`text-sm ${selectedTrade.checklist.riskLimits ? 'text-gray-300' : 'text-gray-500'}`}>Risk within limits</span>
                  </label>
                </div>
              </div>

              {/* Notes */}
              <div className="space-y-3 flex-1 flex flex-col">
                <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Trade Notes</h3>
                <textarea
                  value={selectedTrade.notes}
                  onChange={handleNoteChange}
                  placeholder="Take notes during trade... (e.g., emotional state, market conditions, reasons for entry/exit)"
                  className="w-full flex-1 min-h-[150px] rounded-lg border border-white/10 bg-white/5 p-4 text-sm text-gray-300 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 resize-none"
                />
              </div>
            </div>
          </Card>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            Select a trade to view details
          </div>
        )}
      </div>
    </div>
  );
}
