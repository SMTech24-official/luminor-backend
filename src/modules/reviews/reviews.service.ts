
import mongoose from "mongoose";
import { IReview } from "../professional/professional.interface";
import { RetireProfessional } from "../professional/professional.model"

const postReviews = async (id: string, review: IReview) => {
    const session = await mongoose.startSession();
    session.startTransaction();
  
    try {
    
      const result = await RetireProfessional.findOneAndUpdate(
        { _id: id },
        { $push: { reviews: review } },
        { new: true, session }
      ).populate("retireProfessional")
       
  
      if (result?.reviews && Array.isArray(result.reviews)) {
  
        const totalRatings = result.reviews.reduce((sum, r) => sum + r.rating, 0);
        const averageRating = totalRatings / result.reviews.length;
  
   
        await RetireProfessional.updateOne(
          { _id: id },
          { $set: { averageRating: averageRating } },
          { session }
        );
      }
  
    
      await session.commitTransaction();
      return result;
    } catch (error) {
     
      await session.abortTransaction();
      throw error;
    } finally {
    
      session.endSession();
    }
  };



export const ReviewsService={
    postReviews
}