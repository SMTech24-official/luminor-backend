import mongoose from "mongoose";

export type IClient = {
  client: mongoose.Schema.Types.ObjectId
name?:{
  firstName?:string,
  lastName?:string
}

  dateOfBirth:Date;
  phoneNumber:string;
  businessType:string;
  companyName?: string;

  jobTitle: string;
  linkedinProfile?: string;

  //client profile

  problemAreas?: string;
  location?: string;
  description?: string;
  companyWebsite: string;
  servicePreference?: string[];
  industry: string[];
  budgetRange?: {
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

export type IUpdateClient={
  name?:{
    firstName?:string,
    lastName?:string
  },
  companyName:string
  
  problemAreas: string;
  location: string;
  description: string;
  industry: string;
  servicePreferences: string[];
  budgetRange: {
    min: number;
    max: number;
  };
  projectDurationRange: {
    min:number
    max:number
  };
  projectListing?: {
    fileName?: string; 
    filePath?: string;
    fileType?: string; 
  };

}
export interface IFilters {
  query?: string;

}