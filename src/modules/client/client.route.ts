import express from "express";
import { ClientController } from "./client.controller";
import { multerUpload } from "../../middlewares/multer";
import auth from "../../middlewares/auth";
import { ENUM_USER_ROLE } from "../../enums/user";


const router = express.Router();

export const ClientRoute = router;
router.post(
  "/signUp",
 

  ClientController.createClient
);

router.get("/",auth(ENUM_USER_ROLE.CLIENT),  ClientController.getClients)
router.patch("/profile/:id", auth(ENUM_USER_ROLE.CLIENT), multerUpload.single("projectListing"),ClientController.updateSingleClient)