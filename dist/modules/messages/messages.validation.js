"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageValidation = void 0;
const zod_1 = require("zod");
const CreateMessageSchema = zod_1.z.object({
    body: zod_1.z.object({
        recipient: zod_1.z.string({
            required_error: "recipient is Required",
        }),
        sender: zod_1.z.string({
            required_error: "sender number is Required",
        }),
        message: zod_1.z.string({
            required_error: "message is Required",
        }),
    }),
});
exports.MessageValidation = {
    CreateMessageSchema,
};
