import { Request,Response } from "express";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";

import { ProfessionalProfileService } from "./professionalProfile.service";

const createProfile = catchAsync(async (req: Request, res: Response) => {
    const profile=req.body
    const userId=req.params.id
    const result=await ProfessionalProfileService.createProfile(userId,profile)
  
    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: `
      profile  Created   successfully`,
      data: result,
    });
  });


  export const ProfessionalProfile={
    createProfile,
   
  }