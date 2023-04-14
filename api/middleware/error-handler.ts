import { Request, Response, NextFunction } from "express";
import { CustomAPIError } from "../errors/custom-error";
import { StatusCodes } from "http-status-codes";

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
  return res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({ message: "Somthing went wrong" });
};
