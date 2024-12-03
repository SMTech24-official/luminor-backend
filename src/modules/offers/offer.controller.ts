import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { StatusCodes } from "http-status-codes";
import { OfferService } from "./offer.service";
import { generateOfferPDF } from "../../utilitis/generateOfferPdf";
import { calculateTotalPrice } from "../../utilitis/calculateTotalPrice";
const createOffer = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;

  data.totalPrice = calculateTotalPrice(data);
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

const getOffersByProfessional = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await OfferService.getOffersByProfessional(id);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: `Retire Professional Offers get successfully`,
    data: result,
  });
});

const getSingleOffer = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  console.log(id,"check params")
  const result = await OfferService.getSingleOffer(id);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: `single offer get successfully`,
    data: result,
  });
});

export const OfferController = {
  createOffer,
  getOffersByProfessional,
  getSingleOffer
};
