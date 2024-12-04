import express from "express"

import validateRequest from "../../middlewares/validateRequest";
import { NoticationValidation } from "./notification.validation";
import { NotificationController } from "./notification.controller";

const router = express.Router();

export const NotificationRoutes = router;
router.post(
  "/",
  validateRequest(NoticationValidation.createNoticationSchema),
  NotificationController.createNotification
);

router.get("/", NotificationController.getUserNotification);

router.patch("/:id", NotificationController.updateNotification);