import { Router } from "express";

import { authController } from "../controllers/auth.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.post("/sign-up", authController.signUp);
router.post("/sign-in", authController.signIn);
router.post("/logout", authController.logout);
router.get("/me", authMiddleware.checkAccessToken, authController.me);

export const authRouter = router;
