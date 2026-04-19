import type { Express } from "express";
import { createServer, type Server } from "http";

export async function registerRoutes(app: Express): Promise<Server> {

  app.post("/api/chat", async (req, res) => {
    try {
      const { message } = req.body;

      if (!message || typeof message !== "string") {
        return res.status(400).json({ error: "Message is required" });
      }

      const apiKey = process.env.XAI_API_KEY;

      if (!apiKey) {
        return res.status(500).json({ error: "XAI API key not configured" });
      }

      const systemPrompt = `
You are AXON, the AI assistant on DARK's portfolio website.

About DARK:
- Web developer, graphic designer, video editor
- Works on real client projects
- Available for freelance work
- Contact: darkz.main0@gmail.com

Rules:
- Call user "DARK"
- Keep answers short and professional
- Only talk about DARK or portfolio
- If unrelated: say "I'm here to help with DARK's work."
`;

      const apiRes = await fetch("https://api.x.ai/v1/responses", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "grok-4-0709",
          instructions: systemPrompt,
          input: message,
        }),
      });

      if (!apiRes.ok) {
        const errorText = await apiRes.text();
        console.error("Grok API error:", errorText);
        return res.status(500).json({ error: "AI request failed" });
      }

      const data = await apiRes.json();

      const botReply =
        data?.output?.[0]?.content?.[0]?.text ||
        data?.output_text ||
        "Sorry, I couldn't respond.";

      return res.json({ response: botReply });

    } catch (error) {
      console.error("Chat API error:", error);
      return res.status(500).json({ error: "Server error" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
