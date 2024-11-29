import mongoose from "mongoose";
import { IMilestone, IOffer } from "../offer.interface";



const milestoneSchema = new mongoose.Schema<IMilestone>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  revision: { type: Number, default: 0 },
  delivery: { type: Number, required: true },
});

const offerSchema = new mongoose.Schema<IOffer>({
  projectName: { type: String, required: true },
  description: { type: String, required: true },
  agreementType: {
    type: String,
    enum: ['Flat Fee', 'Hourly Fee', 'Milestone'],
    required: true,
  },
  flatFee: {
    revision: { type: Number },
    delivery: { type: Number },
    price: { type: Number },
  },
  hourlyFee: {
    revision: { type: Number },
    delivery: { type: Number },
    pricePerHour: { type: Number },
  },
  orderAgreementPDF: { type: String, required: true }, 
  milestones: [milestoneSchema],
  totalPrice: { type: Number, required: true },
  professionalId: { type: mongoose.Schema.Types.ObjectId, ref: 'RetireProfessional', required: true },
  clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },

  isAccepted: { type: Boolean, default: false },
},{timestamps:true});

export const Offer=mongoose.model<IOffer>('Offer', offerSchema);
