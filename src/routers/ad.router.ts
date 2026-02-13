import { Router } from "express";

import { adController } from "../controllers/ad.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { commonMiddleware } from "../middlewares/common.middleware";
import { adValidator } from "../validators/ad.schema";

const adId = "adId";

const router = Router();

router.get("/", adController.getAll);
router.get("/my", authMiddleware.checkAccessToken, adController.getMy);
router.get(
    `/:${adId}`,
    commonMiddleware.isIdValid(adId),
    adController.viewPublicAd,
);
router.post(
    "/",
    authMiddleware.checkAccessToken,
    commonMiddleware.isBodyValid(adValidator.create),
    adController.create,
);

router.patch(
    `/:${adId}/description`,
    authMiddleware.checkAccessToken,
    commonMiddleware.isBodyValid(adValidator.editDescription),
    adController.editDescription,
);

export const adRouter = router;
