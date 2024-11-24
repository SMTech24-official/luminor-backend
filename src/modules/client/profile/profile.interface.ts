import mongoose from "mongoose";

export type IClientProfile = {
  name: {
    firstName: string;
    lastName: string;
  };

  client: mongoose.Schema.Types.ObjectId;
  companyName: string;
  companyWebsite: string;
  problemAreas: string;
  location: string;
  description: string;
  industry: string;
  servicePreferences: string;
  budgetRange: {
    min: number;
    max: number;
  };
  projectDurationRange: number;
  projectListing: File;
};
export type ICLientFilters = {
  query?: string;
};
