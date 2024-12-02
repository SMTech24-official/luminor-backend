import { StatusCodes } from "http-status-codes";
import { IOffer } from "../modules/offers/offer.interface";
import ApiError from "../errors/handleApiError";

export const calculateTotalPrice = (offer: IOffer): number => {
    let totalPrice = 0;
    if(offer.agreementType==="Flat_Fee"){
      totalPrice = offer.flatFee ? offer.flatFee.price : 0;
    }
    else if(offer.agreementType==="Hourly_Fee"){

      totalPrice = offer.hourlyFee
      ? offer.hourlyFee.pricePerHour * offer.hourlyFee.delivery
      : 0;
    }
    else if(offer.agreementType==="Milestone" && offer.milestones){
      totalPrice =  offer.milestones.reduce((total, milestone) => total + milestone.price, 0);
    }
    
    else{
      throw new ApiError(StatusCodes.BAD_REQUEST,"untype offer metho")
    }
  
    return totalPrice;
  };
