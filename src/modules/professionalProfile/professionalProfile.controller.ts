import { Request,Response } from "express";
import catchAsync from "../../shared/catchAsync";
import { ProfessionalProfile } from "../user/user.controller";
import { ProfessionalProfileService } from "./professionalProfile.service";
import sendResponse from "../../shared/sendResponse";
import pick from "../../shared/pick";
import { paginationFileds } from "../../constants/pagination";
import { searchableField } from "../clientProfile/clientProfile.const";

const getProfessional = catchAsync(async (req: Request, res: Response) => {
   
    const paginationOptions = pick(req.query, paginationFileds);
  const filters = pick(req.query, searchableField);
  console.log(paginationOptions,filters)
    const result =await ProfessionalProfileService.getProfessional(filters,paginationOptions)

  
    sendResponse(res, {
      success: true,
      statusCode: 200,
  
      message: `retire professional get   successfully`,
      data: result,
    });
  });
export const ProfessionalProfileController={
    getProfessional
}