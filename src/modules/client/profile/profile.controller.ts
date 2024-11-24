import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { ENUM_USER_ROLE } from "../../../enums/user";
import sendResponse from "../../../shared/sendResponse";
import { ClientProfileService } from "./profile.service";

const createProfile = catchAsync(async (req: Request, res: Response) => {
  const profile = req.body;
  const result = await ClientProfileService.createProfile(profile);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: `client  profile  Created   successfully`,
    data: result,
  });
});
export const ClientProfileController = { createProfile };
