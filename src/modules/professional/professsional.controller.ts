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
  const file = req.file  as unknown as Express.Multer.File;
  let fileUrl;


  console.log(fileUrl, "check url");
  const { name, email, role, password, ...others } = req.body;

  const user = {
    name,
    email,
    role,
    password,
  };
  const professionalData = {
    ...others,
    // cvOrCoverLetter: fileUrl, // Save the file URL in the database
  };
  const result = await RetireProfessionalService.createProfessional(
    user,
    professionalData,
    file

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
    console.log(req.body, "check body");
    let fileUrl

    if (file) {
       fileUrl = await uploadFileToSpace(file, "retire-professional");
    }


    const { name, ...retireProfessionalProfile } = req.body;

    const auth = { name };
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
      statusCode: StatusCodes.OK,
      message: `retire professional  account  updated    successfully`,
      data: result,
    });
  }
);

const getReitereProfessionals = catchAsync(
  async (req: Request, res: Response) => {
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
  }
);

export const RetireProfessionalController = {
  createProfessional,
  updateSingleRetireProfessional,
  getReitereProfessionals,
};
