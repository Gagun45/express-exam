import { Router } from "express";

import { userController } from "../controllers/user.controller";
import { PermissionsEnum } from "../enums/permissions.enum";
import { authMiddleware } from "../middlewares/auth.middleware";
import { commonMiddleware } from "../middlewares/common.middleware";
import { permissionMiddleware } from "../middlewares/permission.middleware";
import { VALIDATORS } from "../validators/validators";

const userId = "userId";

const router = Router();

router.get("/", authMiddleware.checkAccessToken, userController.getAll);
router.patch(
    `/:${userId}/account-type`,
    commonMiddleware.isIdValid(userId),
    commonMiddleware.isBodyValid(VALIDATORS.user.changeAccountType),
    authMiddleware.checkAccessToken,
    commonMiddleware.loadTargetUser(userId),
    permissionMiddleware.hasPermission(PermissionsEnum.CHANGE_ACCOUNT_TYPE),
    permissionMiddleware.assertRoleIsHigherOrEqual,
    permissionMiddleware.assertTargetIsNotAdmin,
    userController.changeAccountType,
);

router.patch(
    `/:${userId}/change-role`,
    commonMiddleware.isIdValid(userId),
    commonMiddleware.isBodyValid(VALIDATORS.user.changeRole),
    authMiddleware.checkAccessToken,
    commonMiddleware.loadTargetUser(userId),
    permissionMiddleware.hasPermission(PermissionsEnum.CHANGE_ROLE),
    permissionMiddleware.preventSelfAction,
    permissionMiddleware.assertRoleIsHigherStrictly,
    userController.changeRole,
);

router.patch(
    `/:${userId}/change-ban-status`,
    commonMiddleware.isIdValid(userId),
    commonMiddleware.isBodyValid(VALIDATORS.user.changeBanStatus),
    authMiddleware.checkAccessToken,
    commonMiddleware.loadTargetUser(userId),
    permissionMiddleware.hasPermission(PermissionsEnum.CHANGE_BAN_STATUS),
    permissionMiddleware.preventSelfAction,
    permissionMiddleware.assertRoleIsHigherOrEqual,
    permissionMiddleware.assertTargetIsNotAdmin,
    userController.changeBanStatus,
);

router.post(
    "/admin",
    authMiddleware.checkAccessToken,
    commonMiddleware.isBodyValid(VALIDATORS.auth.signUp),
    permissionMiddleware.isAdmin,
    userController.addNewAdmin,
);

export const userRouter = router;
