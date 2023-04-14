import { Request, Response, NextFunction } from "express";
import { CustomAPIError } from "../errors/custom-error";

export const errorHandlerMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(err);
  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({ message: err.message });
  }
  return res.status(500).json({ message: "Somthing went wrong" });
};
