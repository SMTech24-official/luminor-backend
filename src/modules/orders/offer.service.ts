
import { calculateTotalPrice } from "../../utilitis/calculateTotalPrice";
import { IOffer } from "./offer.interface";
import { Offer } from "./offer.model/offer.model";

const createOffer = async (offer: IOffer) => {
  offer.totalPrice = calculateTotalPrice(offer);

  const newOffer = await Offer.create(offer);

  return newOffer;
};

export const OfferService = {
  createOffer,
};
