import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { ENUM_USER_ROLE } from "../../../enums/user";
import sendResponse from "../../../shared/sendResponse";
import { ClientProfileService } from "./profile.service";
import pick from "../../../shared/pick";
import { paginationFileds } from "../../../constants/pagination";
import {
  filterableField,

} from "../../../constants/searchableField";
import { IClientProfile } from "./profile.interface";

const createProfile = catchAsync(async (req: Request, res: Response) => {
  const profile = req.body;
  const file = req.file;
  if (file) {
    profile.projectListing = {
      fileName: file.filename,
      filePath: file.path,
      fileType: file.mimetype,
    };
  }

  const result = await ClientProfileService.createProfile(profile);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: `client  profile  Created   successfully`,
    data: result,
  });
});
const getClients = catchAsync(async (req: Request, res: Response) => {
  const paginationOptions = pick(req.query, paginationFileds);
  const filters = pick(req.query, filterableField);
  console.log(
    filters,
    paginationOptions,
    "i am from controller to check filters"
  );
  const result = await ClientProfileService.getClients(
    filters,
    paginationOptions
  );

  sendResponse<IClientProfile[]>(res, {
    success: true,
    statusCode: 200,

    message: "Clients  retrived successfully",
    meta: result.meta,
    data: result.data,
  });
});

export const ClientProfileController = { createProfile, getClients };
