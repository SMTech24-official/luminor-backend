
import { NextFunction, Request, Response } from "express";
import {StatusCodes} from "http-status-codes";

import { Secret } from "jsonwebtoken";

import { jwtHelpers } from "../helpers/jwtHelpers";
import config from "../config";
import ApiError from "../errors/handleApiError";

export const auth =
  (...requiredRoles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      //get authorization token
      const token = req.headers.authorization?.split(' ')[1];
      // console.log(token)
      if (!token) {
        throw new ApiError(StatusCodes.UNAUTHORIZED, "You are not authorized");
      }
      // verify token
      let verifiedUser = null;

      verifiedUser = jwtHelpers.verifyToken(token, config.jwt.secret as Secret);
      // console.log(verifiedUser,"check verify user")

      req.user = verifiedUser; // role  , _id

      if (requiredRoles.length && !requiredRoles.includes(verifiedUser.role)) {
        throw new ApiError(StatusCodes.FORBIDDEN, "Forbidden");
      }

      next();
    } catch (error) {
      next(error);
    }
  };

export default auth;