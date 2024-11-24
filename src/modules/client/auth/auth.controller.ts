import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { AuthClientService } from "./auth.service";
import sendResponse from "../../../shared/sendResponse";

const createAccount = catchAsync(async (req: Request, res: Response) => {
  const client = req.body;

  const data = await AuthClientService.createAccount(client);

  sendResponse(res, {
    success: true,
    statusCode: 200,

    message: `Client Account Created   Successfully`,
    data: data,
  });
});
const loginUser = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;
  const result = await AuthClientService.loginUser(data);

  sendResponse(res, {
    success: true,
    statusCode: 200,

    message: `user  login  successfully`,
    data: result,
  });
});

export const AuthClientController = {
  createAccount,
  loginUser,
};
