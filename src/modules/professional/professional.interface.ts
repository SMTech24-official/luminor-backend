import mongoose from "mongoose";
export type IReview = {
  rating: number; 
  feedBack: string; 
  user: mongoose.Schema.Types.ObjectId; 
  createdAt: Date; 
};

export type IProfessional = {
  //create account field
  retireProfessional: mongoose.Schema.Types.ObjectId;

name:{
  firstName?: string;
  lastName?: string;
};

  dateOfBirth: Date;
  phoneNumber: string;
  previousPositions: string[];
  references: Array<{
    emailOrPhone: string;
    name: string;
  }>;
  educationalBackground: string;
  technicalSkill: string;
  cvOrCoverLetter?:string;
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
  workSample?:string;
  reviews:IReview;
  averageRating:number
};

export interface IProfessionalFilter {
  query?: string;
}
