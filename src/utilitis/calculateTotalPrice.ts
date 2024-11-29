import { StatusCodes } from "http-status-codes";
import { IOffer } from "../modules/orders/offer.interface";
import ApiError from "../errors/handleApiError";

export const calculateTotalPrice = (offer: IOffer): number => {
    let totalPrice = 0;
  
    switch (offer.agreementType) {
      case 'Flat Fee':
        totalPrice = offer.flatFee ? offer.flatFee.price : 0;
        break;
      case 'Hourly Fee':
        totalPrice = offer.hourlyFee
          ? offer.hourlyFee.pricePerHour * offer.hourlyFee.delivery
          : 0;
        break;
      case 'Milestone':
        totalPrice = offer.milestones.reduce((total, milestone) => total + milestone.price, 0);
        break;
      default:
        throw new ApiError(StatusCodes.BAD_REQUEST, 'Invalid agreement type');
    }
  
    return totalPrice;
  };
