import express from "express";
import axios from "axios";
import oauth from "../utils/oauth.js"; // adjust path to your oauth helper

const router = express.Router();

router.get("/:tweet_id", async (req, res) => {
  const tweetId = req.params.tweet_id;
  const token = {
    key: req.session.access_token,
    secret: req.session.access_token_secret,
  };

  const request_data = {
    url: `https://api.twitter.com/2/tweets/${tweetId}?tweet.fields=public_metrics`,
    method: "GET",
  };

  const headers = oauth.toHeader(oauth.authorize(request_data, token));

  try {
    const response = await axios.get(request_data.url, { headers });
    res.json(response.data.data.public_metrics);
  } catch (err) {
    console.error(err.response?.data || err);
    res.status(500).send("Fetch analytics failed");
  }
});

export default router;
