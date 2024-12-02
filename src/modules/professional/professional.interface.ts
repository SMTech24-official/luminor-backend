import mongoose from "mongoose";
export type IReview = {
  rating: number; 
  feedBack: string; 
  reviewer: mongoose.Schema.Types.ObjectId; 
  createdAt: Date; 
};

export type IProfessional = {
  //create account field
  retireProfessional: mongoose.Schema.Types.ObjectId;

  firstName?: string;
  lastName?: string;

  dateOfBirth: Date;
  phoneNumber: string;
  previousPositions: string[];
  references: Array<{
    emailOrPhone: string;
    name: string;
  }>;
  educationalBackground: string;
  technicalSkill: string;
  cvOrCoverLetter?: {
    fileName?: string;
    filePath?: string;
    fileType?: string;
  };
  linkedinProfile?: string;

  //retire professional profile field

  location?: string;
  bio: string;
  description?: string;
  expertise: string[];
  industry: string[];
  relevantQualification: string;

  businessType: string;

  availability?: string;

  preferedProjects: string;
  hourlyRate: string;
  workSample?: {
    fileName?: string;
    filePath?: string;
    fileType?: string;
  };
  reviews:IReview,
  averageRating:number
};
export type IUpdateClient = {
  name?: {
    firstName?: string;
    lastName?: string;
  };
  companyName: string;

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
    min: number;
    max: number;
  };
  projectListing?: {
    fileName?: string;
    filePath?: string;
    fileType?: string;
  };
};
export interface IProfessionalFilter {
  query?: string;
}
