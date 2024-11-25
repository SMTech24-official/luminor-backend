import mongoose, { SortOrder } from "mongoose";

import {  IRetireProfessionalProfile } from "./profile.interface";

import { AuthRetireProfessional } from "../auth/auth.model";
import { RetireProfessionalProfile } from "./profile.model";
import ApiError from "../../../errors/handleApiError";
import { ICLientFilters } from "../../client/profile/profile.interface";
import { IpaginationOptions } from "../../../interfaces/pagination";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { searchableField } from "../../../constants/searchableField";
import { IGenericResponse } from "../../../interfaces/general";

export const createProfile = async (data: IRetireProfessionalProfile) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { retireProfessional, name, ...profileData } = data;

    const updatedClient = await AuthRetireProfessional.findByIdAndUpdate(
      retireProfessional,
      { name },
      { new: true, runValidators: true, session }
    );

    if (!updatedClient) {
      throw new Error("Client not found.");
    }

    const newProfile = await RetireProfessionalProfile.create(
      [
        {
          retireProfessional,
          ...profileData,
        },
      ],
      { session }
    );

    await session.commitTransaction();
    session.endSession();

    return newProfile;
  } catch (error: any) {
    await session.abortTransaction();
    session.endSession();
    throw new ApiError(400, error.message);
  }
};
// const getRetireProfessional = async (
//   filters: ICLientFilters,
//   paginationOptions: IpaginationOptions
// ): Promise<IGenericResponse<IRetireProfessionalProfile[]>> => {
//   const { skip, limit, page, sortBy, sortOrder } =
//     paginationHelpers.calculatePagination(paginationOptions);

//   const { query, ...filtersData } = filters;

//   console.log(filters, "i am from service to check filter data");
//   const andCondition = [];
//   if (query) {
//     andCondition.push({
//       $or: searchableField.map((field) => ({
//         [field]: {
//           $regex: query,
//           $options: "i",
//         },
//       })),
//     });
//   }
//   if (Object.keys(filtersData).length) {
//     andCondition.push({
//       $and: Object.entries(filtersData).map(([field, value]) => {
//         if (field === "minBudget") {
//           const parsingMinBudget = parseInt(value as string);
//           return {
//             $or: [
//               { "budgetRange.min": { $lte: parsingMinBudget } },
//               { "budgetRange.max": { $gte: parsingMinBudget } },
//             ],
//           };
//         } else if (field === "maxBudget") {
//           const parsingMaxBudget = parseInt(value as string);
//           return {
//             $or: [
//               { "budgetRange.min": { $lte: parsingMaxBudget } },
//               { "budgetRange.max": { $gte: parsingMaxBudget } },
//             ],
//           };
//         }
//         return { [field]: { $regex: value as string, $options: "i" } };
//       }),
//     });
//   }
//   const sortCondition: { [key: string]: SortOrder } = {};
//   if (sortBy && sortOrder) {
//     sortCondition[sortBy] = sortOrder;
//   }
//   const whereConditions = andCondition.length > 0 ? { $and: andCondition } : {};
//   const result = await RetireProfessionalProfile.find(whereConditions)
//     .sort(sortCondition)
//     .skip(skip)
//     .limit(limit)
//     .populate("client");

//   const count = await RetireProfessionalProfile.countDocuments();
//   if (andCondition.length > 0) {
//     return {
//       meta: {
//         page,
//         limit,
//         count,
//       },
//       data: result,
//     };
//   } else {
//     return {
//       meta: {
//         page,
//         limit,
//         count,
//       },
//       data: result,
//     };
//   }
// };

export const RetireProfessionalProfileService = {
  createProfile,
  // getRetireProfessional,
};
