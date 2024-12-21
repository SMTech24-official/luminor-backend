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
exports.ClientController = void 0;
const catchAsync_1 = __importDefault(require("../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../shared/sendResponse"));
const pick_1 = __importDefault(require("../../shared/pick"));
const pagination_1 = require("../../constants/pagination");
const searchableField_1 = require("../../constants/searchableField");
const client_service_1 = require("./client.service");
const http_status_codes_1 = require("http-status-codes");
const uploadTos3_1 = require("../../utilitis/uploadTos3");
const createClient = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const { name, email, role, password } = data, others = __rest(data, ["name", "email", "role", "password"]);
    const result = yield client_service_1.ClientService.createClient({ name, email, role, password }, others);
    // console.log(jwtHelpers.verifyToken(result, config.jwt.secret as Secret));
    // console.log(data, "check data");
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: `Client account created successfully`,
        data: result,
    });
}));
const getClients = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const paginationOptions = (0, pick_1.default)(req.query, pagination_1.paginationFileds);
    console.log(req.query, "querty check from controller");
    const filters = (0, pick_1.default)(req.query, searchableField_1.filterableField);
    //  console.log(req.query,"check query")
    const result = yield client_service_1.ClientService.getClients(filters, paginationOptions);
    console.log(filters, "filters");
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: "Clients  retrived successfully",
        meta: result.meta,
        data: result.data,
    });
}));
const getClientById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield client_service_1.ClientService.getClientById(id);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: "Client   retrived successfully",
        data: result,
    });
}));
const updateSingleClient = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const id = req.params.id;
    let projectUrl;
    let profileImageUrl;
    const { name } = data, clientProfile = __rest(data, ["name"]);
    const { workSample, profileImage } = clientProfile, others = __rest(clientProfile, ["workSample", "profileImage"]);
    let updatedProfile = Object.assign({}, others);
    // console.log(req.body);
    const files = req.files; // Get all files uploaded
    const fileMap = {};
    if (files.length) {
        files.forEach((file) => {
            fileMap[file.fieldname] = file;
        });
        // console.log(req.body, "check body");
        // console.log(file, "check file");
        if (fileMap["projectUrl"]) {
            projectUrl = yield (0, uploadTos3_1.uploadFileToSpace)(fileMap["projectUrl"], "project-samples");
        }
        if (fileMap["profileUrl"]) {
            profileImageUrl = yield (0, uploadTos3_1.uploadFileToSpace)(fileMap["profileUrl"], "profileUrl");
        }
        updatedProfile = Object.assign(Object.assign({}, others), { projectUrl: projectUrl, profileUrl: profileImageUrl });
    }
    // console.log(req.user, "check user");
    // Include uploaded file URLs in the update payload
    const auth = { name };
    const result = yield client_service_1.ClientService.updateSingleClient(id, auth, updatedProfile);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_codes_1.StatusCodes.OK,
        message: `client  account  updated    successfully`,
        data: result,
    });
}));
exports.ClientController = {
    createClient,
    getClients,
    updateSingleClient,
    getClientById,
};
