import express from "express";
import { ClientController } from "./client.controller";
import { multerUpload } from "../../middlewares/multer";
import auth from "../../middlewares/auth";
import { ENUM_USER_ROLE } from "../../enums/user";
import validateRequest from "../../middlewares/validateRequest";
import { ClientValidation } from "./client.validation";


const router = express.Router();

export const ClientRoute = router;
router.post(
  "/signUp",
 
  validateRequest(ClientValidation.signUpZodSchema),
  ClientController.createClient
);

router.get("/",  ClientController.getClients)
router.patch("/profile/:id",  multerUpload.single("projectListing"), auth(ENUM_USER_ROLE.CLIENT),ClientController.updateSingleClient)
router.get("/:id",ClientController.getClientById)