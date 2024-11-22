import mongoose from "mongoose";



export type IClient = {
    user:  mongoose.Schema.Types.ObjectId;
    businessType: string;

    companyName:string ;
    jobTitle:  string;
    linkedinProfile:  string 

};


