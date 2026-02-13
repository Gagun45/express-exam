import { Router } from "express";

import { adController } from "../controllers/ad.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { commonMiddleware } from "../middlewares/common.middleware";
import { adValidator } from "../validators/ad.schema";

const router = Router();

router.get("/", adController.getAll);
router.get("/my", authMiddleware.checkAccessToken, adController.getMy);
router.post(
    "/",
    authMiddleware.checkAccessToken,
    commonMiddleware.isBodyValid(adValidator.create),
    adController.create,
);

export const adRouter = router;
