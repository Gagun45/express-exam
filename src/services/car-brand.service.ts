import { PermissionsEnum } from "../enums/permissions.enum";
import { StatusCodesEnum } from "../enums/status-codes.enum";
import { ApiError } from "../errors/api.error";
import { roleHelper } from "../helpers/role.helper";
import {
    ICarBrand,
    ICarBrandCreateDto,
} from "../interfaces/car-brand.interface";
import { IUser } from "../interfaces/user.interface";
import { carBrandRepository } from "../repositories/car-brand.repository";

export const carBrandService = {
    assertExistsById: async (brandId: string): Promise<void> => {
        const existingBrand = await carBrandRepository.findById(brandId);
        if (!existingBrand)
            throw new ApiError("Brand not found", StatusCodesEnum.NOT_FOUND);
    },
    getAll: (): Promise<ICarBrand[]> => carBrandRepository.getAll(),
    create: async (
        dto: ICarBrandCreateDto,
        user: IUser,
    ): Promise<ICarBrand> => {
        roleHelper.assertRoleHasPermission(
            user.role,
            PermissionsEnum.ADD_BRAND_AND_MODELS,
        );
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
