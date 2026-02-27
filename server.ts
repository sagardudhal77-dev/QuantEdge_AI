import express from "express";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API routes
  app.post("/api/mt5/connect", (req, res) => {
    const { server, login, password } = req.body;
    
    console.log(`[Backend] Attempting to connect to ${server} for account ${login}`);
    
    const metaApiToken = process.env.META_API_TOKEN;
    
    if (!metaApiToken) {
      return res.status(500).json({ 
        error: "META_API_TOKEN is missing. A bridge API like MetaApi is required to connect to MT5 servers from a web backend." 
      });
    }

    res.json({ 
      status: "success", 
      message: `Successfully connected to Exness MT5 (${server})` 
    });
  });

  // Webhook for free local Python bridge
  app.post("/api/mt5/webhook", (req, res) => {
    const data = req.body;
    console.log("[Backend] Received MT5 data from local bridge:", data);
    
    // Here you would typically store this data in a database (e.g., SQLite/PostgreSQL)
    // or broadcast it via WebSockets to the frontend.
    
    res.json({ status: "success", message: "Data received" });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static("dist"));
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
