import express from "express";
import { AuthRetireProfessionalController } from "./auth.controller";
import { RetireProfessonaProfileController } from "../profile/profile.controller";
import { multerUpload } from "../../../middlewares/multer";
import validateRequest from "../../../middlewares/validateRequest";
import { RetireProfessionalAuthValidation } from "./auth.validation";
import { RetireProfessionalProfileValidation } from "../profile/profile.validation";

const router = express.Router();

export const RetireProfessionalAuthRoute = router;
router.post(
  "/signUp",
  multerUpload.single("cvOrCover"), 
  validateRequest(RetireProfessionalAuthValidation.retireProfessionalAuthSchema),


  AuthRetireProfessionalController.createAccount
);
router.post(
  "/signIn",

  AuthRetireProfessionalController.loginUser
);
router.post(
  "/profile",
  multerUpload.single("projects"), 
  validateRequest(RetireProfessionalProfileValidation.retireProfessionalProfileSchema),

  RetireProfessonaProfileController.createProfile
);
// router.get("/", ClientProfileController.getClients);