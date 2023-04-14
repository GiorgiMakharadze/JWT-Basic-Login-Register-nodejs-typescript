"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const main_1 = require("../controllers/main");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
router.route("/dashboard").get(auth_1.authentication, main_1.dashboard);
router.route("/login").post(main_1.login);
exports.default = router;
