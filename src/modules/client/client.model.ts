import mongoose, { Schema, model } from "mongoose";




import { IClient } from "./client.interface";




const clientSchema = new Schema<IClient>(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    
    businessType: {
      type: String,
      required: true,
  
     
    },
    companyName: {
      type: String,
     
    },
    jobTitle: {
      type: String,
      required: true,
      

    },
    linkedinProfile: {
      type: String,
      
   },
  },
  {
    timestamps: true,
  }
);


export const Client = model<IClient>("Client", clientSchema);