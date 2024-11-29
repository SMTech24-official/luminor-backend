import { Request ,Response} from "express";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { StatusCodes } from "http-status-codes";
import { OfferService } from "./offer.service";
import { generateOfferPDF } from "../../utilitis/generateOfferPdf";
const createOffer = catchAsync(async (req: Request, res: Response) => {
    const data = req.body;
  
    
    const offerPDFPath = await generateOfferPDF(data);
  

    data.orderAgreementPDF = offerPDFPath;
  
  
    const result = await OfferService.createOffer(data);
  
    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: `Offer created successfully`,
      data: result,
    });
  });


  export const OfferController={
    createOffer
  }