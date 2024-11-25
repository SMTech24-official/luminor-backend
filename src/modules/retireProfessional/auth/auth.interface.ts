import { Model } from "mongoose";
import { ENUM_USER_ROLE } from "../../../enums/user";
import { IUserExistReturn } from "../../user/user.interface";

export type IAuthRetireProfessional = {
  password: string;
  email: string;

  name: {
    firstName: string;
    lastName: string;
  };

  role: ENUM_USER_ROLE.RetireProfessional;
  dateOfBirth: Date;
  phoneNumber: string;
  previousPositions: string[];
  linkedinProfile:string,
  references: { name: string; email: string }[]; 
  educationalBackground?: string;
  technicalSkill: string;
  cvOrCover?: File;
  industry: string;
};
export type RetiredProfessionalUserModel = {
  isUserExist(
    email: string
  ): Promise<Pick<IUserExistReturn, "email" | "password" | "_id" | "role">>;
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>;
} & Model<IAuthRetireProfessional>;
export type IUserRole = "client" | "professional";
