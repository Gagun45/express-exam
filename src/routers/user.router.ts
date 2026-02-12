import { Router } from "express";

import { userController } from "../controllers/user.controller";
import { PermissionsEnum } from "../enums/permissions.enum";
import { authMiddleware } from "../middlewares/auth.middleware";
import { commonMiddleware } from "../middlewares/common.middleware";
import { userValidator } from "../validators/user.schema";

const router = Router();

router.get("/", authMiddleware.checkAccessToken, userController.getAll);
router.patch(
    "/:userId/account-type",
    commonMiddleware.isUserIdValid("userId"),
    commonMiddleware.isBodyValid(userValidator.changeAccountType),
    authMiddleware.checkAccessToken,
    authMiddleware.checkPermission(PermissionsEnum.CHANGE_ACCOUNT_TYPE),
    userController.updateAccountType,
);

router.patch(
    "/:userId/upgrade-to-manager",
    commonMiddleware.isUserIdValid("userId"),
    authMiddleware.checkAccessToken,
    authMiddleware.checkPermission(PermissionsEnum.MANAGE_MANAGER_ROLE),
    userController.upgradeToManager,
);

router.patch(
    "/:userId/downgrade-from-manager",
    commonMiddleware.isUserIdValid("userId"),
    authMiddleware.checkAccessToken,
    authMiddleware.checkPermission(PermissionsEnum.MANAGE_MANAGER_ROLE),
    userController.downgradeFromManager,
);

router.patch(
    "/:userId/change-role",
    commonMiddleware.isUserIdValid("userId"),
    commonMiddleware.isBodyValid(userValidator.changeRole),
    authMiddleware.checkAccessToken,
    authMiddleware.checkPermission(PermissionsEnum.CHANGE_ROLE),
    userController.changeRole,
);

export const userRouter = router;
