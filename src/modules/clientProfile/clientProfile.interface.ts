import mongoose from "mongoose"

export type IClientProfile={
    name:{
        firstName:string,
        lastName:string
    },
    phoneNumber:string
    client: mongoose.Schema.Types.ObjectId;
    companyName:string;
    companyWebsite:string;
    problemAreas:string;
    location:string;
    description:string;
    industry:string;
    servicePreferences:string;
    budgetRange:number;
    projectDurationRange:number;
    projectListing:File
}
export type ICLientFilters = {
    query?: string;
  };