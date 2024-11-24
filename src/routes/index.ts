import express from "express";

import { AuthClientRoute } from "../modules/client/auth/auth.route";
import { RetireProfessionalAuthRoute } from "../modules/retireProfessional/auth/auth.route";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/client",
    route: AuthClientRoute,
  },
  {
    path: "/retireProfessional",
    route: RetireProfessionalAuthRoute,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export const routes = router;
