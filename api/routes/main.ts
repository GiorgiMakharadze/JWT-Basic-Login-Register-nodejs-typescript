import express from "express";
import { Router } from "express";
import { login, dashboard } from "../controllers/main";

const router = Router();

router.route("/dashboard").get(dashboard);
router.route("/login").post(login);

export default router;
