import { Router } from "express";

import { authController } from "../controllers/auth.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { commonMiddleware } from "../middlewares/common.middleware";
import { VALIDATORS } from "../validators/validators";

const router = Router();

router.post(
    "/sign-up",
    commonMiddleware.isBodyValid(VALIDATORS.auth.signUp),
    authController.signUp,
);
router.post(
    "/sign-in",
    commonMiddleware.isBodyValid(VALIDATORS.auth.signIn),
    authController.signIn,
);
router.post("/logout", authController.logout);
router.get("/me", authMiddleware.checkAccessToken, authController.me);

export const authRouter = router;
