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
    commonMiddleware.isTargetUserIdValid("userId"),
    commonMiddleware.targetIsNotAdmin,
    commonMiddleware.isBodyValid(userValidator.updateAccountType),
    authMiddleware.checkAccessToken,
    authMiddleware.checkPermission(PermissionsEnum.UPDATE_ACCOUNT_TYPE),
    userController.updateAccountType,
);

router.patch(
    "/:userId/upgrade-to-manager",
    commonMiddleware.isTargetUserIdValid("userId"),
    commonMiddleware.targetIsNotAdmin,
    authMiddleware.checkAccessToken,
    authMiddleware.checkPermission(PermissionsEnum.MANAGE_MANAGER_ROLE),
    userController.upgradeToManager,
);

router.patch(
    "/:userId/downgrade-from-manager",
    commonMiddleware.isTargetUserIdValid("userId"),
    commonMiddleware.targetIsNotAdmin,
    authMiddleware.checkAccessToken,
    authMiddleware.checkPermission(PermissionsEnum.MANAGE_MANAGER_ROLE),
    userController.downgradeFromManager,
);

export const userRouter = router;
