import { Request,Response } from "express";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";

import { ENUM_USER_ROLE } from "../../enums/user";

import { ProfessionalService } from "../professional/professional.service";
import { ClientService } from "../client/client.service";
import { UserService } from "./user.service";
import { ProfessionalProfileService } from "../professionalProfile/professionalProfile.service";
import { ClientProfileService } from "../clientProfile/clientProfile.service";

const createUser = catchAsync(async (req: Request, res: Response) => {
    const {password,name,email,dateOfBirth,role,phoneNumber,...others} = req.body;

    let result
if(role===ENUM_USER_ROLE.CLIENT){

     result=await ClientService.createAccount(
        {password:password,
            name:name,
            email:email,
            dateOfBirth:dateOfBirth,
            role:role,
            phoneNumber:phoneNumber
        }
        ,others)
}
else if(role===ENUM_USER_ROLE.PROFESSIONAL){
  result =await ProfessionalService.createAccount({password:password,
    name:name,
    email:email,
    dateOfBirth:dateOfBirth,
    role:role,
    phoneNumber:phoneNumber
}
,others)

}
  
    sendResponse(res, {
      success: true,
      statusCode: 200,
  
      message: `${role} account Created   successfully`,
      data: result,
    });
  });
  const loginUser = catchAsync(async (req: Request, res: Response) => {
    const data = req.body;

  const result =await UserService.loginUser(data)

  
    sendResponse(res, {
      success: true,
      statusCode: 200,
  
      message: `user login  successfully`,
      data: result,
    });
  });


const createProfile = catchAsync(async (req: Request, res: Response) => {
    const profile=req.body
    const userId=req.params.id
    let result;
   const { name, phoneNumber, ...others }=profile

    if(profile.role===ENUM_USER_ROLE.CLIENT){
      result=await ClientProfileService.createProfile(userId,{name,phoneNumber},others)
    }
   else if(profile.role===ENUM_USER_ROLE.PROFESSIONAL){
    result=await ProfessionalProfileService.createProfile(userId,{name,phoneNumber},others)
   }
  
    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: `
       ${profile.role} profile  Created   successfully`,
      data: result,
    });
  });


  export const ProfessionalProfile={
    createProfile,
   
  }


  export const UserController={
    createUser,
    loginUser,
    createProfile
  }