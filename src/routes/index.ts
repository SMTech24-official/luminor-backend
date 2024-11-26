import express from "express";


import { ClientRoute } from "../modules/client/client.route";
import { AuthRoute } from "../modules/auth/auth.route";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/client",
    route: ClientRoute,
  },
  {
    path:"/auth",
    route:AuthRoute
  }

];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export const routes = router;
