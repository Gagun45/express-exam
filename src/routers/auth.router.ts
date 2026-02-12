import { Router } from "express";

import { authController } from "../controllers/auth.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { commonMiddleware } from "../middlewares/common.middleware";
import { authValidator } from "../validators/auth.schema";

const router = Router();

router.post(
    "/sign-up",
    commonMiddleware.isBodyValid(authValidator.signUp),
    authController.signUp,
);
router.post(
    "/sign-in",
    commonMiddleware.isBodyValid(authValidator.signIn),
    authController.signIn,
);
router.post("/logout", authController.logout);
router.get("/me", authMiddleware.checkAccessToken, authController.me);

export const authRouter = router;
