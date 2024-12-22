"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoute = void 0;
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("./auth.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_1 = require("../../enums/user");
const router = express_1.default.Router();
exports.AuthRoute = router;
router.post("/signIn", auth_controller_1.AuthController.loginUser);
router.get("/get-profile", (0, auth_1.default)(user_1.ENUM_USER_ROLE.CLIENT, user_1.ENUM_USER_ROLE.RETIREPROFESSIONAL), auth_controller_1.AuthController.getProfile);
router.post("/otp-enter", auth_controller_1.AuthController.enterOtp);
