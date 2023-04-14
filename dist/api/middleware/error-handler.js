"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandlerMiddleware = void 0;
const custom_error_1 = require("../errors/custom-error");
const errorHandlerMiddleware = (err, req, res, next) => {
    console.log(err);
    if (err instanceof custom_error_1.CustomAPIError) {
        return res.status(err.statusCode).json({ message: err.message });
    }
    return res.status(500).json({ message: "Somthing went wrong" });
};
exports.errorHandlerMiddleware = errorHandlerMiddleware;
