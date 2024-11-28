import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as FacebookStrategy } from "passport-facebook";
import dotenv from "dotenv";
import config from ".";

dotenv.config();

// Google OAuth setup
passport.use(
  new GoogleStrategy(
    {
      clientID: config.sosial_login.google.client_id as string,
      clientSecret: config.sosial_login.google.client_secret as string,
      callbackURL: config.sosial_login.google.redirect_uri as string,
    },
    (accessToken, refreshToken, profile, done) => {
      done(null, profile);
    }
  )
);

// Facebook OAuth setup
passport.use(
  new FacebookStrategy(
    {
      clientID: config.sosial_login.facebook.client_id as string,
      clientSecret: config.sosial_login.facebook.client_secret as string,
      callbackURL: config.sosial_login.facebook.redirect_uri as string,
      profileFields: ["id", "displayName", "email", "photos"],
    },
    (accessToken, refreshToken, profile, done) => {
      done(null, profile);
    }
  )
);

// Serialize and deserialize user for session management
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj as any));

export default passport;
