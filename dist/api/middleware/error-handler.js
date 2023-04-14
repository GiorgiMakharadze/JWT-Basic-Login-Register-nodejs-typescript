"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandlerMiddleware = void 0;
const custom_error_1 = require("../errors/custom-error");
const http_status_codes_1 = require("http-status-codes");
const errorHandlerMiddleware = (err, req, res, next) => {
    console.log(err);
    if (err instanceof custom_error_1.CustomAPIError) {
        return res.status(err.statusCode).json({ message: err.message });
    }
    return res
        .status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: "Somthing went wrong" });
};
exports.errorHandlerMiddleware = errorHandlerMiddleware;
