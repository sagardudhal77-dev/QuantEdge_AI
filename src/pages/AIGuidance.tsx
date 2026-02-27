import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card";
import { BotMessageSquare, Loader2, Sparkles, AlertCircle, CheckCircle, Target, ShieldAlert } from "lucide-react";
import { GoogleGenAI } from "@google/genai";

export function AIGuidance() {
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<string | null>(null);

  const generateAnalysis = async () => {
    setLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const prompt = `
        Act as a senior quantitative risk manager at a top-tier proprietary trading firm reviewing a trader's recent performance data.
        
        Trader Profile Data:
        - Win Rate: 68.5%
        - Profit Factor: 1.68
        - Max Drawdown: 4.2%
        - Discipline Score: 84/100
        - Recent Issue: Detected 3 instances of immediate re-entry after a stop-out (revenge trading) on XAUUSD.
        - Strength: Risk sizing remained perfectly consistent at 1% per trade during drawdown.
        
        Provide a structured, highly professional, direct, and analytical performance diagnosis. Do not use motivational fluff.
        
        Structure your response exactly like this (use markdown):
        
        ### Performance Diagnosis
        [Brief professional breakdown]
        
        ### What to STOP
        [Clear harmful behaviors]
        
        ### What to CONTINUE
        [Strengths backed by data]
        
        ### What to IMPROVE
        [Specific measurable improvements]
        
        ### Personalized Risk Framework
        [Tailored rules for max daily risk, drawdown, position sizing]
        
        ### 30-Day Tactical Plan
        [Actionable roadmap]
      `;

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
      });

      setAnalysis(response.text);
    } catch (error) {
      console.error("Failed to generate analysis:", error);
      setAnalysis("Error generating analysis. Please check your API key and connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <BotMessageSquare className="h-6 w-6 text-indigo-500" />
            AI Professional Trading Mentor
          </h1>
          <p className="text-sm text-gray-400 mt-1">Institutional-grade risk management and performance coaching.</p>
        </div>
        <button
          onClick={generateAnalysis}
          disabled={loading}
          className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500 disabled:opacity-50 transition-colors"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
          {loading ? "Analyzing Data..." : "Generate Deep Analysis"}
        </button>
      </div>

      {!analysis && !loading && (
        <Card className="bg-[#111111] border-white/5 border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-24 text-center">
            <BotMessageSquare className="h-12 w-12 text-gray-600 mb-4" />
            <h3 className="text-lg font-medium text-white">No Analysis Generated</h3>
            <p className="mt-2 text-sm text-gray-400 max-w-md">
              Click the button above to generate a comprehensive, data-backed performance review based on your recent trading activity.
            </p>
          </CardContent>
        </Card>
      )}

      {loading && (
        <Card className="bg-[#111111] border-white/5">
          <CardContent className="flex flex-col items-center justify-center py-24">
            <Loader2 className="h-8 w-8 animate-spin text-indigo-500 mb-4" />
            <p className="text-sm text-gray-400 animate-pulse">Processing quantitative and behavioral data...</p>
          </CardContent>
        </Card>
      )}

      {analysis && !loading && (
        <Card className="bg-[#111111] border-white/5">
          <CardContent className="p-8 prose prose-invert prose-indigo max-w-none">
            <div className="markdown-body text-gray-300 leading-relaxed" dangerouslySetInnerHTML={{ __html: analysis.replace(/\n/g, '<br/>').replace(/### (.*?)(<br\/>|$)/g, '<h3 class="text-lg font-semibold text-white mt-6 mb-3 border-b border-white/10 pb-2 flex items-center gap-2"><span class="text-indigo-400">■</span> $1</h3>').replace(/\*\*(.*?)\*\*/g, '<strong class="text-white">$1</strong>') }} />
          </CardContent>
        </Card>
      )}
    </div>
  );
}
