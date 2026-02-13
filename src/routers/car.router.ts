import { Router } from "express";

import { carBrandController } from "../controllers/car-brand.controller";
import { carModelController } from "../controllers/car-model.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { commonMiddleware } from "../middlewares/common.middleware";
import { VALIDATORS } from "../validators/validators";

const router = Router();

router.get("/brands", carBrandController.getAll);
router.post(
    "/brands",
    authMiddleware.checkAccessToken,
    commonMiddleware.isBodyValid(VALIDATORS.car.createBrand),
    carBrandController.create,
);

router.get(
    "/models/:brandId",
    commonMiddleware.isIdValid("brandId"),
    carModelController.getAllByBrandId,
);
router.post(
    "/models/:brandId",
    authMiddleware.checkAccessToken,
    commonMiddleware.isIdValid("brandId"),
    commonMiddleware.isBodyValid(VALIDATORS.car.createModel),
    carModelController.create,
);

export const carRouter = router;
