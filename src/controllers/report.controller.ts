import { NextFunction, Request, Response } from "express";

import { ReportTypeEnum } from "../enums/report-type.enum";
import { StatusCodesEnum } from "../enums/status-codes.enum";
import { IReportCreateDto } from "../interfaces/report.interface";
import { reportService } from "../services/report.service";

export const reportController = {
    createReportHandler: (type: ReportTypeEnum) => {
        return async (req: Request, res: Response, next: NextFunction) => {
            try {
                const dto = req.body as IReportCreateDto;
                const data = await reportService.create({ ...dto, type });
                res.status(StatusCodesEnum.CREATED).json(data);
            } catch (e) {
                next(e);
            }
        };
    },

    getAll: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { currentUser } = res.locals;
            const data = await reportService.getAll(currentUser);
            res.status(StatusCodesEnum.OK).json(data);
        } catch (e) {
            next(e);
        }
    },
};
