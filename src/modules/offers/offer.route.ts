import express from "express";
import { OfferController } from "./offer.controller";
import { multerUpload } from "../../middlewares/multer";
const router = express.Router();

export const OfferRoute = router;
router.post("/", OfferController.createOffer);
router.get("/professional/:id", OfferController.getOffersByProfessional);

router.get("/:id", OfferController.getSingleOffer);
