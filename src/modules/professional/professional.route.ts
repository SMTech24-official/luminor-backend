import express from "express";

import { RetireProfessionalController } from "./professsional.controller";
import { multerUpload } from "../../middlewares/multer";
import validateRequest from "../../middlewares/validateRequest";
import { RetireProfessionalValidation } from "./professional.validation";
import { Request,NextFunction } from "express";
import { parseNestedJSON } from "../../middlewares/parseJson";
const router = express.Router();

export const RetireProfessionalRoute = router;
router.post(
  "/signUp",
  
  multerUpload.single("cvOrCoverLetter"),
  parseNestedJSON,

  validateRequest(RetireProfessionalValidation.signUpZodSchema),

  RetireProfessionalController.createProfessional
);

router.patch("/profile/:id",multerUpload.single("workSample"),

RetireProfessionalController.updateSingleRetireProfessional)
router.get("/",RetireProfessionalController.getReitereProfessionals)