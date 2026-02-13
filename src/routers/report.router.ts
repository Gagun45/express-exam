import { Router } from "express";

import { reportController } from "../controllers/report.controller";
import { ReportTypeEnum } from "../enums/report-type.enum";
import { authMiddleware } from "../middlewares/auth.middleware";
import { commonMiddleware } from "../middlewares/common.middleware";
import { reportVadidator } from "../validators/report.schema";

const router = Router();

router.get("/", authMiddleware.checkAccessToken, reportController.getAll);

router.post(
    "/brand",
    authMiddleware.checkAccessToken,
    commonMiddleware.isBodyValid(reportVadidator.brand),
    reportController.createReportHandler(ReportTypeEnum.BRAND),
);

router.post(
    "/model",
    authMiddleware.checkAccessToken,
    commonMiddleware.isBodyValid(reportVadidator.model),
    reportController.createReportHandler(ReportTypeEnum.MODEL),
);

export const reportRouter = router;
