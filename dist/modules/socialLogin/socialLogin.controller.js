"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocialLoginController = void 0;
const socialLogin_service_1 = require("./socialLogin.service");
const catchAsync_1 = __importDefault(require("../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../shared/sendResponse"));
const http_status_codes_1 = __importDefault(require("http-status-codes"));
// login all user form db googleCallbacks
const googleLogin = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield socialLogin_service_1.SocialLoginService.googleLoginIntoDb(req.user);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.default.OK,
        success: true,
        message: "User logged In successfully!",
        data: result,
    });
}));
const googleCallback = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = yield socialLogin_service_1.SocialLoginService.googleLoginIntoDb(req.user);
    res.redirect(`http://localhost:5000/?token=${token}`);
});
// login all user form db facebookCallback
const facebookLogin = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield socialLogin_service_1.SocialLoginService.facebookLoginIntoDb(req.user);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_codes_1.default.OK,
        success: true,
        message: 'User logged In successfully!',
        data: result,
    });
}));
// Facebook callback route
const facebookCallback = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = yield socialLogin_service_1.SocialLoginService.facebookLoginIntoDb(req.user);
    res.redirect(`http://localhost:3001/?token=${token}`);
    // res.status(200).send(token);
});
exports.SocialLoginController = {
    googleCallback,
    googleLogin,
    facebookLogin,
    facebookCallback,
};
