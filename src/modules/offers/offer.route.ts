
import express from "express"
import { OfferController } from "./offer.controller";
const router = express.Router();

export const OfferRoute = router;
router.post(
  "/",
 

  OfferController.createOffer
);


router.get("/professional/:id",OfferController.getOfferByProfessional)

router.get("/:id",OfferController.getSingleOffer)