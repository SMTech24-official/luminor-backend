import { Request,Response } from "express";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { User } from "./user.model";
import { IUser } from "./user.interface";
import { ENUM_USER_ROLE } from "../../enums/user";
import { Client } from "../client/client.model";

import { ProfessionalService } from "../professional/professional.service";
import { ClientService } from "../client/client.service";

const createUser = catchAsync(async (req: Request, res: Response) => {
    const {password,name,email,dateOfBirth,role,phoneNumber,...others} = req.body;
console.log(role,"check role")
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

  export const UserController={
    createUser
  }