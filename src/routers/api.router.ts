import { Router } from "express";

import { adRouter } from "./ad.router";
import { authRouter } from "./auth.router";
import { carRouter } from "./car.router";
import { userRouter } from "./user.router";

const router = Router();

router.use("/auth", authRouter);
router.use("/users", userRouter);
router.use("/cars", carRouter);
router.use("/ads", adRouter);

export const apiRouter = router;
