import mongoose, { SortOrder } from "mongoose";
import { IUser } from "../auth/auth.interface";
import { IProfessional } from "./professional.interface";
import { User } from "../auth/auth.model";
import { RetireProfessional } from "./professional.model";
import ApiError from "../../errors/handleApiError";
import { IpaginationOptions } from "../../interfaces/pagination";
import { IGenericResponse } from "../../interfaces/general";
import { paginationHelpers } from "../../helpers/paginationHelper";
import { searchableField } from "../../constants/searchableField";
import { IFilters } from "../client/client.interface";

 const createProfessional = async (user:IUser, professionalData: IProfessional) => {
    const session = await mongoose.startSession();
    try {
      session.startTransaction();
  

      const newUser = await User.create([user], { session });
      const userId = newUser[0]._id;
  

      const newProfessionalData = {
        ...professionalData,
        retireProfessional: userId,

      };
  
      const newProfessional = await RetireProfessional.create([newProfessionalData], { session });
  
      // Step 3: Commit transaction
      await session.commitTransaction();
      session.endSession();
   
  
      return newProfessional[0].populate("retireProfessional")
      
    } catch (error:any) {
      // Rollback transaction in case of an error
      await session.abortTransaction();
      session.endSession();
      throw new ApiError(400,error);
    }
  };
  
  export const updateSingleRetireProfessional = async (
    id: string,
    auth: Partial<IProfessional>,
    retireProfessionalPayload: Partial<IProfessional>
  ): Promise<IProfessional | null> => {
    const session = await mongoose.startSession();  // Start a new session for transaction management
    try {
      session.startTransaction();
  
      // Ensure you're updating the existing client, not creating a new one
      const updatedRetireProfessional = await RetireProfessional.findByIdAndUpdate(id, retireProfessionalPayload, {
        new: true,  // return the updated document
        session,
      });
  
      if (!updatedRetireProfessional) {
        throw new ApiError(404, "retire professional not found");
      }
      // console.log(auth,"check auth");
      
  
      // Update the associated User model (linked by client field)
      const updatedUser = await User.findByIdAndUpdate(updatedRetireProfessional.retireProfessional, auth, {
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
      return updatedRetireProfessional.populate("retireProfessional");
    } catch (error: any) {
      // In case of error, rollback the transaction
      await session.abortTransaction();
      session.endSession();
      throw new ApiError(400, error.message || "Error updating client");
    }
    
  };
  const getReitereProfessionals = async (
    filters: IFilters,
    paginationOptions: IpaginationOptions
  ): Promise<IGenericResponse<IProfessional[]>> => {
   
    const { skip, limit, page, sortBy, sortOrder } =
      paginationHelpers.calculatePagination(paginationOptions);
  
    const { query, ...filtersData } = filters;
  
   console.log(filtersData)
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
            "budgetRange.max": { $gte: minBudget }, // The client's max budget must be >= professional's min budget
          };
        } else if (field === "maxBudget") {
          const maxBudget = parseInt(value as string);
          return {
            "budgetRange.max": { $gte: maxBudget }, // The client's min budget must be <= professional's max budget
          };
        }
  
        // Handle project duration range
        if (field === "projectMin") {
          const minDuration = parseInt(value as string);
          return {
            "projectDurationRange.max": { $gte: minDuration }, // The client's max duration must be >= professional's min duration
          };
        } else if (field === "projectMax") {
          const maxDuration = parseInt(value as string);
          return {
            "projectDurationRange.max": { $gte: maxDuration }, // The client's min duration must be <= professional's max duration
          };
        }
        else if(field==="industry"  && Array.isArray(value)){
          return {
            "industry":{$in:value}
          }
        }
  
        // Default regex-based filtering for other fields
        return { [field]: { $regex: value as string, $options: "i" } };
      })
    );
  }
  
    const sortCondition: { [key: string]: SortOrder } = {};
    if (sortBy && sortOrder) {
      sortCondition[sortBy] = sortOrder;
    }
    const whereConditions = andCondition.length > 0 ? { $and: andCondition } : {};
    const result = await RetireProfessional.find(whereConditions)
      .sort(sortCondition)
      .skip(skip)
      .limit(limit)
      .populate("retireProfessional");
  
    const count = await RetireProfessional.countDocuments();
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
  
  export const RetireProfessionalService={
    createProfessional,
    updateSingleRetireProfessional,
    getReitereProfessionals
  }