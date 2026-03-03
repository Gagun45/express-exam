import { Router } from "express";

import { adRouter } from "./ad.router";
import { authRouter } from "./auth.router";
import { brandRouter } from "./brand.router";
import { cityRouter } from "./city.router";
import { modelRouter } from "./model.router";
import { reportRouter } from "./report.router";
import { userRouter } from "./user.router";

const router = Router();

router.use("/auth", authRouter);
router.use("/users", userRouter);
router.use("/brands", brandRouter);
router.use("/models", modelRouter);
router.use("/ads", adRouter);
router.use("/reports", reportRouter);
router.use("/cities", cityRouter);

export const apiRouter = router;
