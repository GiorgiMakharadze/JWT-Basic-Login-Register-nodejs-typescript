import { Request, Response } from "express";
import { CustomAPIError } from "../errors/custom-error";

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new CustomAPIError("Please provide email and password", 400);
  }
  console.log(username, password);

  res.send("Fake Login/Register/Sign up Route");
};

export const dashboard = async (req: Request, res: Response) => {
  const luckyNumber = Math.floor(Math.random() * 100);
  res.status(200).json({
    message: `Hello john Doe`,
    secret: `Here is your authorization data, your lucky number is ${luckyNumber}`,
  });
};
