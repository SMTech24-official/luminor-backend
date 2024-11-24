import { Secret } from "jsonwebtoken";
import config from "../../../config";
import ApiError from "../../../errors/handleApiError";
import { jwtHelpers } from "../../../helpers/jwtHelpers";

import { IAuthClient } from "./auth.interface";
import { AuthClient } from "./auth.model";
import { ILoginUser, ILoginUserResponse } from "../../user/user.interface";
import { AuthRetireProfessional } from "../../retireProfessional/auth/auth.model";

const createAccount = async (userData: IAuthClient) => {
  const existingProfessional = await AuthRetireProfessional.isUserExist(
    userData.email
  );
  if (existingProfessional) {
    throw new ApiError(
      400,
      "This email is already registered as a Retired Professional account."
    );
  }
  const result = await AuthClient.create(userData);
  return result;
};
const loginUser = async (
  payload: ILoginUser
): Promise<ILoginUserResponse | null> => {
  const { email, password } = payload;
  console.log(email);
  const isUserExist = await AuthClient.isUserExist(email);
  //  console.log(isUserExist,"check")
  if (!isUserExist) {
    throw new ApiError(400, "User Doesn,t Exist");
  }

  if (
    isUserExist.password &&
    !(await AuthClient.isPasswordMatched(password, isUserExist.password))
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

export const AuthClientService = {
  createAccount,
  loginUser,
};
