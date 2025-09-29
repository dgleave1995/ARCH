import express from "express";
import axios from "axios";
import oauth from "../utils/oauth.js"; // adjust path if needed

const router = express.Router();

// GET /feed
router.get("/", async (req, res) => {
  if (!req.session.access_token || !req.session.user_id) {
    return res.status(401).json({ error: "User not authenticated" });
  }

  const token = {
    key: req.session.access_token,
    secret: req.session.access_token_secret,
  };

  const request_data = {
    url: `https://api.twitter.com/2/users/${req.session.user_id}/tweets`,
    method: "GET",
  };

  const headers = oauth.toHeader(oauth.authorize(request_data, token));

  try {
    const response = await axios.get(request_data.url, { headers });
    res.json(response.data);
  } catch (err) {
    console.error(err.response?.data || err.message || err);
    res.status(500).send("Fetch feed failed");
  }
});

export default router;
