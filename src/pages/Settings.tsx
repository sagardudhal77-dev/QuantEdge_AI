import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card";
import { Settings as SettingsIcon, Shield, Key, Database } from "lucide-react";

export function Settings() {
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
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5 text-gray-400" />
              MetaTrader 5 Integration
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400">Broker Server</label>
                <input type="text" className="w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500" placeholder="e.g., MetaQuotes-Demo" defaultValue="MetaQuotes-Demo" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400">Account Number</label>
                <input type="text" className="w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500" placeholder="12345678" defaultValue="10492810" />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <label className="text-sm font-medium text-gray-400">Investor Password (Read-Only)</label>
                <input type="password" className="w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500" placeholder="••••••••" defaultValue="password123" />
              </div>
            </div>
            <div className="flex justify-end">
              <button className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500">
                Connect Account
              </button>
            </div>
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
