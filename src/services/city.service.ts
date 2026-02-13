import { PermissionsEnum } from "../enums/permissions.enum";
import { StatusCodesEnum } from "../enums/status-codes.enum";
import { ApiError } from "../errors/api.error";
import { roleHelper } from "../helpers/role.helper";
import { ICity, ICityCreateDto } from "../interfaces/city.interface";
import { IUser } from "../interfaces/user.interface";
import { cityRepository } from "../repositories/city.repository";

export const cityService = {
    create: async (dto: ICityCreateDto, user: IUser): Promise<ICity> => {
        roleHelper.assertRoleHasPermission(
            user.role,
            PermissionsEnum.CREATE_CITY,
        );

        const existingCity = await cityRepository.getOneByParams({
            city: dto.city,
        });

        if (existingCity)
            throw new ApiError("City already exists", StatusCodesEnum.CONFLICT);

        return await cityRepository.create(dto);
    },
    getAll: (): Promise<ICity[]> => cityRepository.getAll(),
};
