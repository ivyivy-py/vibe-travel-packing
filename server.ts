import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import handleHealth from "./api/health.js";
import handleLookupDestination from "./api/lookup-destination.js";
import handleTravelSearch from "./api/travel-search.js";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Mount modular API handlers located in /api folder under project main
  app.get("/api/health", handleHealth);
  app.post("/api/lookup-destination", handleLookupDestination);
  app.post("/api/travel-search", handleTravelSearch);

  // Vite middleware for development vs production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`VoyagePass server running on http://localhost:${PORT}`);
  });
}

startServer();
