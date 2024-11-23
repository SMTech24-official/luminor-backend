import express from "express";

import { ProfessionalProfileController } from "./professionalProfile.controller";





const router = express.Router();

export const ProfessionalProfileroute = router;


export const UserRoutes = router;
router.get(
  "/",


  ProfessionalProfileController.getProfessional
);  