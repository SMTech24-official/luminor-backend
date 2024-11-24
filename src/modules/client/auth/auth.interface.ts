import { Model } from "mongoose";
import { ENUM_USER_ROLE } from "../../../enums/user";
import { IUserExistReturn } from "../../user/user.interface";

export type IAuthClient = {
  password: string;
  email: string;

  name: {
    firstName: string;
    lastName: string;
  };

  role: ENUM_USER_ROLE.CLIENT;
  dateOfBirth: Date;
  phoneNumber: string;
  businessType: string;

  companyName: string;
  jobTitle: string;
  linkedinProfile: string;
};
export type ClientUserModel = {
  isUserExist(
    email: string
  ): Promise<Pick<IUserExistReturn, "email" | "password" | "_id" | "role">>;
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>;
} & Model<IAuthClient>;
export type IUserRole = "client" | "professional";
