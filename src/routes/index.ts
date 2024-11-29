import express from "express";


import { ClientRoute } from "../modules/client/client.route";
import { AuthRoute } from "../modules/auth/auth.route";
import { OfferRoute } from "../modules/offers/offer.route";
import { RetireProfessionalRoute } from "../modules/professional/professional.route";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/client",
    route: ClientRoute,
  },
  {
    path:"/retireProfessional",
    route:RetireProfessionalRoute
  },
  {
    path:"/auth",
    route:AuthRoute
  },
  {
    path:"/offer",
    route:OfferRoute
  }

];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export const routes = router;
