
import { Secret } from 'jsonwebtoken';
import { jwtHelpers } from '../../helpers/jwtHelpers';

import { User } from '../auth/auth.model';
import config from '../../config';

// Google Login into DB
const googleLoginIntoDb = async (user: any) => {
  const isUserExist = await User.findOne({ googleId: user.id });

  if (isUserExist) {
    const token = jwtHelpers.createToken(
      {
        id: isUserExist._id,
        email: isUserExist.email,
        role: isUserExist.role,
      },
      config.jwt.secret as Secret,
      config.jwt.expires_in as string
    );
    return { token };
  }

  if (!isUserExist) {
    const newUser = await User.create({
      googleId: user.id,
      name: {
        firstName: user?.name?.firstName || '',
        lastName: user?.name?.lastName || '',
      },
      email: user.emails ? user.emails[0].value : '',
      role: user.role, // Default role, adjust as necessary
   
    });

    const token = jwtHelpers.createToken(
      {
        id: newUser._id,
        email: newUser.email,
        role: newUser.role,
      },
      config.jwt.secret as Secret,
      config.jwt.expires_in as string
    );
    return { token };
  }
};

// Facebook Login into DB
const facebookLoginIntoDb = async (user: any) => {
  const isUserExist = await User.findOne({ facebookId: user.id });

  if (isUserExist) {
    const token = jwtHelpers.createToken(
      {
        id: isUserExist._id,
        email: isUserExist.email,
        role: isUserExist.role,
      },
      config.jwt.secret as Secret,
      config.jwt.expires_in as string
    );
    return { token };
  }

  if (!isUserExist) {
    const newUser = await User.create({
      facebookId: user.id,
      name: {
        firstName: user?.name?.givenName || '',
        lastName: user?.name?.familyName || '',
      },
      email: user.emails ? user.emails[0].value : '',
      role:user.role, // Default role, adjust as necessary
      profileImage: user.photos?.[0]?.value || '',

    });

    const token = jwtHelpers.createToken(
      {
        id: newUser._id,
        email: newUser.email,
        role: newUser.role,
      },
      config.jwt.secret as Secret,
      config.jwt.expires_in as string
    );
    return { token };
  }
};

export const SocialLoginService = {
  googleLoginIntoDb,
  facebookLoginIntoDb,
};
