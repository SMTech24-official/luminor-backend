"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewRoute = void 0;
const express_1 = __importDefault(require("express"));
const reviews_controller_1 = require("./reviews.controller");
const router = express_1.default.Router();
exports.ReviewRoute = router;
router.patch("/:id", reviews_controller_1.ReviewController.postReviews);
