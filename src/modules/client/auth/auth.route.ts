import express from "express";
import { AuthClientController } from "./auth.controller";
import { ClientProfileController } from "../profile/profile.controller";
import { multerUpload } from "../../../middlewares/multer";
import { AuthClientValidation } from "./auth.validation";
import validateRequest from "../../../middlewares/validateRequest";
import { ClientProfileValidation } from "../profile/profile.validation";

const router = express.Router();

export const AuthClientRoute = router;
router.post(
  "/signUp",
  validateRequest(AuthClientValidation.authClientSchema),

  AuthClientController.createAccount
);
router.post(
  "/signIn",

  AuthClientController.loginUser
);
router.post(
  "/profile",
  multerUpload.single("projectListing"), 
  // validateRequest(ClientProfileValidation.clientProfileSchema),
  ClientProfileController.createProfile
);

router.get("/", ClientProfileController.getClients);
