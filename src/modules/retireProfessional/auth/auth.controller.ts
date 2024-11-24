import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";

import sendResponse from "../../../shared/sendResponse";
import { AuthRetireProfessionalService } from "./auth.service";

const createAccount = catchAsync(async (req: Request, res: Response) => {
  const retireProfessional = req.body;

  const data = await AuthRetireProfessionalService.createAccount(
    retireProfessional
  );

  sendResponse(res, {
    success: true,
    statusCode: 200,

    message: `Retire Professional Account Created   Successfully`,
    data: data,
  });
});
const loginUser = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;
  const result = await AuthRetireProfessionalService.loginUser(data);

  sendResponse(res, {
    success: true,
    statusCode: 200,

    message: `user  login  successfully`,
    data: result,
  });
});

export const AuthRetireProfessionalController = {
  createAccount,
  loginUser,
};
