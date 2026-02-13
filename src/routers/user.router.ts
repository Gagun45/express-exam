import { Router } from "express";

import { userController } from "../controllers/user.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { commonMiddleware } from "../middlewares/common.middleware";
import { VALIDATORS } from "../validators/validators";

const router = Router();

router.get("/", authMiddleware.checkAccessToken, userController.getAll);
router.patch(
    "/:userId/account-type",
    commonMiddleware.isIdValid("userId"),
    commonMiddleware.isBodyValid(VALIDATORS.user.changeAccountType),
    authMiddleware.checkAccessToken,
    userController.changeAccountType,
);

router.patch(
    "/:userId/change-role",
    commonMiddleware.isIdValid("userId"),
    commonMiddleware.isBodyValid(VALIDATORS.user.changeRole),
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

router.post(
    "/admin",
    authMiddleware.checkAccessToken,
    commonMiddleware.isBodyValid(VALIDATORS.auth.signUp),
    userController.addNewAdmin,
);

export const userRouter = router;
