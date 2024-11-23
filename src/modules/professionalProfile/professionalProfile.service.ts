import mongoose, { SortOrder } from "mongoose";

import { User } from "../user/user.model";
import { IProfessionalProfile } from "./professionalProfile.interface";

import { ICLientFilters } from "../clientProfile/clientProfile.interface";
import { IpaginationOptions } from "../../interfaces/pagination";
import { IGenericResponse } from "../../interfaces/general";
import { paginationHelpers } from "../../helpers/paginationHelper";
import { searchableField } from "../clientProfile/clientProfile.const";
import { retiredProfessionalProfile } from "./professionalProfile.model";



const createProfile = async (userId: string, user:any, professionalData: IProfessionalProfile) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    
    const { name, phoneNumber, ...professionalFields } = professionalData;

    const userUpdate = await User.findByIdAndUpdate(
      userId,
      user,
      { new: true, session }
    );

    if (!userUpdate) {
      throw new Error("User not found");
    }


    const professionalProfile = await retiredProfessionalProfile.create(
      [
        {
          userId,
          ...professionalFields, 
        },
      ],
      { session }
    );

   
    await session.commitTransaction();
    session.endSession();

    return professionalProfile;
  } catch (error:any) {

    await session.abortTransaction();
    session.endSession();
    throw new Error(`Failed to create profile: ${error.message}`);
  }
};

const getProfessional = async (
  filters: ICLientFilters,
  paginationOptions: IpaginationOptions
): Promise<IGenericResponse<IProfessionalProfile[]>> => {
  const { skip, limit, page, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const { query, ...filtersData } = filters;

  const andCondition = [];
  if (query) {
    andCondition.push({
      $or: searchableField.map((field) => ({
        [field]: {
          $regex: query,
          $options: "i",
        },
      })),
    });
  }
  if (Object.keys(filtersData).length) {
    andCondition.push({
      $and: Object.entries(filtersData).map(([field, value]) => {
        if (
          field === "budget" 
        ) {
          const numericValue = parseFloat(value as string);

          return { [field]: numericValue };
        } 
        return { [field]: { $regex: value as string, $options: "i" } };
      }),
    });
  }
  const sortCondition: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortCondition[sortBy] = sortOrder;
  }
  const whereConditions = andCondition.length > 0 ? { $and: andCondition } : {};
  const result = await retiredProfessionalProfile.find(whereConditions)
    .sort(sortCondition)
    .skip(skip)
    .limit(limit).lean<IProfessionalProfile[]>();

  const count = await retiredProfessionalProfile.countDocuments();
  if (andCondition.length > 0) {
    return {
      meta: {
        page,
        limit,
        count,
      },
      data: result,
    };
  } else {
    return {
      meta: {
        page,
        limit,
        count,
      },
      data: result,
    };
  }
};

export const ProfessionalProfileService = {
  createProfile,
  getProfessional
};