import express from "express";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static("public"));

const systemPrompt = `你是 shangchengAI，只回答与德国外管局（Ausländerbehörde）相关的问题。\n如果用户的问题与德国外管局无关，必须礼貌拒绝，并提示仅回答德国外管局相关内容。\n回答时请尽量简洁、准确。`;

const keywordPattern = /(德国|外管局|Ausl(a|ä)nderbeh(o|ö)rde|签证|居留|居留许可|入境|签注|延签|拘留|移民|居留卡|居留证|居留权|居留申请)/i;

let client;

const getClient = () => {
  if (!client) {
    client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  }

  return client;
};

app.post("/api/chat", async (req, res) => {
  const { message } = req.body || {};

  if (!message || typeof message !== "string") {
    return res.status(400).json({ error: "请提供有效的 message。" });
  }

  if (!keywordPattern.test(message)) {
    return res.json({
      reply: "抱歉，我只能回答与德国外管局相关的问题。请描述与你的签证、居留或外管局办理事项相关的内容。"
    });
  }

  if (!process.env.OPENAI_API_KEY) {
    return res.status(500).json({ error: "未配置 OPENAI_API_KEY。" });
  }

  try {
    const completion = await getClient().chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: message }
      ],
      temperature: 0.2
    });

    const reply = completion.choices?.[0]?.message?.content?.trim();
    return res.json({ reply: reply || "抱歉，我暂时无法生成回答。" });
  } catch (error) {
    console.error("OpenAI request failed:", error);
    return res.status(500).json({ error: "调用 OpenAI 失败，请稍后再试。" });
  }
});

app.listen(port, () => {
  console.log(`shangchengAI running at http://localhost:${port}`);
});
