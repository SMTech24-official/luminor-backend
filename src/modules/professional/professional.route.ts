import express from "express";

import { RetireProfessionalController } from "./professsional.controller";
import { multerUpload } from "../../middlewares/multer";
import validateRequest from "../../middlewares/validateRequest";
import { RetireProfessionalValidation } from "./professional.validation";

import { parseNestedJSON } from "../../middlewares/parseJson";
import auth from "../../middlewares/auth";
import { ENUM_USER_ROLE } from "../../enums/user";
const router = express.Router();

export const RetireProfessionalRoute = router;
router.post(
  "/signUp",

  multerUpload.single("cvOrCoverLetter"),

  parseNestedJSON,
  validateRequest(RetireProfessionalValidation.signUpZodSchema),

  RetireProfessionalController.createProfessional
);

router.patch(
  "/profile/:id",
  multerUpload.single("workSample"),
  auth(ENUM_USER_ROLE.RETIREPROFESSIONAL),
  RetireProfessionalController.updateSingleRetireProfessional
);
router.get("/", RetireProfessionalController.getReitereProfessionals);
