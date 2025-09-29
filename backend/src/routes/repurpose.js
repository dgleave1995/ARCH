import 'dotenv/config';
import express from "express";
import cors from "cors";
import OpenAI from "openai";

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.post("/repurpose", async (req, res) => {
  const { content, platforms } = req.body;
  if (!content || !platforms) {
    return res.status(400).json({ error: "Content and platforms are required" });
  }

  try {
    const outputs = [];

    for (const platform of platforms) {
      const prompt = `
        You are a social media strategist. 
        Repurpose the following content specifically for ${platform}.
        Format it properly, using tone and style suited for that platform.
        Content:
        ${content}
      `;

      // ← This is where you choose the AI model
      const completion = await openai.chat.completions.create({
        model: "gpt-5-nano",  // <--- use cheaper GPT-3.5-turbo here
        messages: [{ role: "user", content: prompt }],
        max_tokens: 150
      });

      const outputText = completion.choices[0].message.content.trim();
      outputs.push({ platform, text: outputText });

      console.log(`Platform: ${platform}`);
      console.log("AI output:", outputText);
    }

    res.json({ outputs });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error generating AI content" });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
