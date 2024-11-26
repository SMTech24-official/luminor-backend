import express from "express";
import { ClientController } from "./client.controller";
import { multerUpload } from "../../middlewares/multer";


const router = express.Router();

export const ClientRoute = router;
router.post(
  "/signUp",
 

  ClientController.createClient
);

router.get("/",ClientController.getClients)
router.patch("/profile/:id",  multerUpload.single("projectListing"),ClientController.updateSingleClient)