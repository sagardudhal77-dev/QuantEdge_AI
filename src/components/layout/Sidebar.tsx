import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  LineChart, 
  BrainCircuit, 
  Activity, 
  ShieldAlert, 
  BotMessageSquare, 
  Settings 
} from "lucide-react";
import { cn } from "../../utils/cn";

const navItems = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Performance", href: "/performance", icon: LineChart },
  { name: "Behavioral Analysis", href: "/behavioral", icon: BrainCircuit },
  { name: "Live Trades", href: "/live-trades", icon: Activity },
  { name: "Risk Diagnostics", href: "/risk", icon: ShieldAlert },
  { name: "AI Mentor", href: "/ai-mentor", icon: BotMessageSquare },
  { name: "Settings", href: "/settings", icon: Settings },
];

export function Sidebar() {
  const location = useLocation();

  return (
    <div className="flex h-screen w-64 flex-col border-r border-white/10 bg-[#0A0A0A] text-white">
      <div className="flex h-16 items-center px-6">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600">
            <Activity className="h-5 w-5 text-white" />
          </div>
          <span className="text-lg font-bold tracking-tight">QuantEdge AI</span>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="space-y-1 px-3">
          {navItems.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "group flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  isActive 
                    ? "bg-white/10 text-white" 
                    : "text-gray-400 hover:bg-white/5 hover:text-white"
                )}
              >
                <item.icon
                  className={cn(
                    "mr-3 h-5 w-5 flex-shrink-0",
                    isActive ? "text-indigo-400" : "text-gray-400 group-hover:text-gray-300"
                  )}
                  aria-hidden="true"
                />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>
      
      <div className="border-t border-white/10 p-4">
        <div className="flex items-center gap-3 rounded-md bg-white/5 p-3">
          <div className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]"></div>
          <div className="flex flex-col">
            <span className="text-xs font-medium text-white">MT5 Connected</span>
            <span className="text-[10px] text-gray-400">Latency: 12ms</span>
          </div>
        </div>
      </div>
    </div>
  );
}
