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
const http_status_codes_1 = require("http-status-codes");
const jwtHelpers_1 = require("../helpers/jwtHelpers");
const config_1 = __importDefault(require("../config"));
const auth_model_1 = require("../modules/auth/auth.model");
const handleApiError_1 = __importDefault(require("../errors/handleApiError"));
//  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN)
const auth = (...roles) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const token = req.headers.authorization;
            // console.log(token,"check token")
            if (!token) {
                throw new handleApiError_1.default(http_status_codes_1.StatusCodes.UNAUTHORIZED, "You are not authorized!");
            }
            const verifiedUser = jwtHelpers_1.jwtHelpers.verifyToken(token, config_1.default.jwt.secret);
            //  console.log(verifiedUser,"check verified user")
            const user = yield auth_model_1.User.findOne({
                _id: verifiedUser.id,
            });
            if (!user) {
                throw new handleApiError_1.default(http_status_codes_1.StatusCodes.UNAUTHORIZED, "This user is not found !");
            }
            if (roles.length && !roles.includes(verifiedUser.role)) {
                throw new handleApiError_1.default(http_status_codes_1.StatusCodes.FORBIDDEN, "Forbidden!");
            }
            req.user = verifiedUser;
            // console.log(req.user,"check user")
            next();
        }
        catch (err) {
            next(err);
        }
    });
};
exports.default = auth;
