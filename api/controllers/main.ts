import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { CustomAPIError } from "../errors/custom-error";
import { RequestWithUser } from "../../types/decodedTokenTypes";
import { BadRequest } from "../errors/bad-request";

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new BadRequest("Please provide email and password");
  }

  const id = new Date().getDate();

  const token = jwt.sign({ id, username }, process.env.JWT_SECRET!, {
    expiresIn: "30d",
  });

  res.status(200).json({ msg: "User created", token });
};

export const dashboard = async (req: RequestWithUser, res: Response) => {
  if (!req.user) {
    throw new CustomAPIError("User not authorized", 401);
  }

  const luckyNumber = Math.floor(Math.random() * 100);
  res.status(200).json({
    msg: `Hello ${req.user.username}`,
    secret: `Here is your authorization data, your lucky number is ${luckyNumber}`,
  });
};
