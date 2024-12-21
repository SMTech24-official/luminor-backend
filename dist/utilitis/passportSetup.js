"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const passport_google_oauth20_1 = require("passport-google-oauth20");
const passport_facebook_1 = require("passport-facebook");
const dotenv_1 = __importDefault(require("dotenv"));
const config_1 = __importDefault(require("../config"));
dotenv_1.default.config();
// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: config.sosial_login.google.client_id as string,
//       clientSecret: config.sosial_login.google.client_secret as string,
//       callbackURL: config.sosial_login.google.redirect_uri as string,
//     },
//     (accessToken, refreshToken, profile, done) => {
//       done(null, profile);
//     }
//   )
// );
passport_1.default.use(new passport_google_oauth20_1.Strategy({
    clientID: config_1.default.sosial_login.google.client_id,
    clientSecret: config_1.default.sosial_login.google.client_secret,
    callbackURL: config_1.default.sosial_login.google.redirect_uri
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
exports.default = passport_1.default;
