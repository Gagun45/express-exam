import { Router } from "express";

import { carBrandController } from "../controllers/car-brand.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { commonMiddleware } from "../middlewares/common.middleware";
import { carBrandValidator } from "../validators/car-brand.schema";

const router = Router();

router.get("/brands", carBrandController.getAll);
router.post(
    "/brands",
    authMiddleware.checkAccessToken,
    commonMiddleware.isBodyValid(carBrandValidator.create),
    carBrandController.create,
);

export const carRouter = router;
