import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import OpenAI from "openai";

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json({ limit: "1mb" }));

const openaiApiKey = process.env.OPENAI_API_KEY;
if (!openaiApiKey) {
  throw new Error("OPENAI_API_KEY is required. Set it in your environment.");
}

const openai = new OpenAI({ apiKey: openaiApiKey });

const SYSTEM_PROMPT =
  "Du bist ein Assistent der deutschen Ausländerbehörde. Antworte ausschließlich mit Informationen und Anweisungen, die typisch für eine Ausländerbehörde sind. Wenn eine Frage nicht in diesen Zuständigkeitsbereich fällt, erkläre kurz, dass du nur zu Themen der Ausländerbehörde Auskunft geben kannst.";

app.post("/api/chat", async (req, res) => {
  const { message } = req.body || {};

  if (!message || typeof message !== "string") {
    return res.status(400).json({ error: "A valid 'message' field is required." });
  }

  try {
    const response = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || "gpt-4o-mini",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: message }
      ],
      temperature: 0.2
    });

    const content = response.choices?.[0]?.message?.content?.trim();

    return res.json({ reply: content || "" });
  } catch (error) {
    console.error("OpenAI API error:", error);
    return res.status(500).json({ error: "Failed to generate response." });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
