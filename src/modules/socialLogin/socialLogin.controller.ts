import { Request, Response } from "express";
import { SocialLoginService } from "./socialLogin.service";
import catchAsync from '../../shared/catchAsync';
import sendResponse from '../../shared/sendResponse';
import  StatusCode from "http-status-codes";

// login all user form db googleCallbacks
const googleLogin = catchAsync(
  async (req: Request & { user?: any }, res: Response) => {
    const result = await SocialLoginService.googleLoginIntoDb(req.user);

    sendResponse(res, {
      statusCode: StatusCode.OK,
      success: true,
      message: "User logged In successfully!",
      data: result,
    });
  }
);

 const googleCallback = async (req: Request, res: Response) => {
  const token = await SocialLoginService.googleLoginIntoDb(req.user);
  res.redirect(`http://localhost:5000/?token=${token}`);
};

// login all user form db facebookCallback
const facebookLogin = catchAsync(
  async (req: Request & { user?: any }, res: Response) => {
    const result = await SocialLoginService.facebookLoginIntoDb(req.user);

    sendResponse(res, {
      statusCode: StatusCode.OK,
      success: true,
      message: 'User logged In successfully!',
      data: result,
    });
  }
);

// Facebook callback route
const facebookCallback = async (req: Request, res: Response) => {
  const token = await SocialLoginService.facebookLoginIntoDb(req.user);

  res.redirect(`http://localhost:3001/?token=${token}`);
  // res.status(200).send(token);
};

export const SocialLoginController = {
  googleCallback,
  googleLogin,
  facebookLogin,
  facebookCallback,
};