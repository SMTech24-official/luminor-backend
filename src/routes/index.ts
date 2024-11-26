import express from "express";


import { ClientRoute } from "../modules/client/client.route";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/client",
    route: ClientRoute,
  },

];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export const routes = router;
