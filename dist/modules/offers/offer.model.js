"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Offer = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const milestoneSchema = new mongoose_1.default.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    revision: { type: Number, default: 0 },
    delivery: { type: Number, required: true },
});
const offerSchema = new mongoose_1.default.Schema({
    projectName: { type: String, required: true },
    description: { type: String, required: true },
    agreementType: {
        type: String,
        enum: ['Flat Fee', 'Hourly Fee', 'Milestone'],
        required: true,
    },
    flatFee: {
        revision: { type: Number },
        delivery: { type: Number },
        price: { type: Number },
    },
    hourlyFee: {
        revision: { type: Number },
        delivery: { type: Number },
        pricePerHour: { type: Number },
    },
    orderAgreementPDF: { type: String, required: true },
    milestones: [milestoneSchema],
    totalPrice: { type: Number, required: true },
    professionalId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'RetireProfessional', required: true },
    clientId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Client', required: true },
    isAccepted: { type: Boolean, default: false },
}, { timestamps: true });
exports.Offer = mongoose_1.default.model('Offer', offerSchema);
