import express from "express";


import { RetireProfessionalController } from "./professsional.controller";
import { multerUpload } from "../../middlewares/multer";


const router = express.Router();

export const RetireProfessionalRoute = router;
router.post(
  "/signUp",
  multerUpload.single("cvOrCoverLetter"),

  RetireProfessionalController.clientProfessional
);
