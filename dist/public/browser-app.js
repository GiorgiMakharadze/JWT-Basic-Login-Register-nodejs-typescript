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
const axios_1 = __importDefault(require("axios"));
const formDOM = document.querySelector(".form");
const usernameInputDOM = document.querySelector(".username-input");
const passwordInputDOM = document.querySelector(".password-input");
const formAlertDOM = document.querySelector(".form-alert");
const resultDOM = document.querySelector(".result");
const btnDOM = document.querySelector("#data");
const tokenDOM = document.querySelector(".token");
formDOM.addEventListener("submit", (e) => __awaiter(void 0, void 0, void 0, function* () {
    formAlertDOM.classList.remove("text-success");
    tokenDOM.classList.remove("text-success");
    e.preventDefault();
    const username = usernameInputDOM.value;
    const password = passwordInputDOM.value;
    try {
        const { data } = yield axios_1.default.post("/api/v1/login", { username, password });
        formAlertDOM.style.display = "block";
        formAlertDOM.textContent = data.msg;
        formAlertDOM.classList.add("text-success");
        usernameInputDOM.value = "";
        passwordInputDOM.value = "";
        localStorage.setItem("token", data.token);
        resultDOM.innerHTML = "";
        tokenDOM.textContent = "token present";
        tokenDOM.classList.add("text-success");
    }
    catch (error) {
        formAlertDOM.style.display = "block";
        formAlertDOM.textContent = error.response.data.msg;
        localStorage.removeItem("token");
        resultDOM.innerHTML = "";
        tokenDOM.textContent = "no token present";
        tokenDOM.classList.remove("text-success");
    }
    setTimeout(() => {
        formAlertDOM.style.display = "none";
    }, 2000);
}));
btnDOM.addEventListener("click", () => __awaiter(void 0, void 0, void 0, function* () {
    const token = localStorage.getItem("token");
    try {
        const { data } = yield axios_1.default.get("/api/v1/dashboard", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        resultDOM.innerHTML = `<h5>${data.msg}</h5><p>${data.secret}</p>`;
        data.secret;
    }
    catch (error) {
        localStorage.removeItem("token");
        resultDOM.innerHTML = `<p>${error.response.data.msg}</p>`;
    }
}));
const checkToken = () => {
    tokenDOM.classList.remove("text-success");
    const token = localStorage.getItem("token");
    if (token) {
        tokenDOM.textContent = "token present";
        tokenDOM.classList.add("text-success");
    }
};
checkToken();
