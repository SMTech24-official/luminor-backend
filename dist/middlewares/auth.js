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
exports.auth = void 0;
const http_status_codes_1 = require("http-status-codes");
const jwtHelpers_1 = require("../helpers/jwtHelpers");
const config_1 = __importDefault(require("../config"));
const handleApiError_1 = __importDefault(require("../errors/handleApiError"));
const auth = (...requiredRoles) => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        //get authorization token
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
        // console.log(token)
        if (!token) {
            throw new handleApiError_1.default(http_status_codes_1.StatusCodes.UNAUTHORIZED, "You are not authorized");
        }
        // verify token
        let verifiedUser = null;
        verifiedUser = jwtHelpers_1.jwtHelpers.verifyToken(token, config_1.default.jwt.secret);
        // console.log(verifiedUser,"check verify user")
        req.user = verifiedUser; // role  , _id
        console.log(req.user, "from auth to check user");
        if (requiredRoles.length && !requiredRoles.includes(verifiedUser.role)) {
            throw new handleApiError_1.default(http_status_codes_1.StatusCodes.FORBIDDEN, "Forbidden");
        }
        else if (req.params.id !== req.user._id) {
            console.log("check wrong header ");
            throw new handleApiError_1.default(http_status_codes_1.StatusCodes.UNAUTHORIZED, "you are not the owner of this account");
        }
        next();
    }
    catch (error) {
        next(error);
    }
});
exports.auth = auth;
exports.default = exports.auth;
