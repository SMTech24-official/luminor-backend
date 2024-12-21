"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.socialLoginRoutes = void 0;
const express_1 = __importDefault(require("express"));
const socialLogin_controller_1 = require("./socialLogin.controller");
const passport_1 = __importDefault(require("passport"));
const passport_google_oauth20_1 = require("passport-google-oauth20");
const config_1 = __importDefault(require("../../config"));
const passport_facebook_1 = require("passport-facebook");
passport_1.default.use(new passport_google_oauth20_1.Strategy({
    clientID: config_1.default.sosial_login.google.client_id,
    clientSecret: config_1.default.sosial_login.google.client_secret,
    callbackURL: config_1.default.sosial_login.google.redirect_uri,
}, function (accessToken, refreshToken, profile, cb) {
    console.log("data");
}));
passport_1.default.use(new passport_facebook_1.Strategy({
    clientID: config_1.default.sosial_login.facebook.client_id,
    clientSecret: config_1.default.sosial_login.facebook.client_secret,
    callbackURL: config_1.default.sosial_login.facebook.redirect_uri,
    profileFields: ["id", "emails", "name", "photos"], // Get necessary fields
}, (accessToken, refreshToken, profile, done) => {
    done(null, profile);
}));
passport_1.default.serializeUser((user, done) => done(null, user));
passport_1.default.deserializeUser((obj, done) => done(null, obj));
const router = express_1.default.Router();
router.get("/auth/google", passport_1.default.authenticate("google", { scope: ["profile", "email"] }));
router.get("/google/callback", passport_1.default.authenticate("google", { failureRedirect: "/" }), socialLogin_controller_1.SocialLoginController.googleCallback);
router.get("/auth/facebook", passport_1.default.authenticate("facebook", {
    scope: ["email", "public_profile"],
}));
router.get("/facebook/callback", passport_1.default.authenticate("facebook", { failureRedirect: "/" }), socialLogin_controller_1.SocialLoginController.facebookCallback);
exports.socialLoginRoutes = router;
