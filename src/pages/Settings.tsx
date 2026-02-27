import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card";
import { Settings as SettingsIcon, Shield, Key, Database, Loader2, AlertCircle, CheckCircle2, Terminal, Copy } from "lucide-react";

const exnessServers = [
  "Exness-MT5Trial",
  "Exness-MT5Trial2",
  "Exness-MT5Trial3",
  "Exness-MT5Trial4",
  "Exness-MT5Trial5",
  "Exness-MT5Trial6",
  "Exness-MT5Real",
  "Exness-MT5Real2",
  "Exness-MT5Real3",
  "Exness-MT5Real4",
  "Exness-MT5Real5",
  "Exness-MT5Real6",
  "Exness-MT5Real7",
  "Exness-MT5Real8",
  "Exness-MT5Real9",
  "Exness-MT5Real10",
  "Exness-MT5Real11",
  "Exness-MT5Real12",
];

export function Settings() {
  const [connectionMethod, setConnectionMethod] = useState<'cloud' | 'local'>('local');
  const [server, setServer] = useState("Exness-MT5Real");
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<{ type: 'success' | 'error' | null, message: string }>({ type: null, message: "" });
  const [copied, setCopied] = useState(false);

  const webhookUrl = `${window.location.origin}/api/mt5/webhook`;

  const pythonScript = `import MetaTrader5 as mt5
import requests
import time
import json

# Your unique Webhook URL
WEBHOOK_URL = "${webhookUrl}"

def send_data():
    if not mt5.initialize():
        print("initialize() failed, error code =", mt5.last_error())
        return

    account_info = mt5.account_info()
    if account_info is None:
        print("Failed to get account info")
        return

    # Gather account data
    data = {
        "equity": account_info.equity,
        "balance": account_info.balance,
        "margin": account_info.margin,
        "free_margin": account_info.margin_free,
        "profit": account_info.profit
    }

    try:
        response = requests.post(WEBHOOK_URL, json=data)
        print(f"Data sent successfully: {response.status_code}")
    except Exception as e:
        print("Error sending data:", e)

if __name__ == "__main__":
    print("Starting Free Local Bridge...")
    while True:
        send_data()
        time.sleep(5) # Send data every 5 seconds
`;

  const handleCopy = () => {
    navigator.clipboard.writeText(pythonScript);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleConnect = async () => {
    if (!login || !password) {
      setConnectionStatus({ type: 'error', message: "Please enter both Account Number and Investor Password." });
      return;
    }

    setIsConnecting(true);
    setConnectionStatus({ type: null, message: "" });

    try {
      const response = await fetch('/api/mt5/connect', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ server, login, password })
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || "Failed to connect to Exness MT5 server.");
      }
      
      setConnectionStatus({ type: 'success', message: data.message });
    } catch (error: any) {
      setConnectionStatus({ type: 'error', message: error.message });
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
          <SettingsIcon className="h-6 w-6 text-indigo-500" />
          Settings & Configuration
        </h1>
      </div>

      <div className="grid gap-6">
        <Card className="bg-[#111111] border-white/5">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5 text-gray-400" />
              MetaTrader 5 Integration
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            
            {/* Connection Method Tabs */}
            <div className="flex p-1 space-x-1 bg-white/5 rounded-lg">
              <button
                onClick={() => setConnectionMethod('local')}
                className={`flex-1 py-2.5 text-sm font-medium rounded-md transition-all ${
                  connectionMethod === 'local' 
                    ? 'bg-indigo-600 text-white shadow' 
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                Free Local Bridge (Python)
              </button>
              <button
                onClick={() => setConnectionMethod('cloud')}
                className={`flex-1 py-2.5 text-sm font-medium rounded-md transition-all ${
                  connectionMethod === 'cloud' 
                    ? 'bg-indigo-600 text-white shadow' 
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                Cloud API (MetaApi)
              </button>
            </div>

            {connectionMethod === 'local' ? (
              <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div className="rounded-md bg-indigo-500/10 border border-indigo-500/20 p-4 flex items-start gap-3">
                  <Terminal className="h-5 w-5 text-indigo-400 shrink-0 mt-0.5" />
                  <div className="text-sm text-indigo-200/90 leading-relaxed">
                    <strong className="text-indigo-300 block mb-1">How the Free Bridge Works:</strong>
                    MetaQuotes does not provide a free cloud API. To connect your MT5 terminal for free, you can run a small Python script on your computer alongside your MT5 terminal. This script reads your live data and securely sends it to this dashboard.
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-sm font-medium text-white">1. Install Requirements</h3>
                  <div className="bg-black/50 border border-white/10 rounded-md p-3 font-mono text-xs text-gray-300">
                    pip install MetaTrader5 requests
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-white">2. Run this Python Script</h3>
                    <button 
                      onClick={handleCopy}
                      className="flex items-center gap-1.5 text-xs text-indigo-400 hover:text-indigo-300 transition-colors"
                    >
                      {copied ? <CheckCircle2 className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                      {copied ? "Copied!" : "Copy Code"}
                    </button>
                  </div>
                  <div className="relative">
                    <pre className="bg-black/50 border border-white/10 rounded-md p-4 font-mono text-xs text-gray-300 overflow-x-auto">
                      <code>{pythonScript}</code>
                    </pre>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-sm font-medium text-white">3. Connection Status</h3>
                  <div className="flex items-center gap-3 p-4 rounded-md border border-white/10 bg-white/5">
                    <div className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
                    </div>
                    <span className="text-sm text-gray-300">Waiting for data from local bridge...</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                {connectionStatus.type === 'error' && (
                  <div className="rounded-md bg-rose-500/10 border border-rose-500/20 p-4 flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-rose-500 shrink-0 mt-0.5" />
                    <div className="text-sm text-rose-200/90">{connectionStatus.message}</div>
                  </div>
                )}
                
                {connectionStatus.type === 'success' && (
                  <div className="rounded-md bg-emerald-500/10 border border-emerald-500/20 p-4 flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                    <div className="text-sm text-emerald-200/90">{connectionStatus.message}</div>
                  </div>
                )}

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-400">Exness Server</label>
                    <select 
                      value={server}
                      onChange={(e) => setServer(e.target.value)}
                      className="w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 appearance-none"
                    >
                      {exnessServers.map(s => (
                        <option key={s} value={s} className="bg-[#111111]">{s}</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-400">Account Number</label>
                    <input 
                      type="text" 
                      value={login}
                      onChange={(e) => setLogin(e.target.value)}
                      className="w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500" 
                      placeholder="e.g., 10492810" 
                    />
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <label className="text-sm font-medium text-gray-400">Investor Password (Read-Only)</label>
                    <input 
                      type="password" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500" 
                      placeholder="••••••••" 
                    />
                  </div>
                </div>
                <div className="flex justify-end">
                  <button 
                    onClick={handleConnect}
                    disabled={isConnecting}
                    className="flex items-center gap-2 rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500 disabled:opacity-50 transition-colors"
                  >
                    {isConnecting && <Loader2 className="h-4 w-4 animate-spin" />}
                    {isConnecting ? "Connecting..." : "Connect Exness Account"}
                  </button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="bg-[#111111] border-white/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-gray-400" />
              Risk Parameters
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400">Max Daily Loss (%)</label>
                <input type="number" className="w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500" defaultValue="3.0" step="0.1" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400">Max Drawdown (%)</label>
                <input type="number" className="w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500" defaultValue="10.0" step="0.1" />
              </div>
            </div>
            <div className="flex justify-end">
              <button className="rounded-md bg-white/10 px-4 py-2 text-sm font-medium text-white hover:bg-white/20">
                Save Parameters
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
