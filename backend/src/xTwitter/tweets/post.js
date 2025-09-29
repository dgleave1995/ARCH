import express from "express";
import axios from "axios";
import oauth from "../utils/oauth.js"; // adjust path if needed

const router = express.Router();

router.post("/", async (req, res) => {
  const { text } = req.body;

  if (!req.session.access_token) {
    return res.status(401).json({ error: "User not authenticated" });
  }

  const token = {
    key: req.session.access_token,
    secret: req.session.access_token_secret,
  };

  const request_data = {
    url: "https://api.twitter.com/1.1/statuses/update.json",
    method: "POST",
    data: { status: text },
  };

  const headers = oauth.toHeader(oauth.authorize(request_data, token));

  try {
    const response = await axios.post(request_data.url, null, {
      params: { status: text }, // v1.1 expects params
      headers,
    });
    res.json(response.data);
  } catch (err) {
    console.error(err.response?.data || err.message || err);
    res.status(500).send("Tweet failed");
  }
});

export default router;   // 👈 IMPORTANT
