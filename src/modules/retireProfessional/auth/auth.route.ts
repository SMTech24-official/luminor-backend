import express from "express";
import { AuthRetireProfessionalController } from "./auth.controller";
import { RetireProfessonaProfileController } from "../profile/profile.controller";

const router = express.Router();

export const RetireProfessionalAuthRoute = router;
router.post(
  "/signUp",

  AuthRetireProfessionalController.createAccount
);
router.post(
  "/signIn",

  AuthRetireProfessionalController.loginUser
);
router.post(
  "/profile",

  RetireProfessonaProfileController.createProfile
);
