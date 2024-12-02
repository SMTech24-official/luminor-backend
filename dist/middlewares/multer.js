"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.multerUpload = void 0;
const multer_1 = __importDefault(require("multer"));
const handleApiError_1 = __importDefault(require("../errors/handleApiError"));
const DIR = "./uploads";
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        console.log(req.body, "checkz");
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        // console.log(req.body,"cehck body from multer")
        console.log(req.file);
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, `${uniqueSuffix}-${file.originalname}`);
    },
});
const fileFilter = (req, file, cb) => {
    try {
        // Supported file types
        const allowedMimeTypes = [
            "image/jpeg",
            "image/png",
            "image/jpg",
            "application/pdf",
            "application/msword", // for .doc files
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // for .docx files
        ];
        if (allowedMimeTypes.includes(file.mimetype)) {
            cb(null, true); // Accept file
        }
        else {
            throw new handleApiError_1.default(400, "Unsupported file format");
        }
    }
    catch (error) {
        cb(error, false); // Reject file
    }
};
exports.multerUpload = (0, multer_1.default)({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // Increased limit to 5MB for documents
    fileFilter: fileFilter,
});
