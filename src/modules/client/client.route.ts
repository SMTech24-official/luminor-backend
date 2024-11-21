import express from "express";
import { UserController } from "./client.controller";


const router = express.Router();

export const UserRoutes = router;
router.post(
  "/signUp",


  UserController.createUser
);
