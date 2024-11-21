import { Request, Response } from "express";
import { UserService } from "./client.server";
import catchAsync from "../../shared/catchAsync"
import sendResponse from "../../shared/sendResponse";

const createUser = catchAsync(async (req: Request, res: Response) => {


  // Check if userBody is undefined
  const user=req.body
  
  const result = await UserService.createUser(user);


    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: `client  Account created successfully.`,
      data: result,
    });
  
});


export const UserController = {
  createUser,

};