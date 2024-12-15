import express from "express";


import { ClientRoute } from "../modules/client/client.route";
import { AuthRoute } from "../modules/auth/auth.route";
import { OfferRoute } from "../modules/offers/offer.route";
import { RetireProfessionalRoute } from "../modules/professional/professional.route";
import { ReviewRoute } from "../modules/reviews/reviews.route";
import { MessageRoutes } from "../modules/messages/messages.route";
import { NotificationRoutes } from "../modules/notification/notification.route";
import { StripeRoutes } from "../modules/stipe/stripe.route";
import { socialLoginRoutes } from "../modules/socialLogin/socialLogin.route";

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
  },
  {
    path:"/review",
    route:ReviewRoute
  },
  {
    path: "/messages",
    route: MessageRoutes,
  },
  {
    path: "/notification",
    route: NotificationRoutes,
  },
  {
    path: "/stripe",
    route: StripeRoutes,
  },
  
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export const routes = router;
