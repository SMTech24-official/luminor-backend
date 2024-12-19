import mongoose, { SortOrder } from "mongoose";
import { MongoError } from "mongodb";
import { IUser } from "../auth/auth.interface";
import { IProfessional } from "./professional.interface";
import { User } from "../auth/auth.model";
import { RetireProfessional } from "./professional.model";
import ApiError from "../../errors/handleApiError";
import { IpaginationOptions } from "../../interfaces/pagination";
import { IGenericResponse } from "../../interfaces/general";
import { paginationHelpers } from "../../helpers/paginationHelper";
import { searchableField } from "../../constants/searchableField";

import { getIndustryFromService } from "../../utilitis/serviceMapping";
import { uploadFileToSpace } from "../../utilitis/uploadTos3";
import { jwtHelpers } from "../../helpers/jwtHelpers";
import { Secret } from "jsonwebtoken";
import config from "../../config";
import { IFilters } from "../../interfaces/filter";

const createProfessional = async (
  user: IUser,
  professionalData: IProfessional,
  file: Express.Multer.File
) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    // Map service preferences to industries

    const newUser = await User.create([user], { session });
    const userId = newUser[0]._id;
    let fileUrl;
    if (file) {
      fileUrl = await uploadFileToSpace(file, "retire-professional");
    }

    const newProfessionalData = {
      ...professionalData,
      retireProfessional: userId,
      cvOrCoverLetter: fileUrl,
      // Add the mapped industries here
    };

    await RetireProfessional.create([newProfessionalData], { session });

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
    return {
      accessToken,
      user: newUser,
      retireProfessinal: newProfessionalData,
    };
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

    const professionalAccount = await User.findById(id);
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

const getRetireProfessionals = async (
  filters: IFilters,
  paginationOptions: IpaginationOptions
): Promise<IGenericResponse<IProfessional[]>> => {
  const { skip, limit, page, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const { query, location, ...filtersData } = filters; // Extract location filter

  const andCondition = [];

  // Handle text search
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

  // Handle other filters
  if (Object.keys(filtersData).length) {
    andCondition.push(
      ...Object.entries(filtersData).map(([field, value]) => {
        if (field === "industry") {
          const parseArray = Array.isArray(value)
            ? value
            : JSON.parse(value as string);

          return {
            industry: { $in: parseArray },
          };
        } else if (field === "skillType") {
          const skillTypeArray = Array.isArray(value)
            ? value
            : JSON.parse(value as string);

          return {
            expertise: { $in: skillTypeArray },
          };
        } else if (field === "timeline") {
          return value === "shortTerm"
            ? { availability: { $lte: 29 } }
            : { availability: { $gte: 30 } };
        }
        return { [field]: { $regex: value as string, $options: "i" } };
      })
    );
  }

  // Handle location filter using $geoNear
  const aggregationPipeline: any[] = [];
  if (location) {
    const [longitude, latitude, minDistance, maxDistance] = JSON.parse(
      location as string
    );

    aggregationPipeline.push({
      $geoNear: {
        near: {
          type: "Point",
          coordinates: [longitude, latitude],
        },
        distanceField: "distance",
        spherical: true,
        maxDistance: maxDistance,
        minDistance: minDistance,
      },
    });
  }

  // Add match conditions if there are any filters
  if (andCondition.length > 0) {
    aggregationPipeline.push({
      $match: { $and: andCondition },
    });
  }

  // Add a $lookup stage for population
  aggregationPipeline.push({
    $lookup: {
      from: "users", // Replace with the related collection's name
      localField: "retireProfessional", // Field in RetireProfessional
      foreignField: "_id", // Matching field in the related collection
      as: "userDetails", // Populated field name
    },
  });

  // Optionally unwind the array if you want a single object
  aggregationPipeline.push({
    $unwind: {
      path: "$userDetails",
      preserveNullAndEmptyArrays: true, // Include results with no match
    },
  });

  // Handle sorting, skipping, and limiting
  const sortCondition: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortCondition[sortBy] = sortOrder === "desc" ? -1 : 1;
  }
  aggregationPipeline.push(
    { $sort: sortCondition },
    { $skip: skip },
    { $limit: limit }
  );

  // Execute the aggregation pipeline
  const result = await RetireProfessional.aggregate(aggregationPipeline).exec();

  // Get total document count
  const count = await RetireProfessional.countDocuments();

  return {
    meta: {
      page,
      limit,
      count,
    },
    data: result,
  };
};

export const RetireProfessionalService = {
  createProfessional,
  updateSingleRetireProfessional,
  getRetireProfessionals,
};
