import mongoose from "mongoose";
import { IClientProfile } from "./profile.interface";
import { ClientProfile } from "./profile.model";
import { AuthClient } from "../auth/auth.model";
import ApiError from "../../../errors/handleApiError";

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

export const ClientProfileService = {
  createProfile,
};
