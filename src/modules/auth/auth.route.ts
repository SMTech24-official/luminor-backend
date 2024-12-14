import express from "express";


import { AuthController } from "./auth.controller";

const router = express.Router();
export const AuthRoute = router;




router.post(
  "/signIn",
 

  AuthController.loginUser
);
router.post("/otp-enter", AuthController.enterOtp);
