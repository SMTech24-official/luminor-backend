import { Secret } from "jsonwebtoken";
import config from "../../config";
import ApiError from "../../errors/handleApiError";
import { jwtHelpers } from "../../helpers/jwtHelpers";
import { ILoginUser, ILoginUserResponse } from "./user.interface";
import { User } from "./user.model";

const loginUser = async (
    payload: ILoginUser
  ): Promise<ILoginUserResponse | null> => {
    const { email, password } = payload;
    console.log(email)
    const isUserExist = await User.isUserExist(email);
    //  console.log(isUserExist,"check")
    if (!isUserExist) {
      throw new ApiError(400, "User Doesn,t Exist");
    }
  
    if (
      isUserExist.password &&
      !(await User.isPasswordMatched(password, isUserExist.password))
    ) {
      throw new ApiError(501, "Password is incorrect");
    }
  
   
    const { _id, email: userEmail, role } = isUserExist;
    const accessToken = jwtHelpers.createToken(
      { _id, userEmail, role },
      config.jwt.secret as Secret,
      config.jwt.expires_in as string
    );
    const refreshToken = jwtHelpers.createToken(
      { _id, userEmail, role },
      config.jwt.refresh_secret as Secret,
      config.jwt.refresh_expires_in as string
    );
    return {
      accessToken,
      refreshToken,
    };
  };

  export const UserService={
    loginUser
      }