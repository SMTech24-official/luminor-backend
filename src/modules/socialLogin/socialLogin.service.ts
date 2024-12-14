import jwt, { Secret } from "jsonwebtoken";
import { jwtHelpers } from "../../helpers/jwtHelpers";
import config from "../../config";


// google login into db
const googleLoginIntoDb = async (user: any) => {
    
  const isUserExist = await user.findOne({
  
      googleId: user.id,
    
  });

  if (isUserExist) {
    const token = jwtHelpers.createToken(
      {
        id: isUserExist?.id,
        email: isUserExist?.email,
        role: isUserExist?.role,
      },
      config.jwt.secret as Secret,
      config.jwt.expires_in as string
    );
    return token;
  }

  if (!isUserExist) {
    const newUser = await user.create({
      data: {
        googleId: user.id,
        email: user.emails ? user.emails[0].value : "",
        name: user.displayName || "Unknown",
      },
    });
   
    const token = jwtHelpers.createToken(
      {
        id: newUser?.id,
        email: newUser?.email,
        role: newUser?.role,
      },
      config.jwt.secret as Secret,
      config.jwt.expires_in as string
    );
    return token ;
  }
};


// facebook login into db
const facebookLoginIntoDb = async (user: any) => {
  const isUserExist = await user.findOne({
    
      facebookId: user.id,
    
  });

  if (isUserExist) {
    const token = jwtHelpers.createToken(
      {
        id: isUserExist?.id,
        email: isUserExist?.email,
        role: isUserExist?.role,
      },
      config.jwt.secret as Secret,
      config.jwt.expires_in as string
    );
    return token;
  }

    if (!isUserExist) {
    const newUser = await user.create({
      data: {
        facebookId: user.id,
        email: user.emails ? user.emails[0].value : "",
        name: user.displayName || "Unknown",
      },
    });
  
    const token = jwtHelpers.createToken(
      {
        id: newUser?.id,
        email: newUser?.email,
        role: newUser?.role,
      },
      config.jwt.secret as Secret,
      config.jwt.expires_in as string
    );
    return token;
  }
};
export const SocialLoginService = {
  googleLoginIntoDb,
  facebookLoginIntoDb,
};