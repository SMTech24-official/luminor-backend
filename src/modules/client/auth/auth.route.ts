import express from "express";
import { AuthClientController } from "./auth.controller";
import { ClientProfileController } from "../profile/profile.controller";
import { multerUpload } from "../../../middlewares/multer";

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
  multerUpload.single("projectListing"), // File upload middleware
  ClientProfileController.createProfile
);

router.get("/", ClientProfileController.getClients);
