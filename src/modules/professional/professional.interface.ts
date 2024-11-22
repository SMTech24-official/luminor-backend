import mongoose, { Model } from "mongoose";
import { ENUM_USER_ROLE } from "../../enums/user";


export type IProfessional = {
    user:  mongoose.Schema.Types.ObjectId;
    previousPositions:string
    referencenames:string
    referenceEmail:string 
    educationalBackground?:string
    technicalSkill:string
    cvOrCover?:File

    

};


