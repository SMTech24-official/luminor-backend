import express from "express";


import { RetireProfessionalController } from "./professsional.controller";
import { multerUpload } from "../../middlewares/multer";
import validateRequest from "../../middlewares/validateRequest";
import { RetireProfessionalValidation } from "./professional.validation";


const router = express.Router();

export const RetireProfessionalRoute = router;
router.post(
  "/signUp",
  multerUpload.single("cvOrCoverLetter"),
//   validateRequest(RetireProfessionalValidation.signUpZodSchema),

  RetireProfessionalController.clientProfessional
);
