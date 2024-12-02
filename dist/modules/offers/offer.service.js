"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OfferService = void 0;
const calculateTotalPrice_1 = require("../../utilitis/calculateTotalPrice");
const offer_model_1 = require("./offer.model");
const createOffer = (offer) => __awaiter(void 0, void 0, void 0, function* () {
    offer.totalPrice = (0, calculateTotalPrice_1.calculateTotalPrice)(offer);
    const newOffer = yield offer_model_1.Offer.create(offer);
    return newOffer;
});
exports.OfferService = {
    createOffer,
};
