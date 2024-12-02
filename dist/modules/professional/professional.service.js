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
exports.RetireProfessionalService = exports.updateSingleRetireProfessional = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const auth_model_1 = require("../auth/auth.model");
const professional_model_1 = require("./professional.model");
const handleApiError_1 = __importDefault(require("../../errors/handleApiError"));
const paginationHelper_1 = require("../../helpers/paginationHelper");
const searchableField_1 = require("../../constants/searchableField");
const serviceMapping_1 = require("../../utilitis/serviceMapping");
const createProfessional = (user, professionalData) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        // Map service preferences to industries
        const newUser = yield auth_model_1.User.create([user], { session });
        const userId = newUser[0]._id;
        const newProfessionalData = Object.assign(Object.assign({}, professionalData), { retireProfessional: userId });
        const newProfessional = yield professional_model_1.RetireProfessional.create([newProfessionalData], { session });
        yield session.commitTransaction();
        session.endSession();
        return newProfessional[0].populate("retireProfessional");
    }
    catch (error) {
        yield session.abortTransaction();
        session.endSession();
        throw new handleApiError_1.default(400, error);
    }
});
const updateSingleRetireProfessional = (id, auth, retireProfessionalPayload) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession(); // Start a new session for transaction management
    try {
        session.startTransaction();
        // Ensure you're updating the existing client, not creating a new one
        if (retireProfessionalPayload.expertise) {
            const industries = (0, serviceMapping_1.getIndustryFromService)(retireProfessionalPayload.expertise);
            retireProfessionalPayload.industry = industries;
        }
        const updatedRetireProfessional = yield professional_model_1.RetireProfessional.findOneAndUpdate({ retireProfessional: id }, retireProfessionalPayload, {
            new: true, // return the updated document
            session,
        });
        if (!updatedRetireProfessional) {
            throw new handleApiError_1.default(404, "retire professional not found");
        }
        // console.log(auth,"check auth");
        // Update the associated User model (linked by client field)
        const updatedUser = yield auth_model_1.User.findByIdAndUpdate(id, auth, {
            new: true, // return the updated document
            session,
        });
        if (!updatedUser) {
            throw new handleApiError_1.default(404, "User not found");
        }
        // Commit the transaction after both updates are successful
        yield session.commitTransaction();
        session.endSession();
        // Return the updated client with populated user data
        return updatedRetireProfessional.populate("retireProfessional");
    }
    catch (error) {
        // In case of error, rollback the transaction
        yield session.abortTransaction();
        session.endSession();
        throw new handleApiError_1.default(400, error.message || "Error updating client");
    }
});
exports.updateSingleRetireProfessional = updateSingleRetireProfessional;
const getReitereProfessionals = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { skip, limit, page, sortBy, sortOrder } = paginationHelper_1.paginationHelpers.calculatePagination(paginationOptions);
    const { query } = filters, filtersData = __rest(filters, ["query"]);
    //  console.log(filtersData)
    const andCondition = [];
    if (query) {
        andCondition.push({
            $or: searchableField_1.searchableField.map((field) => ({
                [field]: {
                    $regex: query,
                    $options: "i",
                },
            })),
        });
    }
    if (Object.keys(filtersData).length) {
        andCondition.push(...Object.entries(filtersData).map(([field, value]) => {
            // Handle budget range
            if (field === "industry") {
                const industryArray = value.split(',').map((item) => item.trim());
                console.log(industryArray);
                return {
                    "expertise": { $in: industryArray }
                };
            }
            // Default regex-based filtering for other fields
            return { [field]: { $regex: value, $options: "i" } };
        }));
    }
    const sortCondition = {};
    if (sortBy && sortOrder) {
        sortCondition[sortBy] = sortOrder;
    }
    const whereConditions = andCondition.length > 0 ? { $and: andCondition } : {};
    const result = yield professional_model_1.RetireProfessional.find(whereConditions)
        .sort(sortCondition)
        .skip(skip)
        .limit(limit)
        .populate("retireProfessional");
    const count = yield professional_model_1.RetireProfessional.countDocuments();
    if (andCondition.length > 0) {
        return {
            meta: {
                page,
                limit,
                count,
            },
            data: result,
        };
    }
    else {
        return {
            meta: {
                page,
                limit,
                count,
            },
            data: result,
        };
    }
});
exports.RetireProfessionalService = {
    createProfessional,
    updateSingleRetireProfessional: exports.updateSingleRetireProfessional,
    getReitereProfessionals
};
