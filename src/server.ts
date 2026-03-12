import express from "express";
import { generatePDF } from "./pdf-generator";

const app = express();

app.use(express.json({ limit: "10mb" }));

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "ok", service: "pdf-generator" });
});

// Generate PDF endpoint
app.post("/generate", async (req, res) => {
  try {
    const { html } = req.body;
    
    if (!html) {
      return res.status(400).json({
        error: "HTML is required",
      });
    }
    
    console.log("[API] Generating PDF, HTML length:", html.length);
    const pdf = await generatePDF(html);
    
    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": "inline; filename=contract.pdf",
      "Cache-Control": "no-cache, no-store, must-revalidate",
    });
    
    res.send(pdf);
  } catch (error) {
    console.error("[API] PDF generation error:", error);
    
    res.status(500).json({
      error: "PDF generation failed",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`[SERVER] PDF service running on port ${PORT}`);
});
