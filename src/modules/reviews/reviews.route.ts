import express from "express";
import { ReviewController } from "./reviews.controller";

const router = express.Router();

export const ReviewRoute = router;
router.patch(
  "/:id",
  ReviewController.postReviews

  
);

