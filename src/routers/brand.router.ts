import { Router } from "express";

import { carBrandController } from "../controllers/car-brand.controller";
import { PermissionsEnum } from "../enums/permissions.enum";
import { authMiddleware } from "../middlewares/auth.middleware";
import { commonMiddleware } from "../middlewares/common.middleware";
import { permissionMiddleware } from "../middlewares/permission.middleware";
import { VALIDATORS } from "../validators/validators";

const router = Router();

router.get("/", carBrandController.getAll);
router.post(
    "/",
    authMiddleware.checkAccessToken,
    commonMiddleware.isBodyValid(VALIDATORS.car.createBrand),
    permissionMiddleware.hasPermission(PermissionsEnum.CREATE_BRAND_AND_MODEL),
    carBrandController.create,
);

export const brandRouter = router;
