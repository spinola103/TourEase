const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/user");
const jwt = require("jsonwebtoken");

if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET && process.env.GOOGLE_CALLBACK_URL) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL,
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          let user = await User.findOne({ googleId: profile.id });

          if (!user) {
            user = await User.create({
              googleId: profile.id,
              name: profile.displayName,
              email: profile.emails[0].value,
              avatar: profile.photos[0].value,
            });
          }

          const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
          );

          done(null, { user, token });
        } catch (err) {
          done(err, null);
        }
      }
    )
  );
} else {
  const missing = [
    !process.env.GOOGLE_CLIENT_ID && 'GOOGLE_CLIENT_ID',
    !process.env.GOOGLE_CLIENT_SECRET && 'GOOGLE_CLIENT_SECRET',
    !process.env.GOOGLE_CALLBACK_URL && 'GOOGLE_CALLBACK_URL',
  ].filter(Boolean);

  console.warn(
    `Google OAuth not configured. Missing env var(s): ${missing.join(', ')}. Add them to enable Google OAuth or leave unset to disable.`
  );
}

module.exports = passport;
