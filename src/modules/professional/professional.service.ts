import mongoose from "mongoose";
import { IUser } from "../auth/auth.interface";
import { IProfessional } from "./professional.interface";
import { User } from "../auth/auth.model";
import { RetireProfessional } from "./professional.model";
import ApiError from "../../errors/handleApiError";

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
  
  export const RetireProfessionalService={
    createProfessional
  }