import { Schema, model } from "mongoose";

import bcrypt from "bcrypt";

import config from "../../../config";
import { ClientUserModel, IAuthClient } from "./auth.interface";
import { IUserExistReturn } from "../../user/user.interface";
import { ENUM_USER_ROLE } from "../../../enums/user";

const authClientSchema = new Schema<IAuthClient, ClientUserModel>(
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
    role:{
      type:String,
      required:true,
      enum: [ENUM_USER_ROLE.CLIENT], 
    },

    phoneNumber: {
      type: String,
      required: true,

      unique: true,
    },
    dateOfBirth: {
      type: Date,
      required: true,
    },

    password: {
      type: String,
      required: true,
    },
    businessType: {
      type: String,
      required: true,
    },
    companyName: {
      type: String,
    },
    jobTitle: {
      type: String,
      required: true,
    },
    linkedinProfile: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
authClientSchema.statics.isUserExist = async function (
  email: string
): Promise<IUserExistReturn | null> {
  return await AuthClient.findOne({ email });
};
authClientSchema.statics.isPasswordMatched = async function (
  givenPassword: string,
  savedPassword: string
): Promise<boolean> {
  const isPasswordMatched = await bcrypt.compare(givenPassword, savedPassword);

  return await bcrypt.compare(givenPassword, savedPassword);
};
authClientSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_round)
  );
  next();
});

export const AuthClient = model<IAuthClient, ClientUserModel>(
  "Client",
  authClientSchema
);
