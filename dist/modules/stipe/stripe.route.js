"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StripeRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const stripe_controller_1 = require("./stripe.controller");
const stripe_validation_1 = require("./stripe.validation");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const router = express_1.default.Router();
// create a new customer with card
router.post("/save-card", (0, auth_1.default)(), (0, validateRequest_1.default)(stripe_validation_1.TStripeSaveWithCustomerInfoPayloadSchema), stripe_controller_1.StripeController.saveCardWithCustomerInfo);
// Authorize the customer with the amount and send payment request
router.post("/authorize-payment", (0, validateRequest_1.default)(stripe_validation_1.AuthorizedPaymentPayloadSchema), stripe_controller_1.StripeController.authorizedPaymentWithSaveCard);
// Capture the payment request and deduct the amount
router.post("/capture-payment", (0, validateRequest_1.default)(stripe_validation_1.capturedPaymentPayloadSchema), stripe_controller_1.StripeController.capturePaymentRequest);
// Save new card to existing customer
router.post("/save-new-card", (0, validateRequest_1.default)(stripe_validation_1.saveNewCardWithExistingCustomerPayloadSchema), stripe_controller_1.StripeController.saveNewCardWithExistingCustomer);
// Get all save cards for customer
router.get("/get-cards/:customerId", stripe_controller_1.StripeController.getCustomerSavedCards);
// Delete card from customer
router.delete("/delete-card/:paymentMethodId", stripe_controller_1.StripeController.deleteCardFromCustomer);
// Refund payment to customer
router.post("/refund-payment", (0, validateRequest_1.default)(stripe_validation_1.refundPaymentPayloadSchema), stripe_controller_1.StripeController.refundPaymentToCustomer);
router.post("/create-payment-intent", stripe_controller_1.StripeController.createPaymentIntent);
exports.StripeRoutes = router;
