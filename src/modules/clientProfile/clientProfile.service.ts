import mongoose from "mongoose";

import { User } from "../user/user.model";
import { IClientProfile } from "./clientProfile.interface";
import { ClientProfile } from "./clientProfile.model";


const createProfile = async (userId: string, user:any, clientProfileData: IClientProfile) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Step 1: Update the User model with common fields
    const { name, phoneNumber, ...professionalFields } = clientProfileData;


    const userUpdate = await User.findByIdAndUpdate(
      userId,
      user,
      { new: true, session }
    );

    if (!userUpdate) {
      throw new Error("User not found");
    }


    const professionalProfile = await  ClientProfile.create(
      [
        {
          userId,
          ...professionalFields, 
        },
      ],
      { session }
    );

    // Commit the transaction
    await session.commitTransaction();
    session.endSession();

    return professionalProfile;
  } catch (error:any) {
    // Rollback transaction in case of error
    await session.abortTransaction();
    session.endSession();
    throw new Error(`Failed to create profile: ${error.message}`);
  }
};

export const ClientProfileService = {
  createProfile,
};