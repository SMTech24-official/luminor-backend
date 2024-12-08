import mongoose from "mongoose";
import { IClient } from "./client.interface";
import { ENUM_SERVICE_PREFERENCE } from "../../enums/service";
import { ENUM_INDUSTRY_TYPE } from "../../enums/client";

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
    problemAreas: { type: String, default: null },
    location: { type: String, default: null },
    description: { type: String, default: null },

    servicePreference: { type: [String],enum:ENUM_SERVICE_PREFERENCE, default: [] },
    industry:{type:[String], enum:ENUM_INDUSTRY_TYPE,defaul:[]},
    budgetRange: {
      min: { type: Number, default: null },
      max: { type: Number, default: null },
    },
    projectDurationRange: {
      min: { type: Number, default: null },
      max: { type: Number, default: null },
    },
    projectListing: {type:String}
   
  },
  { timestamps: true }
);

export const Client = mongoose.model("Client", clientSchema);
