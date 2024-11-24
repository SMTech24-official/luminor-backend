import mongoose from "mongoose";
import { IClientProfile } from "./profile.interface";

const clientProfileSchema = new mongoose.Schema<IClientProfile>({
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Client",
    required: true,
  },
  companyName: { type: String, required: true },
  companyWebsite: { type: String, required: true },
  problemAreas: { type: String, required: true },
  location: { type: String, required: true },
  description: { type: String },
  industry: { type: String, required: true },
  servicePreferences: { type: String, required: true },
  budgetRange: {
    min: { type: Number, required: true },
    max: { type: Number, required: true },
  },
  projectDurationRange: { type: Number, required: true },
  projectListing: {
    fileName: { type: String },
    filePath: { type: String },
    fileType: { type: String },
  },
});

export const ClientProfile = mongoose.model(
  "ClientProfile",
  clientProfileSchema
);
