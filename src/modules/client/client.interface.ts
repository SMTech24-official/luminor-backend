import mongoose from "mongoose";

export type IClient = {

  //client account create field
  client: mongoose.Schema.Types.ObjectId
  dateOfBirth:Date;
  phoneNumber:string;
  businessType:string;
  companyName?: string;
  companyWebsite: string;
  jobTitle: string;
  linkedinProfile?: string;

  //client profile

  problemAreas?: string;
  location?: string;
  description?: string;
  industry?: string;
  servicePreferences?: string;
  budgetRange: {
    min: number;
    max: number;
  };
  projectDurationRange?: number;
  projectListing?: {
    fileName?: string; 
    filePath?: string;
    fileType?: string; 
  };
};
export type ICLientFilters = {
  query?: string;
};
