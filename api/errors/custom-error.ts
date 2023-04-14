export class CustomAPIError extends Error {
  public statusCode: number = 500;

  constructor(message: string, statusCode: number) {
    super(message);
  }
}

export const createCustomError = (message: string, statusCode: number) => {
  return new CustomAPIError(message, statusCode);
};
