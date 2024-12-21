"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.multerUpload = void 0;
const multer_1 = __importDefault(require("multer"));
const multerUpload = (0, multer_1.default)({
    storage: multer_1.default.memoryStorage(), // Store file in memory (buffer)
    limits: {
        fileSize: 5 * 1024 * 1024, // Optional: limit file size (50MB in this example)
    },
});
exports.multerUpload = multerUpload;
