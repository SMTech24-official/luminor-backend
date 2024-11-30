import mongoose from "mongoose";

export type IProfessional = {
  //retire professional account
  retireProfessional: mongoose.Schema.Types.ObjectId;
  name?: {
    firstName?: string;
    lastName?: string;
  };

  dateOfBirth: Date;
  phoneNumber: string;
  businessType: string;
  companyName?: string;
  companyWebsite: string;
  jobTitle: string;
  linkedinProfile?: string;
  previousPositions: string[];

  references: Array<{
    emailOrPhone: string;
    name: string;
  }>;
  educationalBackground: string;
  relevantQualification:string
  technicalSkill: string;
  cvOrCoverLetter?: {
    fileName?: string;
    filePath?: string;
    fileType?: string;
  };
  //retire professional profile
  location?: string;
  bio: string;

  description?: string;
  expertise: string[];
  availability: boolean;
 
    preferedProjects: string,
    hourlyRate: string,
    workSample?: {
      fileName?: string;
      filePath?: string;
      fileType?: string;
    }

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
