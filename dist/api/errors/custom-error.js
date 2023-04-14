"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCustomError = exports.CustomAPIError = void 0;
class CustomAPIError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}
exports.CustomAPIError = CustomAPIError;
const createCustomError = (message, statusCode) => {
    return new CustomAPIError(message, statusCode);
};
exports.createCustomError = createCustomError;
