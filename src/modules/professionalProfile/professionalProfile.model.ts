import mongoose from "mongoose";
import { IProfessionalProfile } from "./professionalProfile.interface";

const retiredProfessionalProfileSchema = new mongoose.Schema<IProfessionalProfile>({
  retiredProfessional: { type: mongoose.Schema.Types.ObjectId, ref: 'retiredProfessionalProfile', required: true },
  location: { type: String, required: true },
  bio: { type: String, required: true },
  description: { type: String },
  skills: { type: String, required: true },
  availability: { type: Boolean, required: true },
  projects: [
    {
      preferredProjects: { type: String ,required:true},
      hourlyRate: { type: String,required:true },
      workSample: { type: String }, 
    },
  ],
});

export const retiredProfessionalProfile = mongoose.model('retiredProfessionalProfile', retiredProfessionalProfileSchema);

