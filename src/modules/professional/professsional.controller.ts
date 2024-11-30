import { StatusCodes } from "http-status-codes";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { Request, Response } from "express";
import { RetireProfessionalService } from "./professional.service";

const createProfessional = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;
  const file = req.file;
  console.log(req.body,"check body")

  if (file) {
    data.cvOrCoverLetter = {
      fileName: file.filename,
      filePath: file.path,
      fileType: file.mimetype,
    };
  }


  const { name, email, role, password, ...others } =(data);

  const user = {
    name,
    email,
    role,
    password,
  };
  const result = await RetireProfessionalService.createProfessional(
    user,
    others
  );

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: `retire professional   account  created   successfully`,
    data: result,
  });
});

export const RetireProfessionalController = {
  createProfessional,
};
