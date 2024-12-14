import express from "express";

import { RetireProfessionalController } from "./professsional.controller";
import { multerUpload } from "../../middlewares/multer";


import auth from "../../middlewares/auth";
import { ENUM_USER_ROLE } from "../../enums/user";
import { parseBodyData } from "../../middlewares/parseJson";
const router = express.Router();

export const RetireProfessionalRoute = router;
router.post(
  "/signUp",

  multerUpload.single("cvOrCoverLetter"),
  parseBodyData,
  // validateRequest(RetireProfessionalValidation.signUpZodSchema),

  RetireProfessionalController.createProfessional
);

router.patch(
  "/profile/:id",
  multerUpload.single("workSample"),
  
  parseBodyData,
  auth(ENUM_USER_ROLE.RETIREPROFESSIONAL),
  RetireProfessionalController.updateSingleRetireProfessional
);
router.get("/", RetireProfessionalController.getReitereProfessionals);
