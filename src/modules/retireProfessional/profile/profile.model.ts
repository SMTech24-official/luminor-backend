import mongoose from "mongoose";
import { IProfessionalProfile } from "./profile.interface";

const retireProfessionalProfileSchema =
  new mongoose.Schema<IProfessionalProfile>({
    retireProfessional: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "RetireProfessional",
      required: true,
    },
    location: { type: String, required: true },
    bio: { type: String, required: true },
    description: { type: String },
    skills: { type: String, required: true },
    availability: { type: Boolean, required: true },
    projects: [
      {
        preferredProjects: { type: String, required: true },
        hourlyRate: { type: String, required: true },
        workSample: { type: String },
      },
    ],
  });

export const RetireProfessionalProfile = mongoose.model(
  "RetireProfessionalProfile",
  retireProfessionalProfileSchema
);
