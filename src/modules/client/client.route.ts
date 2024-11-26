import express from "express";
import { ClientController } from "./client.controller";


const router = express.Router();

export const ClientRoute = router;
router.post(
  "/signUp",
 

  ClientController.createClient
);


