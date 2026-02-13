import { Router } from "express";

import { cityController } from "../controllers/city.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { commonMiddleware } from "../middlewares/common.middleware";
import { cityValidator } from "../validators/city.schema";

const router = Router();

router.get("/", cityController.getAll);
router.post(
    "/",
    authMiddleware.checkAccessToken,
    commonMiddleware.isBodyValid(cityValidator.create),
    cityController.create,
);

export const cityRouter = router;
