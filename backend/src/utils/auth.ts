import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "changeme123";

export const hashPassword = async (password: string) => {
  return await bcrypt.hash(password, 10);
};

export const comparePasswords = async (password: string, hash: string) => {
  return await bcrypt.compare(password, hash);
};

export const createJWT = (user: { id: string; email: string }) => {
  return jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: "1d" });
};
