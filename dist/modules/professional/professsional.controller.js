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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RetireProfessionalController = void 0;
const http_status_codes_1 = require("http-status-codes");
const catchAsync_1 = __importDefault(require("../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../shared/sendResponse"));
const professional_service_1 = require("./professional.service");
const pick_1 = __importDefault(require("../../shared/pick"));
const pagination_1 = require("../../constants/pagination");
const searchableField_1 = require("../../constants/searchableField");
const createProfessional = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const file = req.file;
    console.log(req.body, "check body");
    if (file) {
        data.cvOrCoverLetter = {
            fileName: file.filename,
            filePath: file.path,
            fileType: file.mimetype,
        };
    }
    const { name, email, role, password } = data, others = __rest(data, ["name", "email", "role", "password"]);
    const user = {
        name,
        email,
        role,
        password,
    };
    const result = yield professional_service_1.RetireProfessionalService.createProfessional(user, others);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: `retire professional   account  created   successfully`,
        data: result,
    });
}));
const updateSingleRetireProfessional = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(req.body)
    if (req.file) {
        req.body.workSample = {
            fileName: req.file.filename,
            filePath: req.file.path,
            fileType: req.file.mimetype,
        };
    }
    const _a = req.body, { firstName, lastName } = _a, retireProfessionalProfile = __rest(_a, ["firstName", "lastName"]);
    const auth = { firstName, lastName };
    const result = yield professional_service_1.RetireProfessionalService.updateSingleRetireProfessional(req.params.id, auth, retireProfessionalProfile);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_codes_1.StatusCodes.ACCEPTED,
        message: `retire professional  account  updated    successfully`,
        data: result,
    });
}));
const getReitereProfessionals = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const paginationOptions = (0, pick_1.default)(req.query, pagination_1.paginationFileds);
    const filters = (0, pick_1.default)(req.query, searchableField_1.filterableField);
    const result = yield professional_service_1.RetireProfessionalService.getReitereProfessionals(filters, paginationOptions);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: "Retire professional   retrived successfully",
        meta: result.meta,
        data: result.data,
    });
}));
exports.RetireProfessionalController = {
    createProfessional,
    updateSingleRetireProfessional,
    getReitereProfessionals
};
