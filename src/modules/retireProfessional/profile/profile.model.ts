import mongoose from "mongoose";
import { IRetireProfessionalProfile } from "./profile.interface";

const retireProfessionalProfileSchema =
  new mongoose.Schema<IRetireProfessionalProfile>({
    retireProfessional: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "RetireProfessional",
      required: true,
    },
    location: { type: String, required: true },
    bio: { type: String, required: true },
    description: { type: String },
    skills: { type: [String], required: true },
    availability: { type: Boolean, required: true },
    projects: [
      {
        preferredProjects: { type: String, required: true },
        hourlyRate: { type: String, required: true },
        workSample: { 
          fileName: { type: String },
        filePath: { type: String },
        fileType: { type: String },
      
      },
      },
    ],
  });

export const RetireProfessionalProfile = mongoose.model(
  "RetireProfessionalProfile",
  retireProfessionalProfileSchema
);
