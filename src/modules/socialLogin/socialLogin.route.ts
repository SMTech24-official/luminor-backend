import express from "express";

import { SocialLoginController } from "./socialLogin.controller";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import config from "../../config";
import { Strategy as FacebookStrategy } from "passport-facebook";

passport.use(
  new GoogleStrategy(
    {
      clientID: config.sosial_login.google.client_id as string,
      clientSecret: config.sosial_login.google.client_secret as string,
      callbackURL: config.sosial_login.google.redirect_uri as string,
    },
    function (accessToken, refreshToken, profile, cb) {
      console.log("data");
    }
  )
);
passport.use(
  new FacebookStrategy(
    {
      clientID: config.sosial_login.facebook.client_id as string,
      clientSecret: config.sosial_login.facebook.client_secret as string,
      callbackURL: config.sosial_login.facebook.redirect_uri as string,
      profileFields: ["id", "emails", "name", "photos"], // Get necessary fields
    },
    (accessToken, refreshToken, profile, done) => {
      done(null, profile);
    }
  )
);
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj as any));

const router = express.Router();

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  SocialLoginController.googleCallback
);

router.get(
  "/auth/facebook",
  passport.authenticate("facebook", {
    scope: ["email", "public_profile"],
  })
);
router.get(
  "/facebook/callback",
  passport.authenticate("facebook", { failureRedirect: "/" }),
  SocialLoginController.facebookCallback
);

export const socialLoginRoutes = router;
