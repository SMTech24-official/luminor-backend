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
exports.getPayPalAccessToken = void 0;
const axios_1 = __importDefault(require("axios"));
const config_1 = __importDefault(require("../config"));
// Function to get PayPal access token
const getPayPalAccessToken = () => __awaiter(void 0, void 0, void 0, function* () {
    const PAYPAL_API = "https://api-m.sandbox.paypal.com";
    const response = yield axios_1.default.post(`${PAYPAL_API}/v1/oauth2/token`, "grant_type=client_credentials", // Pass the data as the second argument
    {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        auth: {
            username: config_1.default.paypal.paypalClientId || "",
            password: config_1.default.paypal.paypalSecretId || "",
        },
    });
    return response.data.access_token;
});
exports.getPayPalAccessToken = getPayPalAccessToken;
