import { Router } from "express";

import { userController } from "../controllers/user.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { commonMiddleware } from "../middlewares/common.middleware";
import { userValidator } from "../validators/user.schema";

const router = Router();

router.get("/", authMiddleware.checkAccessToken, userController.getAll);
router.patch(
    "/:userId/account-type",
    commonMiddleware.isIdValid("userId"),
    commonMiddleware.isBodyValid(userValidator.changeAccountType),
    authMiddleware.checkAccessToken,
    userController.changeAccountType,
);

router.patch(
    "/:userId/change-role",
    commonMiddleware.isIdValid("userId"),
    commonMiddleware.isBodyValid(userValidator.changeRole),
    authMiddleware.checkAccessToken,
    userController.changeRole,
);

router.patch(
    "/:userId/ban",
    commonMiddleware.isIdValid("userId"),
    authMiddleware.checkAccessToken,
    userController.banHandler(true),
);

router.patch(
    "/:userId/unban",
    commonMiddleware.isIdValid("userId"),
    authMiddleware.checkAccessToken,
    userController.banHandler(false),
);

export const userRouter = router;
