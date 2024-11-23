import mongoose from "mongoose";
import { retiredProfessional } from "../professional/professional.model";
import { User } from "../user/user.model";
import { IProfessionalProfile } from "./professionalProfile.interface";

const createProfile = async (userId: string, user:any, professionalData: IProfessionalProfile) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Step 1: Update the User model with common fields
    const { name, phoneNumber, ...professionalFields } = professionalData;

    const userUpdate = await User.findByIdAndUpdate(
      userId,
      user,
      { new: true, session }
    );

    if (!userUpdate) {
      throw new Error("User not found");
    }

    // Step 2: Create the retiredProfessional profile
    const professionalProfile = await retiredProfessional.create(
      [
        {
          userId,
          ...professionalFields, // Add all fields specific to the retiredProfessional model
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

export const ProfessionalProfileService = {
  createProfile,
};