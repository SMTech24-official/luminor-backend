import mongoose from "mongoose";
import { IClientProfile } from "./clientProfile.interface";

const clientProfileSchema = new mongoose.Schema< IClientProfile>({
    client: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
    companyName: { type: String, required: true },
    companyWebsite: { type: String, required: true },
    problemAreas: { type: String, required: true },
    location: { type: String, required: true },
    description: { type: String },
    industry: { type: String, required: true },
    servicePreferences: { type: String, required: true },
    budgetRange: { type: Number, required: true },
    projectDurationRange: { type: Number, required: true },
    projectListing: {     
    fileName: { type: String, required: true },
    filePath: { type: String, required: true },
    fileType: { type: String }, },
  });
  
  export const ClientProfile = mongoose.model('ClientProfile', clientProfileSchema);

   