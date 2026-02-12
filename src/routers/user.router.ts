import { Router } from "express";

import { userController } from "../controllers/user.controller";
import { PermissionsEnum } from "../enums/permissions.enum";
import { authMiddleware } from "../middlewares/auth.middleware";
import { commonMiddleware } from "../middlewares/common.middleware";

const router = Router();

router.get("/", authMiddleware.checkAccessToken, userController.getAll);
router.patch(
    "/:userId/account-type",
    commonMiddleware.isIdValid("userId"),
    authMiddleware.checkAccessToken,
    authMiddleware.checkPermission(PermissionsEnum.UPDATE_ACCOUNT_TYPE),
    userController.updateAccountType,
);

export const userRouter = router;
