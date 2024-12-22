import mongoose from "mongoose";
import { IProfessional } from "./professional.interface";

import { ENUM_SERVICE_PREFERENCE, INDUSTRIES } from "../../enums/service";

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
    technicalSkill: { type: [String], required: true },
    cvOrCoverLetter: { type: String, default: null },
    // Retired professional profile (optional)
    location: {
      type: {
        type: String,
        enum: ["Point"],
      },
      coordinates: {
        type: [Number],
      },
    },
    profileUrl: { type: String, default: null },
    bio: { type: String, default: null },
    description: { type: String, default: null },
    expertise: { type: String, enum: ENUM_SERVICE_PREFERENCE, default: null },
    industry: { type: String, enum: INDUSTRIES, defaul: null },
    availability: { type: Number, default: null },

    preferedProjects: { type: String, default: null },
    hourlyRate: { type: String, default: null },
    workSample: { type: String, default: null },
    reviews: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Client",
          required: true,
        },
        rating: { type: Number, required: true, min: 1, max: 5 },
        feedBack: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
      },
    ],

    averageRating: { type: Number, default: 0 },
  },

  { timestamps: true }
);
RetireProfessionalSchema.index({ location: "2dsphere" });
export const RetireProfessional = mongoose.model(
  "RetireProfessional",
  RetireProfessionalSchema
);
