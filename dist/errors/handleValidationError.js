"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
const handleValidationError = (err) => {
    const errors = Object.values(err.errors).map((el) => {
        return {
            path: el === null || el === void 0 ? void 0 : el.path,
            message: el === null || el === void 0 ? void 0 : el.message,
        };
    });
    const statusCode = http_status_codes_1.StatusCodes.CONFLICT;
    return {
        statusCode,
        message: "validation Error",
        errorMessages: errors,
    };
};
exports.default = handleValidationError;
