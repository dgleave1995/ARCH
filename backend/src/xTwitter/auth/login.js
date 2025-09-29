import express from "express";
import axios from "axios";
import oauth from "../utils/oauth.js"; // note: .js extension needed in ESM

const router = express.Router();

// /auth/login
router.get("/login", async (req, res) => {
  try {
    // Step 1: request token from X
    const request_data = {
      url: "https://api.twitter.com/oauth/request_token",
      method: "POST",
      data: { oauth_callback: process.env.CALLBACK_URL },
    };

    const headers = oauth.toHeader(oauth.authorize(request_data));

    const response = await axios.post(request_data.url, null, { headers });
    const params = new URLSearchParams(response.data);

    // Store token secret in session for callback
    req.session.oauth_token = params.get("oauth_token");
    req.session.oauth_token_secret = params.get("oauth_token_secret");

    // Redirect user to X to authorize the app
    res.redirect(
      `https://api.twitter.com/oauth/authorize?oauth_token=${params.get("oauth_token")}`
    );
  } catch (err) {
    console.error(err.response?.data || err);
    res.status(500).send("Login failed");
  }
});

export default router;
