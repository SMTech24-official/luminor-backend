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
const pdfkit_1 = __importDefault(require("pdfkit"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const uploadTos3_1 = require("./uploadTos3");
const generateOfferPDF = (offer) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    try {
        // Define the local file path
        const fileName = `offer_${Date.now()}.pdf`;
        const filePath = path_1.default.join(__dirname, "..", "uploads", fileName);
        // Create the uploads folder if it doesn't exist
        if (!fs_1.default.existsSync(path_1.default.dirname(filePath))) {
            fs_1.default.mkdirSync(path_1.default.dirname(filePath), { recursive: true });
        }
        // Initialize PDFKit
        const doc = new pdfkit_1.default();
        // Write the PDF to the local file system
        const writeStream = fs_1.default.createWriteStream(filePath);
        doc.pipe(writeStream);
        // Add content to the PDF
        doc
            .fontSize(16)
            .text(`Offer for Project: ${offer.projectName}`, { align: "left" });
        doc.text(`Description: ${offer.description}`, { align: "left" });
        doc.text(`Agreement Type: ${offer.agreementType}`, { align: "left" });
        doc.text(`Total Price: ${offer.totalPrice}`, { align: "left" });
        if (offer.agreementType === "Flat_Fee") {
            doc.text(`Flat Fee Price: ${(_a = offer.flatFee) === null || _a === void 0 ? void 0 : _a.price}`, { align: "left" });
        }
        else if (offer.agreementType === "Hourly_Fee") {
            doc.text(`Hourly Rate: ${(_b = offer.hourlyFee) === null || _b === void 0 ? void 0 : _b.pricePerHour}`, {
                align: "left",
            });
        }
        else if (offer.agreementType === "Milestone") {
            doc.text(`Milestones:`, { align: "left" });
            (_c = offer.milestones) === null || _c === void 0 ? void 0 : _c.forEach((milestone, index) => {
                doc.text(`Milestone ${index + 1}: ${milestone.title} - $${milestone.price}`, { align: "left" });
            });
        }
        doc.end();
        // Wait for the file to be completely written
        yield new Promise((resolve, reject) => {
            writeStream.on("finish", resolve);
            writeStream.on("error", reject);
        });
        console.log("PDF generated locally:", filePath);
        // Upload the file to DigitalOcean Spaces
        const uploadedURL = yield (0, uploadTos3_1.uploadFileToSpace)({
            buffer: fs_1.default.readFileSync(filePath),
            originalname: fileName,
            mimetype: "application/pdf",
        }, "offers");
        console.log("PDF uploaded to DigitalOcean Spaces:", uploadedURL);
        // Optionally delete the local file after uploading
        fs_1.default.unlinkSync(filePath);
        return uploadedURL;
    }
    catch (error) {
        console.error("Error generating or uploading PDF:", error);
        throw error;
    }
});
exports.generateOfferPDF = generateOfferPDF;
