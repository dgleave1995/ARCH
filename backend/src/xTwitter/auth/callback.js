import express from "express";
import axios from "axios";
import oauth from "../utils/oauth.js"; // adjust path if needed

const router = express.Router();

// GET /auth/callback
router.get("/callback", async (req, res) => {
  const { oauth_token, oauth_verifier } = req.query;

  const request_data = {
    url: "https://api.twitter.com/oauth/access_token",
    method: "POST",
    data: { oauth_verifier },
  };

  const token = { key: oauth_token, secret: req.session.oauth_token_secret };
  const headers = oauth.toHeader(oauth.authorize(request_data, token));

  try {
    const response = await axios.post(request_data.url, null, { headers });
    const params = new URLSearchParams(response.data);

    // Store final access tokens + user info in session
    req.session.access_token = params.get("oauth_token");
    req.session.access_token_secret = params.get("oauth_token_secret");
    req.session.user_id = params.get("user_id");
    req.session.screen_name = params.get("screen_name");

    res.send(`Logged in as ${params.get("screen_name")}`);
  } catch (err) {
    console.error(err.response?.data || err);
    res.status(500).send("Callback failed");
  }
});

export default router;
