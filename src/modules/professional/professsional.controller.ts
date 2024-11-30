import { StatusCodes } from "http-status-codes";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { Request, Response } from "express";
import { RetireProfessionalService } from "./professional.service";

const createProfessional = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;
  const file = req.file;
  console.log(req.body, "check body");

  if (file) {
    data.cvOrCoverLetter = {
      fileName: file.filename,
      filePath: file.path,
      fileType: file.mimetype,
    };
  }

  const { name, email, role, password, ...others } = data;

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
const updateSingleRetireProfessional = catchAsync(
  async (req: Request, res: Response) => {


    // console.log(req.body)

    if (req.file) {
      req.body.workSample = {
        fileName: req.file.filename,
        filePath: req.file.path,
        fileType: req.file.mimetype,
      };
    }
    const { name, ...retireProfessionalProfile } = req.body;

    const auth = { name: JSON.parse(name) };

    const result =
      await RetireProfessionalService.updateSingleRetireProfessional(
        req.params.id,
        auth,
        retireProfessionalProfile
      );

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.ACCEPTED,
      message: `retire professional  account  updated    successfully`,
      data: result,
    });
  }
);

export const RetireProfessionalController = {
  createProfessional,
  updateSingleRetireProfessional,
};
