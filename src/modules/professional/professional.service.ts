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
  export const RetireProfessionalService={
    createProfessional,
    updateSingleRetireProfessional
  }