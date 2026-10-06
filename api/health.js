/**
 * Health Check API Endpoint
 * GET /api/health
 */
export default function handleHealth(req, res) {
  res.json({
    status: "ok",
    service: "VoyagePass Sovereign Advisory Engine",
    timestamp: new Date().toISOString(),
  });
}
