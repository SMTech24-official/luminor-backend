"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.refundPaymentPayloadSchema = exports.saveNewCardWithExistingCustomerPayloadSchema = exports.capturedPaymentPayloadSchema = exports.AuthorizedPaymentPayloadSchema = exports.TStripeSaveWithCustomerInfoPayloadSchema = void 0;
const zod_1 = require("zod");
// Zod schemas
const AddressSchema = zod_1.z.object({
    city: zod_1.z.string({ required_error: "City is required" }),
    postal_code: zod_1.z.string({ required_error: "Postal Code is required" }),
    country: zod_1.z.string({ required_error: "Country is required" }),
});
const UserSchema = zod_1.z.object({
    name: zod_1.z.string({ required_error: "Name is required" }),
    email: zod_1.z
        .string({ required_error: "Email is required" })
        .email("Invalid email format"),
});
exports.TStripeSaveWithCustomerInfoPayloadSchema = zod_1.z.object({
    user: UserSchema,
    paymentMethodId: zod_1.z.string({
        required_error: "Payment Method ID is required",
    }),
    amount: zod_1.z.number({ required_error: "Amount is required" }),
    address: AddressSchema,
});
exports.AuthorizedPaymentPayloadSchema = zod_1.z.object({
    customerId: zod_1.z.string({ required_error: "Customer ID is required" }),
    amount: zod_1.z.number({ required_error: "Amount is required" }),
    paymentMethodId: zod_1.z.string({ required_error: "Payment Method ID is required" }),
});
exports.capturedPaymentPayloadSchema = zod_1.z.object({
    paymentIntentId: zod_1.z.string({ required_error: "Payment Intent ID is required" }),
});
exports.saveNewCardWithExistingCustomerPayloadSchema = zod_1.z.object({
    customerId: zod_1.z.string({ required_error: "Customer ID is required" }),
    paymentMethodId: zod_1.z.string({ required_error: "Payment Method ID is required" }),
});
exports.refundPaymentPayloadSchema = zod_1.z.object({
    paymentIntentId: zod_1.z.string({ required_error: "Payment Intent ID is required" }),
});
