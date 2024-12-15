import mongoose, { SortOrder } from "mongoose";
import { MongoError, MongoServerError } from "mongodb";
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
import { getIndustryFromService } from "../../utilitis/serviceMapping";
import { uploadFileToSpace } from "../../utilitis/uploadTos3";
import { jwtHelpers } from "../../helpers/jwtHelpers";
import { Secret } from "jsonwebtoken";
import config from "../../config";


const createProfessional = async (
  user: IUser,
  professionalData: IProfessional,
  file:Express.Multer.File
) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    // Map service preferences to industries

    const newUser = await User.create([user], { session });
    const userId = newUser[0]._id;
    let fileUrl
    if (file) {
      fileUrl = await uploadFileToSpace(file, "retire-professional");
    }
  

    const newProfessionalData = {
      ...professionalData,
      retireProfessional: userId,
      cvOrCoverLetter:fileUrl
      // Add the mapped industries here
    };

    await RetireProfessional.create(
      [newProfessionalData],
      { session }
    );

    await session.commitTransaction();
    session.endSession();
  const accessToken = jwtHelpers.createToken(
    {
      id: newUser[0]._id,
      email: newUser[0].email,
      role: newUser[0].role,
    },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );
  return accessToken
    // return newProfessional[0].populate("retireProfessional");
  } catch (error: any) {
    await session.abortTransaction();
    session.endSession();
    if (error instanceof MongoError && error.code === 11000) {
      throw new ApiError(400, "email  must have to be unique");
    }
    throw new ApiError(400, error);
  }
};
export const updateSingleRetireProfessional = async (
  id: string,
  auth: Partial<IProfessional>,
  retireProfessionalPayload: Partial<IProfessional>
): Promise<IProfessional | null> => {
  const session = await mongoose.startSession(); // Start a new session for transaction management
  try {
    session.startTransaction();


      const professionalAccount=await User.findById(id)
      if (!professionalAccount) {
        throw new ApiError(404, "Professional account not found");
      }

    // Ensure you're updating the existing client, not creating a new one
    if (retireProfessionalPayload.expertise) {
      const industries = getIndustryFromService(
        retireProfessionalPayload.expertise
      );
      retireProfessionalPayload.industry = industries;
    }
    const updatedRetireProfessional = await RetireProfessional.findOneAndUpdate(
      { retireProfessional: professionalAccount._id },
      retireProfessionalPayload,
      {
        new: true, // return the updated document
        session,
      }
    );

    if (!updatedRetireProfessional) {
      throw new ApiError(404, "retire professional not found");
    }
    // console.log(auth,"check auth");

    // Update the associated User model (linked by client field)
    const updatedUser = await User.findByIdAndUpdate(id, auth, {
      new: true, // return the updated document
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

        if (field === "industry") {
          // console.log(value,"check value from client get clients")
          // const industryArray = (value as string).split(',').map((item) => item.trim());

          const parseArray = Array.isArray(value)
            ? value
            : JSON.parse(value as string);

          //  console.log(parseArray)
          return {
            industry: { $in: parseArray },
          };
        } else if (field === "skillType") {
          const skiillTypeArray = Array.isArray(value)
            ? value
            : JSON.parse(value as string);
          // console.log(skiillTypeArray)

          return {
            expertise: { $in: skiillTypeArray },
          };
        } else if (field === "timeline") {
          if (value === "shortTerm") {
            return {
              availability: { $lte: 29 },
            };
          } else {
            return {
              availability: { $gte: 30 },
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

export const RetireProfessionalService = {
  createProfessional,
  updateSingleRetireProfessional,
  getReitereProfessionals,
};
