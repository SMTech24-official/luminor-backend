import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import { Secret } from "jsonwebtoken";
import { jwtHelpers } from "../helpers/jwtHelpers";
import config from "../config";
import { User } from "../modules/auth/auth.model";
import ApiError from "../errors/handleApiError";



//  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN)

const auth = (...roles: string[]) => {
  return async (
    req: Request & { user?: any },
    res: Response,
    next: NextFunction
  ) => {
    try {
      const token = req.headers.authorization;
      // console.log(token,"check token")

      if (!token) {
        throw new ApiError(StatusCodes.UNAUTHORIZED, "You are not authorized!");
      }

      const verifiedUser = jwtHelpers.verifyToken(
        token,
        config.jwt.secret as Secret
      );
  //  console.log(verifiedUser,"check verified user")
      const user = await User.findOne({
       
          _id: verifiedUser.id,
        
      });

      if (!user) {
        throw new ApiError(StatusCodes.UNAUTHORIZED, "This user is not found !");
      }

    


      if (roles.length && !roles.includes(verifiedUser.role)) {
      throw new ApiError(StatusCodes.FORBIDDEN, "Forbidden!");
      }

      req.user = verifiedUser;
      // console.log(req.user,"check user")

      next();
    } catch (err) {
      next(err);
    }
  };
};

export default auth;
