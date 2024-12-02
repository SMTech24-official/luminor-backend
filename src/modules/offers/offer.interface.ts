import { ObjectId } from "mongoose";
export type IMilestone = {
  title: string;
  description: string;
  price: number;
  revision: number;
  delivery: number; // in days
};

export type IOffer = {
  projectName: string;
  description: string;
  agreementType: "Flat_Fee" | "Hourly_Fee" | "Milestone";
  flatFee?: {
    revision: number;
    delivery: number;
    price: number;
  };
  hourlyFee?: {
    revision: number;
    delivery: number;
    pricePerHour: number;
  };
  orderAgreementPDF: string; // PDF file path or URL
  milestones?: IMilestone[]; // Array of milestone objects
  totalPrice: number;
  professionalId: ObjectId; // Refers to the RetireProfessional model
  clientId: ObjectId; // Refers to the Client model
  createdAt: Date;
  isAccepted: boolean;
};
