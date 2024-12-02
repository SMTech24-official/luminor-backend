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
exports.ClientService = exports.updateSingleClient = exports.createClient = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const paginationHelper_1 = require("../../helpers/paginationHelper");
const searchableField_1 = require("../../constants/searchableField");
const client_model_1 = require("./client.model");
const auth_model_1 = require("../auth/auth.model");
const handleApiError_1 = __importDefault(require("../../errors/handleApiError"));
const serviceMapping_1 = require("../../utilitis/serviceMapping");
const createClient = (user, clientData) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        //Create a User account
        const newUser = yield auth_model_1.User.create([user], { session });
        const userId = newUser[0]._id;
        //Create a Client account linked to the User
        const newClientData = Object.assign(Object.assign({}, clientData), { client: userId });
        const newClient = yield client_model_1.Client.create([newClientData], { session });
        // Step 3: Commit transaction
        yield session.commitTransaction();
        session.endSession();
        return newClient[0].populate("client");
    }
    catch (error) {
        // Rollback transaction in case of an error
        yield session.abortTransaction();
        session.endSession();
        throw new handleApiError_1.default(400, error);
    }
});
exports.createClient = createClient;
const getClients = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { skip, limit, page, sortBy, sortOrder } = paginationHelper_1.paginationHelpers.calculatePagination(paginationOptions);
    const { query } = filters, filtersData = __rest(filters, ["query"]);
    console.log(filtersData);
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
            if (field === "minBudget") {
                const minBudget = parseInt(value);
                return {
                    "budgetRange.max": { $gte: minBudget },
                };
            }
            else if (field === "maxBudget") {
                const maxBudget = parseInt(value);
                return {
                    "budgetRange.max": { $gte: maxBudget },
                };
            }
            // Handle project duration range
            if (field === "projectMin") {
                const minDuration = parseInt(value);
                return {
                    "projectDurationRange.max": { $gte: minDuration },
                };
            }
            else if (field === "projectMax") {
                const maxDuration = parseInt(value);
                return {
                    "projectDurationRange.max": { $gte: maxDuration },
                };
            }
            else if (field === "industry") {
                console.log(value, "check value from client get clients");
                // const industryArray = (value as string).split(',').map((item) => item.trim());
                const parseArray = Array.isArray(value) ? value : JSON.parse(value);
                return {
                    "industry": { $in: parseArray }
                };
            }
            else if (field === "skillType") {
                const skiillTypeArray = Array.isArray(value) ? value : JSON.parse(value);
                console.log(skiillTypeArray);
                return {
                    "servicePreference": { $in: skiillTypeArray }
                };
            }
            else if (field === "timeline") {
                console.log(value, "in time line");
                return {
                    "projectDurationRange": value === "shortTerm" ? { $lte: 30 } : { $gte: 30 }
                };
            }
            return { [field]: { $regex: value, $options: "i" } };
        }));
    }
    const sortCondition = {};
    if (sortBy && sortOrder) {
        sortCondition[sortBy] = sortOrder;
    }
    const whereConditions = andCondition.length > 0 ? { $and: andCondition } : {};
    const result = yield client_model_1.Client.find(whereConditions)
        .sort(sortCondition)
        .skip(skip)
        .limit(limit)
        .populate("client");
    const count = yield client_model_1.Client.countDocuments();
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
const updateSingleClient = (id, auth, clientPayload) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession(); // Start a new session for transaction management
    try {
        session.startTransaction();
        if (clientPayload.servicePreference) {
            const industries = (0, serviceMapping_1.getIndustryFromService)(clientPayload.servicePreference);
            clientPayload.industry = industries;
        }
        // Ensure you're updating the existing client, not creating a new one
        const updatedClient = yield client_model_1.Client.findOneAndUpdate({ client: id }, clientPayload, {
            new: true, // return the updated document
            session,
        });
        if (!updatedClient) {
            throw new handleApiError_1.default(404, "Client not found");
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
        return updatedClient.populate("client");
    }
    catch (error) {
        // In case of error, rollback the transaction
        yield session.abortTransaction();
        session.endSession();
        throw new handleApiError_1.default(400, error.message || "Error updating client");
    }
});
exports.updateSingleClient = updateSingleClient;
const getClientById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield client_model_1.Client.findById(id);
    return result;
});
exports.ClientService = {
    createClient: exports.createClient,
    getClients,
    updateSingleClient: exports.updateSingleClient,
    getClientById
};
