import { PermissionsEnum } from "../enums/permissions.enum";
import { StatusCodesEnum } from "../enums/status-codes.enum";
import { UserRolesEnum } from "../enums/user-roles.enum";
import { ApiError } from "../errors/api.error";
import { roleHelper } from "../helpers/role.helper";
import {
    ICarBrand,
    ICarBrandCreateDto,
} from "../interfaces/car-brand.interface";
import { carBrandRepository } from "../repositories/car-brand.repository";

export const carBrandService = {
    getAll: (): Promise<ICarBrand[]> => carBrandRepository.getAll(),
    create: async (
        dto: ICarBrandCreateDto,
        userRole: UserRolesEnum,
    ): Promise<ICarBrand> => {
        roleHelper.assertRoleHasPermission(userRole, PermissionsEnum.ADD_BRAND);
        const existingBrand = await carBrandRepository.findOneByParams({
            brand: dto.brand,
        });
        if (existingBrand)
            throw new ApiError(
                "Brand with the same name already exists",
                StatusCodesEnum.BAD_REQUEST,
            );
        return await carBrandRepository.create(dto);
    },
};
