/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import { Dashboard } from "./pages/Dashboard";
import { Performance } from "./pages/Performance";
import { Behavioral } from "./pages/Behavioral";
import { LiveTrades } from "./pages/LiveTrades";
import { Risk } from "./pages/Risk";
import { AIGuidance } from "./pages/AIGuidance";
import { Settings } from "./pages/Settings";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="performance" element={<Performance />} />
          <Route path="behavioral" element={<Behavioral />} />
          <Route path="live-trades" element={<LiveTrades />} />
          <Route path="risk" element={<Risk />} />
          <Route path="ai-mentor" element={<AIGuidance />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
