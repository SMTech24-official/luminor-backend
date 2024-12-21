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
exports.StripeController = void 0;
const catchAsync_1 = __importDefault(require("../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../shared/sendResponse"));
const stripe_service_1 = require("./stripe.service");
// create a new customer with card
const saveCardWithCustomerInfo = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user.id;
    const result = yield stripe_service_1.StripeServices.saveCardWithCustomerInfoIntoStripe(req.body, userId);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Create customer and save card successfully",
        data: result,
    });
}));
// Authorize the customer with the amount and send payment request
const authorizedPaymentWithSaveCard = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield stripe_service_1.StripeServices.authorizedPaymentWithSaveCardFromStripe(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Authorized customer and payment request successfully",
        data: result,
    });
}));
// Capture the payment request and deduct the amount
const capturePaymentRequest = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield stripe_service_1.StripeServices.capturePaymentRequestToStripe(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Capture payment request and payment deduct successfully",
        data: result,
    });
}));
// Save new card to existing customer
const saveNewCardWithExistingCustomer = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield stripe_service_1.StripeServices.saveNewCardWithExistingCustomerIntoStripe(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "New card save successfully",
        data: result,
    });
}));
// Get all save cards for customer
const getCustomerSavedCards = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const result = yield stripe_service_1.StripeServices.getCustomerSavedCardsFromStripe((_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a.customerId);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Retrieve customer cards successfully",
        data: result,
    });
}));
// Delete card from customer
const deleteCardFromCustomer = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const result = yield stripe_service_1.StripeServices.deleteCardFromCustomer((_a = req.params) === null || _a === void 0 ? void 0 : _a.paymentMethodId);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Delete a card successfully",
        data: result,
    });
}));
// Refund payment to customer
const refundPaymentToCustomer = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield stripe_service_1.StripeServices.refundPaymentToCustomer(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Refund payment successfully",
        data: result,
    });
}));
//payment from owner to rider
const createPaymentIntent = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield stripe_service_1.StripeServices.createPaymentIntentService(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Stipe payment successful",
        data: result,
    });
}));
exports.StripeController = {
    saveCardWithCustomerInfo,
    authorizedPaymentWithSaveCard,
    capturePaymentRequest,
    saveNewCardWithExistingCustomer,
    getCustomerSavedCards,
    deleteCardFromCustomer,
    refundPaymentToCustomer,
    createPaymentIntent,
};
