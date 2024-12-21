"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseBodyData = void 0;
const parseBodyData = (req, res, next) => {
    try {
        if (req.body.data) {
            req.body = JSON.parse(req.body.data); // Parse the nested JSON
        }
        next(); // Proceed to the next middleware
    }
    catch (error) {
        console.error("Error parsing JSON:", error.message);
        res.status(400).json({
            success: false,
            message: "Invalid JSON format in body data",
        });
    }
};
exports.parseBodyData = parseBodyData;
