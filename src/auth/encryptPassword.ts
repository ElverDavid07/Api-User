import { hash, compare } from "bcrypt";

const passwordEncrypt = async (password: string) => {
  const passwordHash = await hash(password, 8);
  return passwordHash;
};

const passwordCompare = async (password: string, passwordHash: string) => {
  const isCorrect = await compare(password, passwordHash);
  return isCorrect;
};

export { passwordEncrypt, passwordCompare };
