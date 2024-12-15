import express from "express";
import { paypalController } from "./paypal.controller";
import auth from "../../middlewares/auth";
import { ENUM_USER_ROLE } from "../../enums/user";

const router = express.Router();

router.post(
  "/paypal-payment-professional-to-client",
  auth(ENUM_USER_ROLE.CLIENT),
  paypalController.paypalPayementClientToProfessional
);

export const paypalRoute = router;
