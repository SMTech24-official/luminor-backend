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
import { IUser } from "../auth/auth.interface";

const createProfessional = catchAsync(async (req: Request, res: Response) => {
  const file = req.file as unknown as Express.Multer.File;
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
    const files = req.files as Express.Multer.File[]; // Get all files uploaded
    const fileMap: { [key: string]: Express.Multer.File } = {};

    // Map files to their respective fields by matching `fieldname`
    files.forEach((file) => {
      fileMap[file.fieldname] = file;
    });

    // Process each file if it exists
    let workSampleUrl;
    let profileImageUrl;

    if (fileMap["workSample"]) {
      workSampleUrl = await uploadFileToSpace(
        fileMap["workSample"],
        "work-samples"
      );
    }

    if (fileMap["profileUrl"]) {
      profileImageUrl = await uploadFileToSpace(
        fileMap["profileUrl"],
        "profileUrl"
      );
    }

    // Parse and update body fields
    const { name, ...retireProfessionalProfile } = req.body;

    const auth = { name };
    const { workSample, profileImage, ...others } = retireProfessionalProfile;

    // Include uploaded file URLs in the update payload
    const updatedProfile = {
      ...others,
      workSample: workSampleUrl,
      profileUrl: profileImageUrl,
    };

    // Call service to update
    const result =
      await RetireProfessionalService.updateSingleRetireProfessional(
        req.params.id,
        auth,
        updatedProfile
      );

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: `Retire professional account updated successfully`,
      data: result,
    });
  }
);

const getRetireProfessionals = catchAsync(
  async (req: Request, res: Response) => {
    const paginationOptions = pick(req.query, paginationFileds);
    const filters = pick(req.query, filterableField);
    // console.log(filters)

    const result = await RetireProfessionalService.getRetireProfessionals(
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
  getRetireProfessionals,
};
