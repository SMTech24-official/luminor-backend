import { Request ,Response} from "express";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { AuthService } from "./auth.service";
import config from "../../config";
import {
	
	StatusCodes,
	
} from 'http-status-codes';

const loginUser = catchAsync(async (req: Request, res: Response) => {
    const { ...loginData } = req.body;
  
    const result = await AuthService.loginUser(loginData);
  

  
  
    
  
  
      sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "User logged in successfully!",
        data: result,
      });
    
  });
  export const AuthController={

    loginUser
  }