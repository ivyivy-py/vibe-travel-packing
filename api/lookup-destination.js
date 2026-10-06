import { getAI } from "./aiClient.js";

/**
 * Dynamic Destination & Consular Intelligence Endpoint
 * POST /api/lookup-destination
 */
export default async function handleLookupDestination(req, res) {
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
    console.warn("Gemini API generation error in lookup-destination.js, returning fallback signal:", apiErr);
  }

  // Return empty 204 so client fallback seamlessly executes
  return res.status(204).end();
}
