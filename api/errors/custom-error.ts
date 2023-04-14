export class CustomAPIError extends Error {
  constructor(message: string, statusCode: number) {
    super(message);
  }
}

export const createCustomError = (message: string, statusCode: number) => {
  return new CustomAPIError(message, statusCode);
};
