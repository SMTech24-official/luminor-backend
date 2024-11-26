import mongoose, { SortOrder } from "mongoose";

import { IClient, ICLientFilters } from "./client.interface";
import { IpaginationOptions } from "../../interfaces/pagination";
import { IGenericResponse } from "../../interfaces/general";
import { paginationHelpers } from "../../helpers/paginationHelper";
import { searchableField } from "../../constants/searchableField";
import { Client } from "./client.model";
import { User } from "../user/user.model";
import { IUser } from "../user/user.interface";
import ApiError from "../../errors/handleApiError";


export const createClient = async (user:IUser, clientData: IClient) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

   //Create a User account
    const newUser = await User.create([user], { session });
    const userId = newUser[0]._id;

    //Create a Client account linked to the User
    const newClientData = {
      ...clientData,
      client: userId,
       // Link User ID to the Client
    };

    const newClient = await Client.create([newClientData], { session });

    // Step 3: Commit transaction
    await session.commitTransaction();
    session.endSession();

    return {
      user: newUser[0],
      client: newClient[0],
    };
  } catch (error:any) {
    // Rollback transaction in case of an error
    await session.abortTransaction();
    session.endSession();
    throw new ApiError(400,error);
  }
};

const getClients = async (
  filters: ICLientFilters,
  paginationOptions: IpaginationOptions
): Promise<IGenericResponse<IClient[]>> => {
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
  const result = await Client.find(whereConditions)
    .sort(sortCondition)
    .skip(skip)
    .limit(limit)
    .populate("client");

  const count = await Client.countDocuments();
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

export const ClientService = {
    createClient,
  getClients,
};
