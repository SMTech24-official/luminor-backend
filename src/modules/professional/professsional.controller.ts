import { StatusCodes } from "http-status-codes";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { Request, Response } from "express";
import { RetireProfessionalService } from "./professional.service";
import pick from "../../shared/pick";
import { paginationFileds } from "../../constants/pagination";
import { filterableField } from "../../constants/searchableField";
import { IProfessional } from "./professional.interface";
import ApiError from "../../errors/handleApiError";
import { uploadFileToSpace } from "../../utilitis/uploadTos3";

const createProfessional = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;
  const file = req.file;
  // console.log(req.body, "check body");
  console.log(file,"check file")

  if (!file) {
     throw new ApiError(400,"file not found")
  }
  
  const fileUrl = await uploadFileToSpace(file, "retire-professional"); 
  console.log(fileUrl,"check url")
  console.log(req.body,"check body")
  const { name, email, role, password, ...others } = data;

  const user = {
    name,
    email,
    role,
    password,
  };
  const professionalData = {
    ...others,
    cvOrCoverLetter: fileUrl, // Save the file URL in the database
  };
  const result = await RetireProfessionalService.createProfessional(
    user,
    professionalData
  );

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: `retire professional   account  created   successfully`,
    data: result,
  });
});
const updateSingleRetireProfessional = catchAsync(
  async (req: Request, res: Response) => {


    const file = req.file;
    // console.log(req.body, "check body");
    console.log(file,"check file")
  
    if (!file) {
       throw new ApiError(400,"file not found")
    }
    const fileUrl = await uploadFileToSpace(file, "retire-professional"); 

    const { name, ...retireProfessionalProfile } = req.body;
    
    const auth = {name:JSON.parse(name) };
    const { workSample, ...others } = retireProfessionalProfile;
    const updatedProfile = {
      ...others,
      workSample: fileUrl,
    };
    const result =
      await RetireProfessionalService.updateSingleRetireProfessional(
        req.params.id,
        auth,
        updatedProfile
      );

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.ACCEPTED,
      message: `retire professional  account  updated    successfully`,
      data: result,
    });
  }
);

const getReitereProfessionals = catchAsync(async (req: Request, res: Response) => {
  const paginationOptions = pick(req.query, paginationFileds);
  const filters = pick(req.query, filterableField);

  const result = await RetireProfessionalService.getReitereProfessionals(
    filters,
    paginationOptions
  );

  sendResponse<IProfessional[]>(res, {
    success: true,
    statusCode: StatusCodes.OK,

    message: "Retire professional   retrived successfully",
    meta: result.meta,
    data: result.data,
  });
});

export const RetireProfessionalController = {
  createProfessional,
  updateSingleRetireProfessional,
  getReitereProfessionals
};
