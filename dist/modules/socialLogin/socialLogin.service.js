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
exports.SocialLoginService = void 0;
const jwtHelpers_1 = require("../../helpers/jwtHelpers");
const auth_model_1 = require("../auth/auth.model");
const config_1 = __importDefault(require("../../config"));
// Google Login into DB
const googleLoginIntoDb = (user) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const isUserExist = yield auth_model_1.User.findOne({ googleId: user.id });
    if (isUserExist) {
        const token = jwtHelpers_1.jwtHelpers.createToken({
            id: isUserExist._id,
            email: isUserExist.email,
            role: isUserExist.role,
        }, config_1.default.jwt.secret, config_1.default.jwt.expires_in);
        return { token };
    }
    if (!isUserExist) {
        const newUser = yield auth_model_1.User.create({
            googleId: user.id,
            name: {
                firstName: ((_a = user === null || user === void 0 ? void 0 : user.name) === null || _a === void 0 ? void 0 : _a.firstName) || '',
                lastName: ((_b = user === null || user === void 0 ? void 0 : user.name) === null || _b === void 0 ? void 0 : _b.lastName) || '',
            },
            email: user.emails ? user.emails[0].value : '',
            role: user.role, // Default role, adjust as necessary
        });
        const token = jwtHelpers_1.jwtHelpers.createToken({
            id: newUser._id,
            email: newUser.email,
            role: newUser.role,
        }, config_1.default.jwt.secret, config_1.default.jwt.expires_in);
        return { token };
    }
});
// Facebook Login into DB
const facebookLoginIntoDb = (user) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    const isUserExist = yield auth_model_1.User.findOne({ facebookId: user.id });
    if (isUserExist) {
        const token = jwtHelpers_1.jwtHelpers.createToken({
            id: isUserExist._id,
            email: isUserExist.email,
            role: isUserExist.role,
        }, config_1.default.jwt.secret, config_1.default.jwt.expires_in);
        return { token };
    }
    if (!isUserExist) {
        const newUser = yield auth_model_1.User.create({
            facebookId: user.id,
            name: {
                firstName: ((_a = user === null || user === void 0 ? void 0 : user.name) === null || _a === void 0 ? void 0 : _a.givenName) || '',
                lastName: ((_b = user === null || user === void 0 ? void 0 : user.name) === null || _b === void 0 ? void 0 : _b.familyName) || '',
            },
            email: user.emails ? user.emails[0].value : '',
            role: user.role, // Default role, adjust as necessary
            profileImage: ((_d = (_c = user.photos) === null || _c === void 0 ? void 0 : _c[0]) === null || _d === void 0 ? void 0 : _d.value) || '',
        });
        const token = jwtHelpers_1.jwtHelpers.createToken({
            id: newUser._id,
            email: newUser.email,
            role: newUser.role,
        }, config_1.default.jwt.secret, config_1.default.jwt.expires_in);
        return { token };
    }
});
exports.SocialLoginService = {
    googleLoginIntoDb,
    facebookLoginIntoDb,
};
