import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import dotenv from "dotenv";
import config from "../config";

dotenv.config();

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


passport.use(new GoogleStrategy({
  clientID:config.sosial_login.google.client_id as string,
  clientSecret: config.sosial_login.google.client_secret as string,
  callbackURL: config.sosial_login.google.redirect_uri as string
},
function(accessToken, refreshToken, profile, cb) {
console.log("data");
}
));
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj as any));

export default passport;