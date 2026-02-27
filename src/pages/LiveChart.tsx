import { useParams } from "react-router-dom";
import { Card, CardContent } from "../components/ui/Card";
import TradingViewWidget from "../components/TradingViewWidget";
import { LineChart } from "lucide-react";

export function LiveChart() {
  const { symbol } = useParams<{ symbol: string }>();
  // Default to EURUSD if no symbol is provided, though the route requires it
  const displaySymbol = symbol ? symbol.toUpperCase() : "EURUSD";

  return (
    <div className="space-y-6 h-[calc(100vh-8rem)] flex flex-col">
      <div className="flex items-center justify-between shrink-0">
        <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
          <LineChart className="h-6 w-6 text-indigo-500" />
          Live Chart: {displaySymbol}
        </h1>
      </div>

      <Card className="flex-1 bg-[#111111] border-white/5 overflow-hidden flex flex-col">
        <CardContent className="p-0 flex-1">
          <TradingViewWidget symbol={displaySymbol} />
        </CardContent>
      </Card>
    </div>
  );
}
