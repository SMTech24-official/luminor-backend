"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateTotalPrice = void 0;
const http_status_codes_1 = require("http-status-codes");
const handleApiError_1 = __importDefault(require("../errors/handleApiError"));
const calculateTotalPrice = (offer) => {
    let totalPrice = 0;
    if (offer.agreementType === "Flat_Fee") {
        totalPrice = offer.flatFee ? offer.flatFee.price : 0;
    }
    else if (offer.agreementType === "Hourly_Fee") {
        totalPrice = offer.hourlyFee
            ? offer.hourlyFee.pricePerHour * offer.hourlyFee.delivery
            : 0;
    }
    else if (offer.agreementType === "Milestone" && offer.milestones) {
        totalPrice = offer.milestones.reduce((total, milestone) => total + milestone.price, 0);
    }
    else {
        throw new handleApiError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, "untype offer metho");
    }
    return totalPrice;
};
exports.calculateTotalPrice = calculateTotalPrice;
