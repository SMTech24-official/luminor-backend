



import { IUser } from "./client.interface";
import { User } from "./client.model";

const createUser = async (user: IUser): Promise<IUser | null> => {

  const createUser = await User.create(user)

   

return createUser
  
 
};




export const UserService = {
  createUser,

  
};