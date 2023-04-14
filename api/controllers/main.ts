import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { CustomAPIError } from "../errors/custom-error";

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
  console.log(req.headers);

  const luckyNumber = Math.floor(Math.random() * 100);
  res.status(200).json({
    message: `Hello john Doe`,
    secret: `Here is your authorization data, your lucky number is ${luckyNumber}`,
  });
};
