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
exports.ReviewsService = exports.getReviews = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const professional_model_1 = require("../professional/professional.model");
const postReviews = (id, review) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    session.startTransaction();
    try {
        const result = yield professional_model_1.RetireProfessional.findOneAndUpdate({ _id: id }, { $push: { reviews: review } }, { new: true, session }).populate("retireProfessional");
        if ((result === null || result === void 0 ? void 0 : result.reviews) && Array.isArray(result.reviews)) {
            const totalRatings = result.reviews.reduce((sum, r) => sum + r.rating, 0);
            const averageRating = totalRatings / result.reviews.length;
            yield professional_model_1.RetireProfessional.updateOne({ _id: id }, { $set: { averageRating: averageRating } }, { session });
        }
        yield session.commitTransaction();
        return result;
    }
    catch (error) {
        yield session.abortTransaction();
        throw error;
    }
    finally {
        session.endSession();
    }
});
const getReviews = () => {
};
exports.getReviews = getReviews;
exports.ReviewsService = {
    postReviews
};
