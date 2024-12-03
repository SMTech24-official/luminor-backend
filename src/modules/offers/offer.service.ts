
import { calculateTotalPrice } from "../../utilitis/calculateTotalPrice";
import { IOffer } from "./offer.interface";
import { Offer } from "./offer.model";


const createOffer = async (offer: IOffer) => {
  offer.totalPrice = calculateTotalPrice(offer);

  const newOffer = await Offer.create(offer);

  return newOffer;
};
const getOffersByProfessional=async (id:string) => {


  const offer = await Offer.find({clientId:id});

  return offer;
};
const getSingleOffer=async(id:string)=>{

  const offer=await Offer.findById(id)
  console.log(offer,"offer")
  return offer


}
export const OfferService = {
  createOffer,
  getOffersByProfessional,
  getSingleOffer
};
