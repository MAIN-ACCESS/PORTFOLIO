import type { Express } from "express";
import { createServer, type Server } from "http";

export async function registerRoutes(app: Express): Promise<Server> {

  app.post("/api/chat", async (req, res) => {
    try {
      const { message } = req.body;

      if (!message || typeof message !== "string") {
        return res.status(400).json({ error: "Message is required" });
      }

      const apiKey = process.env.GROQ_API_KEY;

      if (!apiKey) {
        return res.status(500).json({ error: "GROQ API key not configured" });
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

      const apiRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: message },
          ],
          max_tokens: 300,
          temperature: 0.7,
        }),
      });

      if (!apiRes.ok) {
        const errorText = await apiRes.text();
        console.error("Groq API error:", errorText);
        return res.status(500).json({ error: "AI request failed" });
      }

      const data = await apiRes.json();

      const reply =
        data?.choices?.[0]?.message?.content ||
        "Sorry, I couldn't respond.";

      return res.json({ response: reply });

    } catch (error) {
      console.error("Chat API error:", error);
      return res.status(500).json({ error: "Server error" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}