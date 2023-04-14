import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { DecodedToken } from "../../types/decodedTokenTypes";
import { RequestWithUser } from "../../types/decodedTokenTypes";
import { Unauthenticated } from "../errors/unauthenticated";

export const authentication = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new Unauthenticated("No token provided");
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as DecodedToken;
    const { id, username } = decoded;
    req.user = { id, username };
    next();
  } catch (error) {
    throw new Unauthenticated("No authorized to access this route");
  }
};
