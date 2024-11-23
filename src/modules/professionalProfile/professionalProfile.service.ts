import mongoose from "mongoose";

import { User } from "../user/user.model";
import { IProfessionalProfile } from "./professionalProfile.interface";
import { RetiredProfessionalProfile } from "./professionalProfile.model";

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


    const professionalProfile = await RetiredProfessionalProfile.create(
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

export const ProfessionalProfileService = {
  createProfile,
};