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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateOfferPDF = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const pdfkit_1 = __importDefault(require("pdfkit"));
const generateOfferPDF = (offer) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const doc = new pdfkit_1.default();
    const fileName = `offer_${Date.now()}.pdf`;
    const filePath = path_1.default.join(__dirname, "../../uploads", fileName);
    // Pipe the PDF output to a file
    doc.pipe(fs_1.default.createWriteStream(filePath));
    doc.fontSize(16).text(`Offer for Project: ${offer.projectName}`, { align: "center" });
    doc.text(`Description: ${offer.description}`, { align: "left" });
    doc.text(`Agreement Type: ${offer.agreementType}`, { align: "left" });
    doc.text(`Total Price: ${offer.totalPrice}`, { align: "left" });
    if (offer.agreementType === "Flat Fee") {
        doc.text(`Flat Fee Price: ${(_a = offer.flatFee) === null || _a === void 0 ? void 0 : _a.price}`, { align: "left" });
    }
    else if (offer.agreementType === "Hourly Fee") {
        doc.text(`Hourly Rate: ${(_b = offer.hourlyFee) === null || _b === void 0 ? void 0 : _b.pricePerHour}`, { align: "left" });
    }
    else if (offer.agreementType === "Milestone") {
        doc.text(`Milestones:`, { align: "left" });
        offer.milestones.forEach((milestone, index) => {
            doc.text(`Milestone ${index + 1}: ${milestone.title} - $${milestone.price}`, { align: "left" });
        });
    }
    doc.end();
    return filePath;
});
exports.generateOfferPDF = generateOfferPDF;
