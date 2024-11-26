import mongoose from "mongoose";
import { IClient } from "./client.interface";


const clientSchema = new mongoose.Schema<IClient>({
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  //client create account field
  dateOfBirth:{
    type: Date,
    required: true,
  },
  phoneNumber:{
    type: String, required: true
  },
  businessType:{type: String, required: true},
  companyName: { type: String, required: true },
  companyWebsite: { type: String, required: true },
  jobTitle:{type: String, required: true},
  linkedinProfile:{type: String, required: true},
  //client profile field
  problemAreas: { type: String},
  location: { type: String },
  description: { type: String },
  industry: { type: String },
  servicePreferences: { type: String },
  budgetRange: {
    min: { type: Number},
    max: { type: Number },
  },
  projectDurationRange: { type: Number },
  projectListing: {
    fileName: { type: String },
    filePath: { type: String },
    fileType: { type: String },
    uploadedAt: { type: Date, default: Date.now },
  },
});

export const Client = mongoose.model(
  "Client",
  clientSchema
);
