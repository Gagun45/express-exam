import { PermissionsEnum } from "../enums/permissions.enum";
import { StatusCodesEnum } from "../enums/status-codes.enum";
import { ApiError } from "../errors/api.error";
import { roleHelper } from "../helpers/role.helper";
import {
    ICarModel,
    ICarModelCreateDto,
} from "../interfaces/car-model.interface";
import { IUser } from "../interfaces/user.interface";
import { carBrandRepository } from "../repositories/car-brand.repository";
import { carModelRepository } from "../repositories/car-model.repository";
import { carBrandService } from "./car-brand.service";

export const carModelService = {
    getAllByBrandId: async (brandId: string): Promise<ICarModel[]> => {
        const existingBrand = await carBrandRepository.findOneByParams({
            _id: brandId,
        });
        if (!existingBrand)
            throw new ApiError("Brand doesnt exist", StatusCodesEnum.NOT_FOUND);
        return await carModelRepository.getAllByBrandId(brandId);
    },
    create: async (
        dto: ICarModelCreateDto,
        brandId: string,
        user: IUser,
    ): Promise<ICarModel> => {
        roleHelper.assertRoleHasPermission(
            user.role,
            PermissionsEnum.ADD_BRAND_AND_MODELS,
        );
        await carBrandService.assertExistsById(brandId);
        return await carModelRepository.create(dto, brandId);
    },
    getById: async (modelId: string): Promise<ICarModel> => {
        const existingModel = await carModelRepository.findById(modelId);
        if (!existingModel)
            throw new ApiError("Model not found", StatusCodesEnum.NOT_FOUND);
        return existingModel;
    },
};
