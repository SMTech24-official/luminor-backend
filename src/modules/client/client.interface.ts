import mongoose from "mongoose";

export type IClient = {
  client: mongoose.Schema.Types.ObjectId;
  name?: {
    firstName?: string;
    lastName?: string;
  };

  dateOfBirth: Date;
  phoneNumber: string;
  businessType: string;
  companyName?: string;

  jobTitle: string;
  linkedinProfile?: string;

  //client profile
  profileUrl?: string;
  problemAreas?: string;
  location?: {
    type: string;
    coordinates: [number];
  };
  description?: string;
  companyWebsite: string;
  servicePreference?: string;
  industry: string;
  budgetRange?: {
    min: number;
    max: number;
  };
  projectDurationRange?: number;
  projectListing?: string;
  projectUrl?: string;
};

// export type IUpdateClient = {
//   name?: {
//     firstName?: string;
//     lastName?: string;
//   };
//   companyName: string;

//   problemAreas: string;
//   location: {
//     lang: string;
//     lat: string;
//   };
//   description: string;
//   industry: string;
//   servicePreferences: string[];
//   budgetRange: {
//     min: number;
//     max: number;
//   };
//   projectDurationRange: {
//     min: number;
//     max: number;
//   };
//   projectListing?: string;
// };
