import { Secret } from "jsonwebtoken";
import config from "../../../config";
import ApiError from "../../../errors/handleApiError";
import { jwtHelpers } from "../../../helpers/jwtHelpers";

import { AuthRetireProfessional } from "./auth.model";
import { IAuthRetireProfessional } from "./auth.interface";
import { ILoginUser, ILoginUserResponse } from "../../user/user.interface";
import { AuthClient } from "../../client/auth/auth.model";

const createAccount = async (userData: IAuthRetireProfessional) => {
  const existingClient = await AuthClient.isUserExist(userData.email);
  if (existingClient) {
    throw new ApiError(
      400,
      "This email is already registered as a Client account."
    );
  }

  const result = await AuthRetireProfessional.create(userData);
  return result;
};
const loginUser = async (
  payload: ILoginUser
): Promise<ILoginUserResponse | null> => {
  const { email, password } = payload;
  console.log(email);
  const isUserExist = await AuthRetireProfessional.isUserExist(email);
  //  console.log(isUserExist,"check")
  if (!isUserExist) {
    throw new ApiError(400, "User Doesn,t Exist");
  }

  if (
    isUserExist.password &&
    !(await AuthRetireProfessional.isPasswordMatched(
      password,
      isUserExist.password
    ))
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

export const AuthRetireProfessionalService = {
  createAccount,
  loginUser,
};
