import 'dotenv/config';
import express from "express";
import cors from "cors";
import session from "express-session";
import OpenAI from "openai";

// --- Import X routes ---
import loginRoute from "./src/xTwitter/auth/login.js"
import callbackRoute from "./src/xTwitter/auth/callback.js"
import postTweetRoute from "./src/xTwitter/tweets/post.js";
import feedRoute from "./src/xTwitter/tweets/feed.js";
import analyticsRoute from "./src/xTwitter/tweets/analytics.js";

const app = express();
app.use(cors());
app.use(express.json());

// Session for X OAuth
app.use(session({
  secret: process.env.SESSION_SECRET || "supersecret",
  resave: false,
  saveUninitialized: true
}));

// --- OpenAI setup ---
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// --- AI Repurpose route ---
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
        Format it properly for that platform.
        Content:
        ${content}
      `;

      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 150,
      });

      outputs.push(completion.choices[0].message.content.trim());
    }

    res.json(outputs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error generating AI content" });
  }
});

// --- Mount X routes ---
app.use("/auth", loginRoute);
app.use("/auth", callbackRoute);
app.use("/tweet", postTweetRoute);
app.use("/feed", feedRoute);
app.use("/analytics", analyticsRoute);

// --- Start server ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
