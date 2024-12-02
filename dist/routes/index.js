"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const express_1 = __importDefault(require("express"));
const client_route_1 = require("../modules/client/client.route");
const auth_route_1 = require("../modules/auth/auth.route");
const offer_route_1 = require("../modules/offers/offer.route");
const professional_route_1 = require("../modules/professional/professional.route");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: "/client",
        route: client_route_1.ClientRoute,
    },
    {
        path: "/retireProfessional",
        route: professional_route_1.RetireProfessionalRoute
    },
    {
        path: "/auth",
        route: auth_route_1.AuthRoute
    },
    {
        path: "/offer",
        route: offer_route_1.OfferRoute
    }
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.routes = router;
