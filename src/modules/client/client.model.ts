import mongoose from "mongoose";
import { IClient } from "./client.interface";

import { ENUM_SERVICE_PREFERENCE, INDUSTRIES } from "../../enums/service";

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
    companyWebsite: { type: String, default: null },
    jobTitle: { type: String, required: true },
    linkedinProfile: { type: String },
    //client profile field
    profileUrl: { type: String, default: null },
    problemAreas: { type: String, default: null },
    location: {
      type: {
        type: String,
        enum: ["Point"],
      },
      coordinates: {
        type: [Number],
      },
    },
    description: { type: String, default: null },

    servicePreference: {
      type: String,
      enum: ENUM_SERVICE_PREFERENCE,
      default: null,
    },
    industry: { type: String, defaul: null },
    budgetRange: {
      min: { type: Number, default: null },
      max: { type: Number, default: null },
    },
    projectDurationRange: {
      min: { type: Number, default: null },
      max: { type: Number, default: null },
    },
    projectListing: { type: String, default: null },
    projectUrl: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);
clientSchema.index({ location: "2dsphere" });

export const Client = mongoose.model("Client", clientSchema);
