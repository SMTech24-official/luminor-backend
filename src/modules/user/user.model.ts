import { Schema, model } from "mongoose";

import bcrypt from "bcrypt";



import config from "../../config";
import { IUser, IUserExistReturn, UserModel } from "./user.interface";





const userSchema = new Schema<IUser, UserModel>(
  {
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
    email: {
      type: String,
      required: true,
  
      unique: true,
    },
   
    phoneNumber: {
      type: String,
      required: true,
      
      unique: true,
    },
    dateOfBirth:{
        type:Date,
        required:true
    },
    

   
    password: {
      type: String,
      required: true,
    },
 
  },
  {
    timestamps: true,
  }
);
userSchema.statics.isUserExist = async function (
  email: string
): Promise<IUserExistReturn| null> {
  return await User.findOne({ email });
};
userSchema.statics.isPasswordMatched = async function (
  givenPassword: string,
  savedPassword: string
): Promise<boolean> {
  const isPasswordMatched = await bcrypt.compare(givenPassword, savedPassword);

  return await bcrypt.compare(givenPassword, savedPassword);
};
userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_round)
  );
  next();
});

export const User = model<IUser, UserModel>("User", userSchema);