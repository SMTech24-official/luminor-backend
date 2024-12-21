"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageRoutes = void 0;
const express_1 = __importDefault(require("express"));
const messages_controller_1 = require("./messages.controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const messages_validation_1 = require("./messages.validation");
const router = express_1.default.Router();
exports.MessageRoutes = router;
router.post("/", (0, validateRequest_1.default)(messages_validation_1.MessageValidation.CreateMessageSchema), messages_controller_1.MessageController.createMessage);
router.get("/", messages_controller_1.MessageController.getMessages);
