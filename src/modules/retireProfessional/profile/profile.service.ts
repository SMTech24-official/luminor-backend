import mongoose from "mongoose";

import { IProfessionalProfile } from "./profile.interface";

import { AuthRetireProfessional } from "../auth/auth.model";
import { RetireProfessionalProfile } from "./profile.model";
import ApiError from "../../../errors/handleApiError";

export const createProfile = async (data: IProfessionalProfile) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { retireProfessional, name, ...profileData } = data;

    const updatedClient = await AuthRetireProfessional.findByIdAndUpdate(
      retireProfessional,
      { name },
      { new: true, runValidators: true, session }
    );

    if (!updatedClient) {
      throw new Error("Client not found.");
    }

    const newProfile = await RetireProfessionalProfile.create(
      [
        {
          retireProfessional,
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

export const getClients = async () => {};

export const RetireProfessionalProfileService = {
  createProfile,
  getClients,
};
