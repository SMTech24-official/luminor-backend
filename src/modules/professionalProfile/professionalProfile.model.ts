import mongoose from "mongoose";

const retiredProfessionalProfileSchema = new mongoose.Schema({
  retiredProfessional: { type: mongoose.Schema.Types.ObjectId, ref: 'RetiredProfessional', required: true },
  location: { type: String, required: true },
  bio: { type: String, required: true },
  description: { type: String },
  skills: { type: String, required: true },
  availability: { type: Boolean, required: true },
  projects: [
    {
      preferredProjects: { type: String },
      hourlyRate: { type: String },
      workSample: { type: String }, // File path
    },
  ],
});

const RetiredProfessionalProfile = mongoose.model('RetiredProfessionalProfile', retiredProfessionalProfileSchema);
module.exports = RetiredProfessionalProfile;
