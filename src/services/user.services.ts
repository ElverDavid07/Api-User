import { User } from "../interfaces/user.interface";
import { Credential } from "../interfaces/credential.interfaz";
import { userModel } from "../models/user.model";
import { passwordEncrypt, passwordCompare } from "../auth/encryptPassword";
import { generateToken } from "../jwt/jwt.handle";

//*get all users
const getAllUsers = async (option: object) => {
  const response = await userModel.paginate({}, option);
  return response;
};
//*get one user
const getOneUser = async (id: string) => {
  const response = await userModel.findById(id);
  return response;
};
//*register new user, password encrypt
const registerNewUser = async ({ name, email, password }: User) => {
  const checkIs = await userModel.findOne({ email });
  if (checkIs) return "USER_ALREADY_EXISTS";

  const encryptPassword = await passwordEncrypt(password);
  const response = await userModel.create({
    name,
    email,
    password: encryptPassword,
  });
  return response;
};
//*login user
const LoginUser = async ({ email, password }: Credential) => {
  const checkIs = await userModel.findOne({ email });
  if (!checkIs) return "USER_NOT_FONT";

  const passwordHash = checkIs.password;
  if (!passwordHash) return "PASSWORD_HASH_NOT_FOUND";

  const comparePassword = await passwordCompare(password, passwordHash);

  if (!comparePassword) return "PASSWORD_INCORRECT";
  const token = await generateToken(checkIs.email);
  const data = {
    token,
    user: checkIs,
  };
  return data;
};
//*update user by id
const updateUser = async (id: string, userUpdate: User) => {
  const response = await userModel.findOneAndUpdate({ _id: id }, userUpdate, {
    new: true,
  });
  if (!response) return "THE_USER_DOES_NOT_EXIST";
  return response;
};
export { getAllUsers, getOneUser, registerNewUser, updateUser, LoginUser };
