require('dotenv').config();
const express = require('express');
const session = require('express-session');

const app = express();
app.use(express.json());

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}));

// --- Import route files ---
const loginRoute = require('./auth/login');
const callbackRoute = require('./auth/callback');
const postTweetRoute = require('./tweets/postTweet');
const feedRoute = require('./tweets/feed');
const analyticsRoute = require('./tweets/analytics');

// --- Mount routes ---
app.use('/auth', loginRoute);
app.use('/auth', callbackRoute);
app.use('/tweet', postTweetRoute);
app.use('/feed', feedRoute);
app.use('/analytics', analyticsRoute);

// --- Start server ---
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
