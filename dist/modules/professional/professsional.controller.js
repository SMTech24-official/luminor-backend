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
const uploadTos3_1 = require("../../utilitis/uploadTos3");
const createProfessional = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const file = req.file;
    let fileUrl;
    console.log(fileUrl, "check url");
    const _a = req.body, { name, email, role, password } = _a, others = __rest(_a, ["name", "email", "role", "password"]);
    const user = {
        name,
        email,
        role,
        password,
    };
    const professionalData = Object.assign({}, others);
    const result = yield professional_service_1.RetireProfessionalService.createProfessional(user, professionalData, file);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_codes_1.StatusCodes.CREATED,
        message: `retire professional   account  created   successfully`,
        data: result,
    });
}));
const updateSingleRetireProfessional = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const files = req.files; // Get all files uploaded
    const fileMap = {};
    let workSampleUrl;
    let profileImageUrl;
    const _a = req.body, { name } = _a, retireProfessionalProfile = __rest(_a, ["name"]);
    const auth = { name };
    const { workSample, profileImage } = retireProfessionalProfile, others = __rest(retireProfessionalProfile, ["workSample", "profileImage"]);
    let updatedProfile = Object.assign({}, others);
    // Map files to their respective fields by matching `fieldname`
    if (files.length) {
        files.forEach((file) => {
            fileMap[file.fieldname] = file;
        });
        // Process each file if it exists
        if (fileMap["workSample"]) {
            workSampleUrl = yield (0, uploadTos3_1.uploadFileToSpace)(fileMap["workSample"], "work-samples");
        }
        if (fileMap["profileUrl"]) {
            profileImageUrl = yield (0, uploadTos3_1.uploadFileToSpace)(fileMap["profileUrl"], "profileUrl");
        }
        updatedProfile = Object.assign(Object.assign({}, others), { workSample: workSampleUrl, profileUrl: profileImageUrl });
    }
    // Parse and update body fields
    // Include uploaded file URLs in the update payload
    // Call service to update
    const result = yield professional_service_1.RetireProfessionalService.updateSingleRetireProfessional(req.params.id, auth, updatedProfile);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: `Retire professional account updated successfully`,
        data: result,
    });
}));
const getRetireProfessionals = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const paginationOptions = (0, pick_1.default)(req.query, pagination_1.paginationFileds);
    const filters = (0, pick_1.default)(req.query, searchableField_1.filterableField);
    // console.log(filters)
    const result = yield professional_service_1.RetireProfessionalService.getRetireProfessionals(filters, paginationOptions);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: "Retire professional   retrived successfully",
        meta: result.meta,
        data: result.data,
    });
}));
const getRetireProfessionalsByLocation = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { long, lat, min, max } = req.query;
    const result = yield professional_service_1.RetireProfessionalService.getRetireProfessionalsByLocation(parseFloat(long), parseFloat(lat), parseFloat(min), parseFloat(max));
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: "Retire professional   retrived successfully",
        data: result,
    });
}));
exports.RetireProfessionalController = {
    createProfessional,
    updateSingleRetireProfessional,
    getRetireProfessionals,
    getRetireProfessionalsByLocation,
};
