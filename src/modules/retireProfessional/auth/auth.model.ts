import { Schema, model } from "mongoose";

import bcrypt from "bcrypt";

import config from "../../../config";
import {
  IAuthRetireProfessional,
  RetiredProfessionalUserModel,
} from "./auth.interface";
import { IUserExistReturn } from "../../user/user.interface";

const authRetireProfessionalSchema = new Schema<
  IAuthRetireProfessional,
  RetiredProfessionalUserModel
>(
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
    dateOfBirth: {
      type: Date,
      required: true,
    },

    password: {
      type: String,
      required: true,
    },
    industry: {
      type: String,
      required: true,
    },

    previousPositions: {
      type: [String],
      required: true,
    },
    referencenames: {
      type: [String],
    },
    referenceEmail: {
      type: [String],
      required: true,
    },
    educationalBackground: {
      type: String,
    },
    technicalSkill: {
      type: String,
      required: true,
    },
    cvOrCover: {
      fileName: { type: String },
      filePath: { type: String },
      fileType: { type: String },
    },
  },
  {
    timestamps: true,
  }
);
authRetireProfessionalSchema.statics.isUserExist = async function (
  email: string
): Promise<IUserExistReturn | null> {
  return await AuthRetireProfessional.findOne({ email });
};
authRetireProfessionalSchema.statics.isPasswordMatched = async function (
  givenPassword: string,
  savedPassword: string
): Promise<boolean> {
  const isPasswordMatched = await bcrypt.compare(givenPassword, savedPassword);

  return await bcrypt.compare(givenPassword, savedPassword);
};
authRetireProfessionalSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_round)
  );
  next();
});

export const AuthRetireProfessional = model<
  IAuthRetireProfessional,
  RetiredProfessionalUserModel
>("RetireProfessional", authRetireProfessionalSchema);
