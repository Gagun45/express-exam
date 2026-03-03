import { ReportTypeEnum } from "../enums/report-type.enum";
import { StatusCodesEnum } from "../enums/status-codes.enum";
import { ApiError } from "../errors/api.error";
import {
    IReport,
    IReportEntityCreateDto,
} from "../interfaces/report.interface";
import { reportRepository } from "../repositories/report.repository";
import { carBrandService } from "./car-brand.service";

export const reportService = {
    create: async (dto: IReportEntityCreateDto): Promise<IReport> => {
        if (dto.type === ReportTypeEnum.MODEL) {
            if (!dto.relatedBrandId)
                throw new ApiError(
                    "Brand ID is required for models",
                    StatusCodesEnum.BAD_REQUEST,
                );
            await carBrandService.assertExistsById(
                dto.relatedBrandId.toString(),
            );
        }
        return await reportRepository.create(dto);
    },
    getAll: () => reportRepository.getAll(),
};
