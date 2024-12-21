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
exports.paymentService = void 0;
const https_1 = __importDefault(require("https"));
const config_1 = __importDefault(require("../../config"));
//payment from owner to rider
const paypalPayementClientToProfessional = (riderPaypalEmail, amount) => __awaiter(void 0, void 0, void 0, function* () {
    const clientId = config_1.default.paypal.paypalClientId;
    const secret = config_1.default.paypal.paypalSecretId;
    const auth = Buffer.from(`${clientId}:${secret}`).toString("base64");
    const url = new URL("https://api.sandbox.paypal.com/v1/payments/payouts");
    const payoutData = JSON.stringify({
        sender_batch_header: {
            sender_batch_id: `${Date.now()}`, // Unique batch ID
            email_subject: "You have a payment",
        },
        items: [
            {
                recipient_type: "EMAIL",
                amount: {
                    value: amount.toFixed(2), // Amount to send
                    currency: "USD",
                },
                receiver: riderPaypalEmail,
                note: "Thank you for your business!",
                sender_item_id: "item-1",
            },
        ],
    });
    const options = {
        method: "POST",
        headers: {
            Authorization: `Basic ${auth}`,
            "Content-Type": "application/json",
            "Content-Length": Buffer.byteLength(payoutData).toString(),
        },
    };
    return new Promise((resolve, reject) => {
        const request = https_1.default.request(url, options, (response) => {
            let data = "";
            response.on("data", (chunk) => {
                data += chunk;
            });
            response.on("end", () => {
                const result = JSON.parse(data);
                if (response.statusCode === 201 ||
                    response.statusCode === 200 ||
                    response.statusCode === 300) {
                    const transactionId = result.batch_header.payout_batch_id; // Extract transaction ID
                    resolve({
                        success: true,
                        email: riderPaypalEmail,
                        transactionId: transactionId,
                        amount: amount.toFixed(2),
                    });
                }
                else {
                    reject({ success: false, message: result });
                }
            });
        });
        request.on("error", (error) => {
            console.error("Error sending payment:", error);
            reject({ success: false, message: "Failed to send payment." });
        });
        request.write(payoutData);
        request.end();
    });
});
exports.paymentService = {
    paypalPayementClientToProfessional,
};
