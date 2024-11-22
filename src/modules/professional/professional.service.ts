import mongoose from "mongoose";
import { IClient } from "../client/client.interface";
import { IUser } from "../shared/user.interface";
import { User } from "../shared/user.model";
import { Client } from "../client/client.model";
import ApiError from "../../errors/handleApiError";
import { IProfessional } from "./professional.interface";
import { retiredProfessional } from "./professional.model";

const createAccount = async (userData: IUser, professionalData: IProfessional) => {
  console.log(userData)
  console.log(professionalData)
  const session = await mongoose.startSession();
  session.startTransaction(); // Start the transaction
  try {

    const user = await User.create([userData], { session });


    const professional = await retiredProfessional.create(
      [
        {
          ...professionalData,
          user: user[0]._id,
        },
      ],
      { session }
    );


    await session.commitTransaction();
    session.endSession();
    return {
    
        name: user[0].name,
        email: user[0].email,
        phoneNumber: user[0].phoneNumber,
        dateOfBirth: user[0].dateOfBirth,
        password: user[0].password, // Encrypted
   
    

        previousPositions: professional[0].previousPositions,
        referencenames: professional[0].referencenames,
        referenceEmail: professional[0].referenceEmail,
        educationalBackground: professional[0].educationalBackground,
        technicalSkill: professional[0].technicalSkill,
    }
    
    
  } catch (error:any) {

    await session.abortTransaction();
    session.endSession();
    throw new ApiError(400,`Transaction failed: ${error.message}`);
  }
};

export const ProfessionalService = {
  createAccount,
};
