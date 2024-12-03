import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { StatusCodes } from "http-status-codes";

import { ReviewsService } from "./reviews.service";

const postReviews = catchAsync(async (req: Request, res: Response) => {
    const review=req.body
    const professionalId=req.params.id
   const result=await ReviewsService.postReviews(professionalId,review)
  
    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
  
      message: "your review post successfully",
     
      data: result,
    });
  });

  export const ReviewController={
    postReviews
  }