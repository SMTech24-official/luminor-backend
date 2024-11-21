import express from "express";
import { UserRoutes } from "../modules/client/client.route";

const router = express.Router();

const moduleRoutes = [
    {
      path: "/client",
      route: UserRoutes,
    },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export const routes = router;
