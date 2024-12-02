"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OfferRoute = void 0;
const express_1 = __importDefault(require("express"));
const offer_controller_1 = require("./offer.controller");
const router = express_1.default.Router();
exports.OfferRoute = router;
router.post("/", offer_controller_1.OfferController.createOffer);
