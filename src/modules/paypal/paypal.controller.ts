


import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { paymentService } from "./paypal.service";

//payment from owner to rider
const paypalPayementClientToProfessional = catchAsync(async (req: any, res: any) => {
  const { email, amount } = req.body;
  const result = await paymentService.paypalPayementClientToProfessional(email, amount);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Payment successful",
    data: result,
  });
});




export const paypalController = {
    paypalPayementClientToProfessional,

};
