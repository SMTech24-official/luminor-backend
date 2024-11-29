import mongoose from "mongoose";
import { IClient } from "./client.interface";

const clientSchema = new mongoose.Schema<IClient>(
  {
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    //client create account field
    dateOfBirth: {
      type: Date,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    businessType: { type: String, required: true },
    companyName: { type: String, default: null },
    companyWebsite: { type: String, required: true },
    jobTitle: { type: String, required: true },
    linkedinProfile: { type: String, required: true },
    //client profile field
    problemAreas: { type: String, default: null },
    location: { type: String, default: null },
    description: { type: String, default: null },

    industry: { type: [String], default: [] },
    budgetRange: {
      min: { type: Number, default: null },
      max: { type: Number, default: null },
    },
    projectDurationRange: {
      min: { type: Number, default: null },
      max: { type: Number, default: null },
    },
    projectListing: {
      fileName: { type: String, default: null },
      filePath: { type: String, default: null },
      fileType: { type: String, default: null },
    },
   
  },
  { timestamps: true }
);

export const Client = mongoose.model("Client", clientSchema);
