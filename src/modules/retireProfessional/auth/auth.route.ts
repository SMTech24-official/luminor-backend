import express from "express";
import { AuthRetireProfessionalController } from "./auth.controller";
import { RetireProfessonaProfileController } from "../profile/profile.controller";
import { multerUpload } from "../../../middlewares/multer";

const router = express.Router();

export const RetireProfessionalAuthRoute = router;
router.post(
  "/signUp",
  multerUpload.single("cvOrCover"), 
  AuthRetireProfessionalController.createAccount
);
router.post(
  "/signIn",

  AuthRetireProfessionalController.loginUser
);
router.post(
  "/profile",
  multerUpload.single("projects"), 
  RetireProfessonaProfileController.createProfile
);
// router.get("/", ClientProfileController.getClients);