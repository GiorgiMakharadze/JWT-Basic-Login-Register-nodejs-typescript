import { Router } from "express";
import { login, dashboard } from "../controllers/main";
import { authentication } from "../middleware/auth";

const router = Router();

router.route("/dashboard").get(authentication, dashboard);
router.route("/login").post(login);

export default router;
