"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoticationValidation = void 0;
const zod_1 = require("zod");
const createNoticationSchema = zod_1.z.object({
    body: zod_1.z.object({
        recipient: zod_1.z.string({
            required_error: "recipient is Required",
        }),
        sender: zod_1.z.string({
            required_error: "sender number is Required",
        }),
        message: zod_1.z.string({
            required_error: "Address is Required",
        }),
        type: zod_1.z.string({
            required_error: "type is Required",
        }),
    }),
});
exports.NoticationValidation = {
    createNoticationSchema,
};
