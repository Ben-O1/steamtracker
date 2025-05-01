require("dotenv").config();
const express = require("express");
const passport = require("passport");
const SteamStrategy = require("passport-steam").Strategy;
const session = require("express-session");

const app = express();
const PORT = 3001;

// Session setup
app.use(session({ secret: "secret", resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));

// Steam OpenID strategy
passport.use(new SteamStrategy({
  returnURL: "http://localhost:3001/auth/steam/return",
  realm: "http://localhost:3001/",
  apiKey: process.env.STEAM_API_KEY
}, (identifier, profile, done) => {
  return done(null, profile);
}));

app.get("/auth/steam", passport.authenticate("steam"));
app.get("/auth/steam/return",
  passport.authenticate("steam", { failureRedirect: "/" }),
  (req, res) => res.redirect("http://localhost:3000") // redirect to frontend
);

app.get("/api/user", (req, res) => {
  if (!req.user) return res.status(401).json({ error: "Not logged in" });
  res.json(req.user);
});

app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});
