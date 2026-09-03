import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

let aiClient: GoogleGenAI | null = null;

function getAI(): GoogleGenAI | null {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (key) {
      aiClient = new GoogleGenAI({ apiKey: key });
    }
  }
  return aiClient;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Health check
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", service: "VoyagePass Sovereign Advisory Engine" });
  });

  // Dynamic Destination & Consular Intelligence Endpoint
  app.post("/api/lookup-destination", async (req, res) => {
    const { location, startDate, endDate, passportNationality = "United States" } = req.body;

    if (!location) {
      return res.status(400).json({ error: "Location is required" });
    }

    try {
      const ai = getAI();
      if (ai) {
        const prompt = `You are a high-precision consular travel advisor and meteorological intelligence engine.
Analyze travel for:
- Destination: "${location}"
- Travel Dates: "${startDate || 'Upcoming'}" to "${endDate || '14 days later'}"
- Traveler Nationality: "${passportNationality}"

Determine:
1. Destination city and country.
2. The hemisphere (Northern or Southern) and corresponding SEASON during the specified travel dates (MUST be strictly one of: 'summer', 'autumn', 'winter', 'spring').
   - In Northern hemisphere: Mar-May is spring, Jun-Aug is summer, Sep-Nov is autumn, Dec-Feb is winter.
   - In Southern hemisphere: Dec-Feb is summer, Mar-May is autumn, Jun-Aug is winter, Sep-Nov is spring.
   - If tropical sunny climate, designate the seasonal weather accordingly.
3. Consular entry rules for ${passportNationality} citizens (visa-free duration or e-Visa/ETA requirements).
4. Typical climate during that season (temperature in Celsius, feels-like, rainfall in mm, solar hours, sunrise/sunset, UV index, concise atmospheric overview).
5. 7-day realistic forecast for that season.
6. 6 curated packing items for that season.
7. 2 major authentic seasonal events or cultural celebrations in that destination during that travel window.

Return strictly valid JSON with this exact schema:
{
  "city": string,
  "country": string,
  "countryFlag": string,
  "airportCode": string,
  "season": "summer" | "autumn" | "winter" | "spring",
  "entryStatusSummary": string,
  "entryStatusSubtext": string,
  "typicalClimateTempC": number,
  "typicalClimateDesc": string,
  "seasonalPeakTitle": string,
  "seasonalPeakSubtext": string,
  "culturalEventsCount": number,
  "culturalEventsSubtext": string,
  "weatherOverview": {
    "headline": string,
    "subheadline": string,
    "tempC": number,
    "feelsLikeC": number,
    "precipMm": number,
    "solarHours": string,
    "sunriseTime": string,
    "sunsetTime": string,
    "uvIndex": number,
    "checklistTips": string[]
  },
  "forecast7Days": [
    {
      "day": string,
      "date": string,
      "tempC": number,
      "minTempC": number,
      "maxTempC": number,
      "condition": string,
      "icon": string,
      "rainChance": number,
      "windKmh": number,
      "uvIndex": number
    }
  ],
  "transitPassName": string,
  "transitPassDesc": string,
  "packingList": [
    {
      "id": string,
      "name": string,
      "category": "outerwear" | "essentials" | "tech-gear",
      "tag": string,
      "badge": string,
      "packed": boolean,
      "essential": boolean
    }
  ],
  "eventsList": [
    {
      "id": string,
      "title": string,
      "category": "matsuri" | "arts" | "food" | "foliage",
      "categoryLabel": string,
      "dateStr": string,
      "timeStr": string,
      "location": string,
      "transitTimeMin": number,
      "crowdLevel": "Low" | "Moderate" | "High" | "Extreme",
      "image": string,
      "description": string
    }
  ]
}`;

        const response = await ai.models.generateContent({
          model: "gemini-3.8-flash",
          contents: prompt,
          config: {
            responseMimeType: "application/json",
          },
        });

        const text = response.text;
        if (text) {
          const parsed = JSON.parse(text);
          return res.json(parsed);
        }
      }
    } catch (apiErr) {
      console.warn("Gemini API generation error in server.ts, returning fallback signal:", apiErr);
    }

    // Return empty json so client fallback seamlessly executes
    return res.status(204).end();
  });

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
