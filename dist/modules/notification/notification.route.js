"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const notification_validation_1 = require("./notification.validation");
const notification_controller_1 = require("./notification.controller");
const router = express_1.default.Router();
exports.NotificationRoutes = router;
router.post("/", (0, validateRequest_1.default)(notification_validation_1.NoticationValidation.createNoticationSchema), notification_controller_1.NotificationController.createNotification);
router.get("/", notification_controller_1.NotificationController.getUserNotification);
router.patch("/:id", notification_controller_1.NotificationController.updateNotification);
