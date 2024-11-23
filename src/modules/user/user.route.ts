import express from "express";
import { UserController } from "./user.controller";




const router = express.Router();

export const UserRoutes = router;
router.post(
  "/signUp",


  UserController.createUser
);
router.post(
  "/signIn",


  UserController.loginUser
);
router.post(
  "/profile/:id",


  UserController.createProfile
);