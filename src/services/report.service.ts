import { PermissionsEnum } from "../enums/permissions.enum";
import { ReportTypeEnum } from "../enums/report-type.enum";
import { StatusCodesEnum } from "../enums/status-codes.enum";
import { ApiError } from "../errors/api.error";
import { roleHelper } from "../helpers/role.helper";
import {
    IReport,
    IReportEntityCreateDto,
} from "../interfaces/report.interface";
import { IUser } from "../interfaces/user.interface";
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
    getAll: (user: IUser) => {
        roleHelper.assertRoleHasPermission(
            user.role,
            PermissionsEnum.VIEW_REPORTS,
        );
        return reportRepository.getAll();
    },
};
