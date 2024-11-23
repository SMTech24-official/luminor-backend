import mongoose from "mongoose";
import { IClient } from "./client.interface";

import { Client } from "./client.model";
import ApiError from "../../errors/handleApiError";
import { User } from "../user/user.model";
import { IUser } from "../user/user.interface";

const createAccount = async (userData: IUser, clientData: IClient) => {
  const session = await mongoose.startSession();
  // console.log(userData,"check user data")
  // console.log(clientData,"check client data")
  session.startTransaction(); 
  try {

    const user = await User.create([userData], { session });


    const client = await Client.create(
      [
        {
          ...clientData,
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
        role: user[0].role,
      companyName: client[0].companyName,
        businessName:client[0].businessType,
        jobTitle:client[0].jobTitle


    
    };
  } catch (error:any) {

    await session.abortTransaction();
    session.endSession();
    throw new ApiError(400,`Transaction failed: ${error.message}`);
  }
};

const getClient=async()=>{

}
export const ClientService = {
  createAccount,
  getClient
};
