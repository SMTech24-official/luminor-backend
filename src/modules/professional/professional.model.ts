import mongoose from "mongoose";
import { IProfessional } from "./professional.interface";

// Define the main Professional schema
const RetireProfessionalSchema = new mongoose.Schema<IProfessional>(
  {
    retireProfessional: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Refers to the User model (this can be customized)
      required: true,
    },
    // Retired Professional account fields
    dateOfBirth: { type: Date, required: true },
    phoneNumber: { type: String, required: true },

    linkedinProfile: { type: String },
    previousPositions: { type: [String], required: true },

    references: [
      {
        emailOrPhone: { type: String, required: true },
        name: { type: String, required: true },
      },
    ],
    educationalBackground: { type: String, required: true },
    relevantQualification: {
      type: String,
      required: true,
    },
    technicalSkill: { type: String, required: true },
    cvOrCoverLetter: {
      fileName: { type: String, default: null },
      filePath: { type: String, default: null },
      fileType: { type: String, default: null },
    },

    // Retired professional profile (optional)

    location: { type: String, default: null },
    bio: { type: String, default: null },
    description: { type: String, default: null },
    expertise: { type: [String], required: true },
    availability: { type: Boolean, default:false },

    preferedProjects: { type: String, default: null },
    hourlyRate: { type: String, default: null },
    workSample: {
      fileName: { type: String, default: null },
      filePath: { type: String, default: null },
      fileType: { type: String, default: null },
    },
  },

  { timestamps: true }
);

export const RetireProfessional = mongoose.model(
  "RetireProfessional",
  RetireProfessionalSchema
);
