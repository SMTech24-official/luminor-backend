import { Secret } from "jsonwebtoken";
import config from "../../config";
import ApiError from "../../errors/handleApiError";
import { ILoginUser, ILoginUserResponse } from "./auth.interface";
import { User } from "./auth.model";
import {
	
	StatusCodes,
	
} from 'http-status-codes';
import { jwtHelpers } from "../../helpers/jwtHelpers";
const loginUser = async (
    payload: ILoginUser
  ): Promise<ILoginUserResponse | null> => {
    const { email, password } = payload;
  
    const isUserExist = await User.isUserExist(email);
  
    if (!isUserExist) {
      throw new ApiError(StatusCodes.NOT_FOUND, "User Doesn,t Exist");
    }
  
    if (
      isUserExist.password &&
      !(await User.isPasswordMatched(password, isUserExist.password))
    ) {
      throw new ApiError(StatusCodes.UNAUTHORIZED, "Password is incorrect");
    }
  
   
    const { _id, email: userEmail, role } = isUserExist;
    const accessToken = jwtHelpers.createToken(
      { _id, userEmail, role },
      config.jwt.secret as Secret,
      config.jwt.expires_in as string
    );
   
    return {
      accessToken,

    };
  };

  export const AuthService={
    loginUser
  }