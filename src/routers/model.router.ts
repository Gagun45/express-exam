import { Router } from "express";

import { carModelController } from "../controllers/car-model.controller";
import { PermissionsEnum } from "../enums/permissions.enum";
import { authMiddleware } from "../middlewares/auth.middleware";
import { commonMiddleware } from "../middlewares/common.middleware";
import { permissionMiddleware } from "../middlewares/permission.middleware";
import { VALIDATORS } from "../validators/validators";

const brandId = "brandId";

const router = Router();

router.get(
    `/:${brandId}`,
    commonMiddleware.isIdValid(brandId),
    carModelController.getAllByBrandId,
);
router.post(
    `/:${brandId}`,
    authMiddleware.checkAccessToken,
    commonMiddleware.isIdValid(brandId),
    commonMiddleware.isBodyValid(VALIDATORS.car.createModel),
    permissionMiddleware.hasPermission(PermissionsEnum.CREATE_BRAND_AND_MODEL),
    carModelController.create,
);

export const modelRouter = router;
