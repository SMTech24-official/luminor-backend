import { Secret } from "jsonwebtoken";
import config from "../../config";
import ApiError from "../../errors/handleApiError";
import { ILoginUser, ILoginUserResponse } from "./auth.interface";
import { User } from "./auth.model";
import { StatusCodes } from "http-status-codes";

import emailSender from "../../utilitis/emailSender";
import { jwtHelpers } from "../../helpers/jwtHelpers";

const loginUser = async (payload: ILoginUser) => {
  const { email, password } = payload;
  console.log(password,"check password")

  const isUserExist = await User.isUserExist(email);

  if (!isUserExist) {
    throw new ApiError(StatusCodes.NOT_FOUND, "User Doesn,t Exist");
  }

  if (
    isUserExist.password &&
    !(await User.isPasswordMatched(password, isUserExist.password))
  ) {
    throw new ApiError(StatusCodes.UNAUTHORIZED, "Password is incorrect");
  }

  const { _id: userId, email: userEmail, role } = isUserExist;

  const randomOtp = Math.floor(1000 + Math.random() * 9000).toString();
  const otpExpiry = new Date(Date.now() + 5 * 60 * 1000);

  const html = `<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>OTP Verification</title>
  </head>
  <body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f6f9fc; margin: 0; padding: 0; line-height: 1.6;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);">
          <div style="background-color: #FF7600; background-image: linear-gradient(135deg, #FF7600, #45a049); padding: 30px 20px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 600; text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);">OTP Verification</h1>
          </div>
          <div style="padding: 20px 12px; text-align: center;">
              <p style="font-size: 18px; color: #333333; margin-bottom: 10px;">Hello,</p>
              <p style="font-size: 18px; color: #333333; margin-bottom: 20px;">Your OTP for verifying your account is:</p>
              <p style="font-size: 36px; font-weight: bold; color: #FF7600; margin: 20px 0; padding: 10px 20px; background-color: #f0f8f0; border-radius: 8px; display: inline-block; letter-spacing: 5px;">${randomOtp}</p>
              <p style="font-size: 16px; color: #555555; margin-bottom: 20px; max-width: 400px; margin-left: auto; margin-right: auto;">Please enter this OTP to complete the verification process. This OTP is valid for 5 minutes.</p>
              <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #e0e0e0;">
                  <p style="font-size: 14px; color: #888888; margin-bottom: 4px;">Thank you for choosing our service!</p>
                  <p style="font-size: 14px; color: #888888; margin-bottom: 0;">If you didn't request this OTP, please ignore this email.</p>
              </div>
          </div>
          <div style="background-color: #f9f9f9; padding: 10px; text-align: center; font-size: 12px; color: #999999;">
              <p style="margin: 0;">© 2023 Your Company Name. All rights reserved.</p>
          </div>
      </div>
  </body>
  </html>`;

  await emailSender("OTP", userEmail, html);

  const result = await User.updateOne(
    { _id: userId }, // Filter object
    {
      $set: {
        otp: randomOtp,
        otpExpiry: otpExpiry,
      },
    } // Update object
  );
  if (result.modifiedCount === 0) {
    throw new ApiError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      "Failed to update OTP"
    );
  }
  return ;

  // const accessToken = jwtHelpers.createToken(
  //   { _id, userEmail, role },
  //   config.jwt.secret as Secret,
  //   config.jwt.expires_in as string
  // );

  // return {
  //   accessToken,
  //   user:isUserExist

  // };
};
const enterOtp = async (payload: { otp: string; identifier: string }) => {
  const userData = await User.findOne({
    otp: payload.otp,
  });

  if (!userData) {
    throw new ApiError(404, "Your otp is incorrect");
  }

  if (userData.otpExpiry && userData.otpExpiry < new Date()) {
    throw new ApiError(400, "Your otp has been expired");
  }

  const accessToken = jwtHelpers.createToken(
    {
      id: userData.id,
      email: userData.email,
      role: userData.role,
    },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  await User.updateOne(
    { _id: userData.id }, // Filter object
    {
      $set: {
        otp: undefined,
        otpExpiry: undefined,
      },
    } // Update object
  );
  const result = {
    accessToken,
    user:{
      email: userData.email,
      role: userData.role,
    }
  };

  return result;
};

export const AuthService = {
  loginUser,
  enterOtp,
};
