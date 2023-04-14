"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dashboard = exports.login = void 0;
const custom_error_1 = require("../errors/custom-error");
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    if (!username || !password) {
        throw new custom_error_1.CustomAPIError("Please provide email and password", 400);
    }
    console.log(username, password);
    res.send("Fake Login/Register/Sign up Route");
});
exports.login = login;
const dashboard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const luckyNumber = Math.floor(Math.random() * 100);
    res.status(200).json({
        message: `Hello john Doe`,
        secret: `Here is your authorization data, your lucky number is ${luckyNumber}`,
    });
});
exports.dashboard = dashboard;
