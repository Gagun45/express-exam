import { UpdateQuery } from "mongoose";

import { MAX_EDIT_ATTEMPTS } from "../constants/constants.constants";
import { AdStatusEnum } from "../enums/ad-status.enum";
import { PermissionsEnum } from "../enums/permissions.enum";
import { StatusCodesEnum } from "../enums/status-codes.enum";
import { UserAccountTypesEnum } from "../enums/user-account-types.enum";
import { ApiError } from "../errors/api.error";
import { generalHelper } from "../helpers/general.helper";
import { calculatePrices } from "../helpers/price.helper";
import { roleHelper } from "../helpers/role.helper";
import { IAd, IAdCreateDto, IAdPopulated } from "../interfaces/ad.interface";
import { IUser } from "../interfaces/user.interface";
import { adRepository } from "../repositories/ad.repository";
import { carBrandService } from "./car-brand.service";
import { carModelService } from "./car-model.service";
import { cityService } from "./city.service";

export const adService = {
    create: async (
        dto: IAdCreateDto,
        user: IUser,
    ): Promise<{ ad: IAd; message: string | null }> => {
        roleHelper.assertRoleHasPermission(
            user.role,
            PermissionsEnum.CREATE_AD,
        );
        if (user.accountType === UserAccountTypesEnum.BASIC) {
            const activeAdsCount = await adRepository.countByParams({
                creator: user._id,
                status: {
                    $in: [AdStatusEnum.ACTIVE, AdStatusEnum.PENDING],
                },
            });
            if (activeAdsCount >= 1) {
                throw new ApiError(
                    "BASIC account can only have 1 active add. Upgdate to PREMIUM to post more",
                    StatusCodesEnum.FORBIDDEN,
                );
            }
        }

        await cityService.assertExistsByParams({ _id: dto.city.toString() });

        const priceData = calculatePrices(dto.price, dto.currency);

        const hasBadWords = generalHelper.containsBannedWords(dto.description);

        const status = hasBadWords ? AdStatusEnum.PENDING : AdStatusEnum.ACTIVE;

        await carBrandService.assertExistsById(dto.carBrand.toString());
        const carModel = await carModelService.getById(dto.carModel.toString());
        if (!carModel.brand.equals(dto.carBrand)) {
            throw new ApiError(
                "Model does not belong to brand",
                StatusCodesEnum.BAD_REQUEST,
            );
        }
        const newAd = await adRepository.create({
            ...dto,
            price: priceData,
            creator: user._id,
            status,
            editAttempts: hasBadWords ? 1 : 0,
            views: 0,
        });
        return {
            ad: newAd,
            message: hasBadWords
                ? "Your desc contains suspicious words and needs editing"
                : "Ad has been created",
        };
    },
    getAll: (): Promise<IAdPopulated[]> => adRepository.findAll(),
    getPopulatedById: async (adId: string): Promise<IAdPopulated> => {
        const existingAd = await adRepository.getOnePopulatedById(adId);
        if (!existingAd)
            throw new ApiError("Ad not found", StatusCodesEnum.NOT_FOUND);
        return existingAd;
    },
    updateById: async (
        adId: string,
        params: UpdateQuery<IAd>,
    ): Promise<IAd> => {
        const updatedAd = await adRepository.updateById(adId, params);
        if (!updatedAd)
            throw new ApiError("Ad not found", StatusCodesEnum.NOT_FOUND);
        return updatedAd;
    },
    viewPublicAd: async (adId: string): Promise<IAdPopulated> => {
        await adService.updateById(adId, { $inc: { views: 1 } });
        return await adRepository.getOnePopulatedById(adId);
    },
    getMy: (user: IUser): Promise<IAdPopulated[]> =>
        adRepository.getManyByParams({ creator: user._id }),
    editDescription: async (
        adId: string,
        description: string,
        user: IUser,
    ): Promise<{ ad: IAd; message: string }> => {
        const existingAd = await adRepository.findById(adId);
        if (!existingAd)
            throw new ApiError("Ad not found", StatusCodesEnum.NOT_FOUND);
        if (!existingAd.creator._id.equals(user._id))
            throw new ApiError(
                "You can only edit your own ads",
                StatusCodesEnum.FORBIDDEN,
            );
        if (existingAd.status === AdStatusEnum.INACTIVE)
            throw new ApiError("Ad is locked", StatusCodesEnum.FORBIDDEN);

        const hasBadWords = generalHelper.containsBannedWords(description);

        // approved
        if (!hasBadWords) {
            const updatedAd = await adRepository.updateById(adId, {
                description,
                status: AdStatusEnum.ACTIVE,
                editAttempts: 0,
            });
            return {
                ad: updatedAd,
                message: "Description approved, status: active",
            };
        }

        // bad words found
        const newAttempts = existingAd.editAttempts + 1;

        //max attempts reached
        if (newAttempts >= MAX_EDIT_ATTEMPTS) {
            // TODO Notify manager
            const updatedAd = await adRepository.updateById(adId, {
                description,
                status: AdStatusEnum.INACTIVE,
                editAttempts: newAttempts,
            });
            return {
                ad: updatedAd,
                message:
                    "Maximum edit attempts reached, we will notify manager, status: inactive",
            };
        }

        //still under max attempts
        const updatedAd = await adRepository.updateById(adId, {
            description,
            status: AdStatusEnum.PENDING,
            editAttempts: newAttempts,
        });
        return {
            ad: updatedAd,
            message: `Description contains prohibited words. Attempt ${newAttempts}/${MAX_EDIT_ATTEMPTS}`,
        };
    },
};
