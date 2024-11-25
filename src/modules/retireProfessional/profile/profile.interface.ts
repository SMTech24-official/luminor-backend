import mongoose from "mongoose";

export type IRetireProfessionalProfile = {
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