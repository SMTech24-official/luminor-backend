import mongoose, { SortOrder } from "mongoose";

import { IClient, IFilters } from "./client.interface";
import { IpaginationOptions } from "../../interfaces/pagination";
import { IGenericResponse } from "../../interfaces/general";
import { paginationHelpers } from "../../helpers/paginationHelper";
import { searchableField } from "../../constants/searchableField";
import { Client } from "./client.model";
import { User } from "../auth/auth.model";
import { IUser } from "../auth/auth.interface";
import ApiError from "../../errors/handleApiError";
import { getIndustryFromService } from "../../utilitis/serviceMapping";


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
 

    return newClient[0].populate("client")
    
  } catch (error:any) {
    // Rollback transaction in case of an error
    await session.abortTransaction();
    session.endSession();
    throw new ApiError(400,error);
  }
};

const getClients = async (
  filters: IFilters,
  paginationOptions: IpaginationOptions
): Promise<IGenericResponse<IClient[]>> => {
 
  const { skip, limit, page, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const { query, ...filtersData } = filters;

//  console.log(filtersData)
  const andCondition = [];
  if (query) {
    andCondition.push({
      $or: searchableField.map((field) => ({
        [field]: {
          $regex: query as string,
          $options: "i",
        },
      })),
    });
  }
  if (Object.keys(filtersData).length) {
  andCondition.push(
    ...Object.entries(filtersData).map(([field, value]) => {
      // Handle budget range
      if (field === "minBudget") {
        const minBudget = parseInt(value as string);
        return {
          "budgetRange.max": { $gte: minBudget }, 
        };
      } else if (field === "maxBudget") {
        const maxBudget = parseInt(value as string);
        return {
          "budgetRange.max": { $gte: maxBudget }, 
        };
      }

      // Handle project duration range
      if (field === "projectMin") {
        const minDuration = parseInt(value as string);
        return {
          "projectDurationRange.max": { $gte: minDuration }, 
        };
      } else if (field === "projectMax") {
        const maxDuration = parseInt(value as string);
        return {
          "projectDurationRange.max": { $gte: maxDuration }, 
        };
      }
      else if(field==="industry" ){
      //  console.log(value,"check value from client get clients")
        // const industryArray = (value as string).split(',').map((item) => item.trim());

       const parseArray = Array.isArray(value) ? value : JSON.parse(value as string);
     

        return {
          "industry":{$in:parseArray}
        }
      }
      else if(field==="skillType"){

        const skiillTypeArray = Array.isArray(value) ? value : JSON.parse(value as string);
        // console.log(skiillTypeArray)

        return {
          "servicePreference":{$in:skiillTypeArray}
        }
      }
      else if(field==="timeline"){
        if (value === "shortTerm") {
          console.log("for shorterm")
          return {
            "projectDurationRange.max": { $lte: 29 },  // Projects with duration less than or equal to 30
          };
        } else {
          return {
            "projectDurationRange.max": { $gte: 30 },  // Projects with duration greater than or equal to 30
          };
        }
      }


      return { [field]: { $regex: value as string, $options: "i" } };
    })
  );
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
export const updateSingleClient = async (
  id: string,
  auth: Partial<IClient>,
  clientPayload: Partial<IClient>
): Promise<IClient | null> => {
  const session = await mongoose.startSession();  // Start a new session for transaction management
  try {
    session.startTransaction();
    if (clientPayload.servicePreference) {
      const industries = getIndustryFromService(clientPayload.servicePreference);
      clientPayload.industry = industries; 
    }

    // Ensure you're updating the existing client, not creating a new one
    const updatedClient = await Client.findOneAndUpdate({client:id}, clientPayload, {
      new: true,  // return the updated document
      session,
    });

    if (!updatedClient) {
      throw new ApiError(404, "Client not found");
    }
    // console.log(auth,"check auth");
    

    // Update the associated User model (linked by client field)
    const updatedUser = await User.findByIdAndUpdate(id, auth, {
      new: true,  // return the updated document
      session,
    });

    if (!updatedUser) {
      throw new ApiError(404, "User not found");
    }

    // Commit the transaction after both updates are successful
    await session.commitTransaction();
    session.endSession();

    // Return the updated client with populated user data
    return updatedClient.populate("client");
  } catch (error: any) {
    // In case of error, rollback the transaction
    await session.abortTransaction();
    session.endSession();
    throw new ApiError(400, error.message || "Error updating client");
  }
};

 const getClientById=async(id:string):Promise<IClient |null >=>{


   const result=await Client.findById(id)
   return result
}
export const ClientService = {
  createClient,
  getClients,
  updateSingleClient,
  getClientById
};
