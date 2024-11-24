import express from "express";
import { AuthClientController } from "./auth.controller";
import { ClientProfileController } from "../profile/profile.controller";

const router = express.Router();

export const AuthClientRoute = router;
router.post(
  "/signUp",

  AuthClientController.createAccount
);
router.post(
  "/signIn",

  AuthClientController.loginUser
);
router.post(
  "/profile",

  ClientProfileController.createProfile
);

router.get("/", ClientProfileController.getClients);
