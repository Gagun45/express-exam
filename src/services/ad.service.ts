import { PermissionsEnum } from "../enums/permissions.enum";
import { StatusCodesEnum } from "../enums/status-codes.enum";
import { ApiError } from "../errors/api.error";
import { calculatePrices } from "../helpers/price.helper";
import { roleHelper } from "../helpers/role.helper";
import { IAd, IAdCreateDto } from "../interfaces/ad.interface";
import { IUser } from "../interfaces/user.interface";
import { adRepository } from "../repositories/ad.repository";
import { carBrandService } from "./car-brand.service";
import { carModelService } from "./car-model.service";

export const adService = {
    create: async (dto: IAdCreateDto, user: IUser): Promise<IAd> => {
        roleHelper.assertRoleHasPermission(
            user.role,
            PermissionsEnum.CREATE_AD,
        );
        const priceData = calculatePrices(dto.price, dto.currency);

        await carBrandService.assertExistsById(dto.carBrand.toString());
        const carModel = await carModelService.getById(dto.carModel.toString());
        if (!carModel.brandId.equals(dto.carBrand)) {
            throw new ApiError(
                "Model does not belong to brand",
                StatusCodesEnum.BAD_REQUEST,
            );
        }
        return await adRepository.create({
            ...dto,
            price: priceData,
            creator: user._id,
        });
    },
    getAll: (): Promise<IAd[]> => adRepository.getAll(),
    getMy: (user: IUser): Promise<IAd[]> =>
        adRepository.getByParams({ creator: user._id }),
};
