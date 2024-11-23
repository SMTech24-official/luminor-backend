import mongoose, { Schema, model } from "mongoose";
import { IProfessional } from "./professional.interface";

const RetiredProfessional = new Schema<IProfessional>(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    industry:{
      type:String,
      required:true
    },
    
    previousPositions: {
      type: [String],
      required: true,
  
  
    },
    referencenames: {
      type: [String],
     
    },
    referenceEmail: {
      type: [String],
      required: true,
      

    },
    educationalBackground: {
      type: String,
      
   },
   technicalSkill:{
    type:String,required:true
   },
   cvOrCover: {
    fileName: { type: String },
    filePath: { type: String,  },
    fileType: { type: String },
  },
 
  },
  {
    timestamps: true,
  }
);


export const retiredProfessional = model<IProfessional>("RetiredProfessional", RetiredProfessional);