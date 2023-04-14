import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { CustomAPIError } from "../errors/custom-error";
import { DecodedToken } from "../../types/decodedTokenTypes";

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new CustomAPIError("Please provide email and password", 400);
  }

  const id = new Date().getDate();

  const token = jwt.sign({ id, username }, process.env.JWT_SECRET!, {
    expiresIn: "30d",
  });

  res.status(200).json({ msg: "User created", token });
};

export const dashboard = async (req: Request, res: Response) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new CustomAPIError("No token provided", 401);
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as DecodedToken;
    console.log(decoded.username);
    const luckyNumber = Math.floor(Math.random() * 100);
    res.status(200).json({
      msg: `Hello ${decoded.username}`,
      secret: `Here is your authorization data, your lucky number is ${luckyNumber}`,
    });
  } catch (error) {
    throw new CustomAPIError("No authorized to access this route", 401);
  }
};
