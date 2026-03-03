import { Router } from "express";

import { adController } from "../controllers/ad.controller";
import { PermissionsEnum } from "../enums/permissions.enum";
import { authMiddleware } from "../middlewares/auth.middleware";
import { commonMiddleware } from "../middlewares/common.middleware";
import { permissionMiddleware } from "../middlewares/permission.middleware";
import { VALIDATORS } from "../validators/validators";

const adId = "adId";

const router = Router();

router.get(
    "/",
    commonMiddleware.isQueryValid(VALIDATORS.ad.query),
    adController.getAll,
);
router.get(
    "/my",
    authMiddleware.checkAccessToken,
    commonMiddleware.isQueryValid(VALIDATORS.ad.query),
    adController.getMy,
);
router.get(
    `/:${adId}`,
    commonMiddleware.isIdValid(adId),
    adController.viewPublicAd,
);
router.get(
    `/:${adId}/stats`,
    authMiddleware.checkAccessToken,
    commonMiddleware.isIdValid(adId),
    permissionMiddleware.isPremium,
    adController.getAdStats,
);
router.post(
    "/",
    authMiddleware.checkAccessToken,
    commonMiddleware.isBodyValid(VALIDATORS.ad.create),
    permissionMiddleware.hasPermission(PermissionsEnum.CREATE_AD),
    adController.create,
);

router.patch(
    `/:${adId}/description`,
    authMiddleware.checkAccessToken,
    commonMiddleware.isBodyValid(VALIDATORS.ad.editDescription),
    adController.editDescription,
);

export const adRouter = router;
