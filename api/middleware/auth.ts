import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { CustomAPIError } from "../errors/custom-error";
import { DecodedToken } from "../../types/decodedTokenTypes";
import { RequestWithUser } from "../../types/decodedTokenTypes";

export const authentication = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new CustomAPIError("No token provided", 401);
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as DecodedToken;
    const { id, username } = decoded;
    req.user = { id, username };
    next();
  } catch (error) {
    throw new CustomAPIError("No authorized to access this route", 401);
  }
};
