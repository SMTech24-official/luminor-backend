import express from "express";
import { UserRoutes } from "../modules/user/user.route";
import { ClientProfileRoute } from "../modules/clientProfile/clientProfile.route";

import { ProfessionalProfileroute } from "../modules/professionalProfile/professionalProfile.route";


const router = express.Router();

const moduleRoutes = [
    {
      path: "/user",
      route: UserRoutes,
    },
    {
      path:"/clientProfile",
      route:ClientProfileRoute
    },
    {
      path:"/professionalProfile",
      route:ProfessionalProfileroute
    }

];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export const routes = router;
