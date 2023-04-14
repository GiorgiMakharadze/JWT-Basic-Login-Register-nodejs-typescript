export class CustomAPIError extends Error {
  public statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

export const createCustomError = (message: string, statusCode: number) => {
  return new CustomAPIError(message, statusCode);
};
