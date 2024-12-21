"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidAmount = isValidAmount;
function isValidAmount(amount) {
    // Check if the value is a number and is finite
    if (typeof amount === "number" && Number.isFinite(amount)) {
        // Check if the number is non-negative
        return amount >= 0;
    }
    return false;
}
