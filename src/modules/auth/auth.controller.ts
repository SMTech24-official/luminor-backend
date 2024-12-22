import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { AuthService } from "./auth.service";
import config from "../../config";
import { StatusCodes } from "http-status-codes";



const loginUser = catchAsync(async (req: Request, res: Response) => {
  const { ...loginData } = req.body;

  const result = await AuthService.loginUser(loginData);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "send otp",
    data: result,
  });
});

const enterOtp = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.enterOtp(req.body);
  AuthService
  // res.cookie("token", result.accessToken, { httpOnly: true });
  res.cookie("token", result.accessToken, {
    secure: config.env === "production",
    httpOnly: true,
    sameSite: "none",
    maxAge: 1000 * 60 * 60 * 24 * 365,
  });

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "User logged in successfully",
    data: result,
  });
});
const getProfile= catchAsync(async (req: Request, res: Response) => {
const user=req.user as any

console.log(user,"check user")
  // res.cookie("token", result.accessToken, { httpOnly: true });
  const result=await AuthService.getProfile(user.id)
  
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "User profile get successfully",
    data: result,
  });
});




export const AuthController = {
  loginUser,
  enterOtp,
  getProfile
};
