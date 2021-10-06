import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { RequestWithUser } from "../interfaces/requestWithUser";
import { UserModel } from "../schemas/userSchema";

//!Request does not container the user in the types have to add manually to avoid error
export const authMiddleWare = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  const SECRET = process.env.SECRET as string;

  const token = req.get("x-auth-token");
  if (!token) res.status(404).json({ msg: "Not authorized" });
  try {
    const decoded = await jwt.verify(token as string, SECRET);

    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).json({ msg: "Invalid Credentials" });
  }
};
