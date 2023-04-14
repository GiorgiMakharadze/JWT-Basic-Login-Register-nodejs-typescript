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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dashboard = exports.login = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const custom_error_1 = require("../errors/custom-error");
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    if (!username || !password) {
        throw new custom_error_1.CustomAPIError("Please provide email and password", 400);
    }
    const id = new Date().getDate();
    const token = jsonwebtoken_1.default.sign({ id, username }, process.env.JWT_SECRET, {
        expiresIn: "30d",
    });
    res.status(200).json({ msg: "User created", token });
});
exports.login = login;
const dashboard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user) {
        throw new custom_error_1.CustomAPIError("User not authorized", 401);
    }
    console.log(req.user);
    const luckyNumber = Math.floor(Math.random() * 100);
    res.status(200).json({
        msg: `Hello ${req.user.username}`,
        secret: `Here is your authorization data, your lucky number is ${luckyNumber}`,
    });
});
exports.dashboard = dashboard;
