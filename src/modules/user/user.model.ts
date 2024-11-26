import mongoose from "mongoose";
import { IUser } from "./user.interface";
import { ENUM_USER_ROLE } from "../../enums/user";


const userSchema =
  new mongoose.Schema<IUser>({
    name: {
        firstName: {
          type: String,
          required: true,
        },
        lastName: {
          type: String,
          required: true,
        },
      },
    role:{
        type:String,
        required:true,
        enum: ENUM_USER_ROLE, 
      },
    email: { type: String, required: true },
    password:{type:String,required:true}
    
  });

export const User = mongoose.model(
  "User",
  userSchema
);
