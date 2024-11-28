import mongoose from 'mongoose';
import { IProfessional } from './professional.interface';

const { Schema } = mongoose;

// Define a schema for the sign-up form
const professionalsSchema = new Schema<IProfessional>(
  {
    firstName: {
      type: String,
      required: [true, 'First name is required'],
      trim: true,
      maxlength: [100, 'First name must be less than 100 characters'],
    },
    lastName: {
      type: String,
      required: [true, 'Last name is required'],
      trim: true,
      maxlength: [100, 'Last name must be less than 100 characters'],
    },
    dateOfBirth: {
      type: Date,
      required: [true, 'Date of birth is required'],
    },
    email: {
      type: String,
      required: [true, 'Email address is required'],
      unique: true,
      lowercase: true,
    },
    phoneNumber: {
      type: String,
      required: [true, 'Phone number is required'],
    },
    industry: {
      type: String,
      required: [true, 'Industry is required'],
      maxlength: [200, 'Industry must be less than 200 characters'],
    },
    previousPositions: [
      {
        position: {
          type: String,
          required: [true, 'Previous position is required'],
          maxlength: [200, 'Position must be less than 200 characters'],
        },
        company: {
          type: String,
          required: [true, 'Company name is required'],
          maxlength: [200, 'Company name must be less than 200 characters'],
        },
        startDate: {
          type: Date,
          required: [true, 'Start date is required'],
        },
        endDate: {
          type: Date,
          required: [true, 'End date is required'],
        },
      },
    ],
    references: [
      {
        name: {
          type: String,
          required: [true, 'Reference name is required'],
        },
        contact: {
          type: String,
          required: [true, 'Reference contact is required'],
        },
      },
    ],
    educationalBackground: {
      type: String,
      required: [true, 'Educational background is required'],
      maxlength: [
        500,
        'Educational background must be less than 500 characters',
      ],
    },
    relevantQualifications: {
      type: String,
      required: [true, 'Relevant professional qualification is required'],
      maxlength: [500, 'Qualification must be less than 500 characters'],
    },
    technicalAndSoftSkills: {
      type: String,
      required: [true, 'Technical and soft skills are required'],
      maxlength: [1000, 'Skills description must be less than 1000 characters'],
    },
    linkedinProfile: {
      type: String,
      required: false,
    },
    cvOrCoverLetter: {
      type: String,
      required: [true, 'CV or Cover letter is required'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters'],
    },
  },
  { 
    timestamps: true,
    versionKey: false 
   }
);

// Create a Mongoose model based on the schema
export const professionalsSchemaSignUp = mongoose.model('professionals', professionalsSchema);


 