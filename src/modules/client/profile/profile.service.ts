import mongoose, { SortOrder } from "mongoose";
import { ICLientFilters, IClientProfile } from "./profile.interface";
import { ClientProfile } from "./profile.model";
import { AuthClient } from "../auth/auth.model";
import ApiError from "../../../errors/handleApiError";
import { IpaginationOptions } from "../../../interfaces/pagination";
import { IGenericResponse } from "../../../interfaces/general";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { searchableField } from "../../../constants/searchableField";

export const createProfile = async (data: IClientProfile) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { client, name, ...profileData } = data;

    const updatedClient = await AuthClient.findByIdAndUpdate(
      client,
      { name },
      { new: true, runValidators: true, session }
    );

    if (!updatedClient) {
      throw new Error("Client not found.");
    }

    const newProfile = await ClientProfile.create(
      [
        {
          client,
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

const getClients = async (
  filters: ICLientFilters,
  paginationOptions: IpaginationOptions
): Promise<IGenericResponse<IClientProfile[]>> => {
  const { skip, limit, page, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const { query, ...filtersData } = filters;

  console.log(filters, "i am from service to check filter data");
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
        if (field === "minBudget") {
          const parsingMinBudget = parseInt(value as string);
          return {
          
            
               "budgetRange.min": { $gte: parsingMinBudget } ,
           
          };
        } else if (field === "maxBudget") {
          const parsingMaxBudget = parseInt(value as string);
          return {
           
            
            "budgetRange.max": { $lte: parsingMaxBudget } 
          
          };
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
  const result = await ClientProfile.find(whereConditions)
    .sort(sortCondition)
    .skip(skip)
    .limit(limit)
    .populate("client");

  const count = await ClientProfile.countDocuments();
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

export const ClientProfileService = {
  createProfile,
  getClients,
};
