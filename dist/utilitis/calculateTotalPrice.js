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
    switch (offer.agreementType) {
        case 'Flat Fee':
            totalPrice = offer.flatFee ? offer.flatFee.price : 0;
            break;
        case 'Hourly Fee':
            totalPrice = offer.hourlyFee
                ? offer.hourlyFee.pricePerHour * offer.hourlyFee.delivery
                : 0;
            break;
        case 'Milestone':
            totalPrice = offer.milestones.reduce((total, milestone) => total + milestone.price, 0);
            break;
        default:
            throw new handleApiError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, 'Invalid agreement type');
    }
    return totalPrice;
};
exports.calculateTotalPrice = calculateTotalPrice;
