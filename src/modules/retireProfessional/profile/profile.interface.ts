import mongoose from "mongoose";

export type IRetireProfessionalProfile = {
  name:{
    firstName:string,
    lastName:string
  };
  retireProfessional: mongoose.Schema.Types.ObjectId;
  location: string;
  bio: string;
  description?: string;
  skills: string[];
  availability: boolean;
  projects?: { 
    preferredProjects: string;
    hourlyRate: string;
    workSample?: { fileName: string; filePath: string; fileType: string };
  }[];
};