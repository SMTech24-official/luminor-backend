"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const duplicateError = (error) => {
    const errors = [
        {
            path: "",
            message: error.message,
        },
    ];
    const statusCode = 400;
    return {
        statusCode,
        message: "Phone Number And Email Must Have To Be Unique",
        errorCode: error.code,
        errorMessages: errors,
    };
};
exports.default = duplicateError;
