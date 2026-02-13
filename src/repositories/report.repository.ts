import { IReportEntityCreateDto } from "../interfaces/report.interface";
import { Report } from "../models/report.model";

export const reportRepository = {
    create: (dto: IReportEntityCreateDto) => Report.create(dto),
    getAll: () => Report.find(),
};
