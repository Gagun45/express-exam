import { QueryFilter, UpdateQuery } from "mongoose";

import { MAX_EDIT_ATTEMPTS } from "../constants/constants.constants";
import { AdStatusEnum } from "../enums/ad-status.enum";
import { PermissionsEnum } from "../enums/permissions.enum";
import { StatusCodesEnum } from "../enums/status-codes.enum";
import { UserAccountTypesEnum } from "../enums/user-account-types.enum";
import { ApiError } from "../errors/api.error";
import { dateHelper } from "../helpers/date.helper";
import { generalHelper } from "../helpers/general.helper";
import { priceHelper } from "../helpers/price.helper";
import { roleHelper } from "../helpers/role.helper";
import { IAd, IAdCreateDto, IAdPopulated } from "../interfaces/ad.interface";
import { IAdStats } from "../interfaces/ad-stats.interface";
import { IUser } from "../interfaces/user.interface";
import { adRepository } from "../repositories/ad.repository";
import { viewRepository } from "../repositories/view.repository";
import { carBrandService } from "./car-brand.service";
import { carModelService } from "./car-model.service";
import { cityService } from "./city.service";

export const adService = {
    create: async (
        dto: IAdCreateDto,
        user: IUser,
    ): Promise<{ ad: IAdPopulated; message: string | null }> => {
        roleHelper.assertRoleHasPermission(
            user.role,
            PermissionsEnum.CREATE_AD,
        );
        if (user.accountType === UserAccountTypesEnum.BASIC) {
            const activeAdsCount = await adRepository.countByParams({
                creator: user._id,
                status: AdStatusEnum.ACTIVE,
            });
            if (activeAdsCount >= 1) {
                throw new ApiError(
                    "BASIC account can only have 1 active add. Upgdate to PREMIUM to post more",
                    StatusCodesEnum.FORBIDDEN,
                );
            }
        }

        await cityService.assertExistsByParams({ _id: dto.city.toString() });

        const priceData = priceHelper.calculatePrices(dto.price, dto.currency);

        const hasBadWords = generalHelper.containsBannedWords(dto.description);

        const status = hasBadWords
            ? AdStatusEnum.INACTIVE
            : AdStatusEnum.ACTIVE;

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
        const populatedNewAd = await adRepository.findOnePopulatedById(
            newAd._id.toString(),
        );
        return {
            ad: populatedNewAd,
            message: hasBadWords
                ? "Your desc contains suspicious words and needs editing"
                : "Ad has been created",
        };
    },
    updateMany: (filter: QueryFilter<IAd>, params: UpdateQuery<IAd>) => {
        return adRepository.updateMany(filter, params);
    },
    getAll: (): Promise<IAdPopulated[]> => {
        return adRepository.findManyPopulated({
            status: AdStatusEnum.ACTIVE,
        });
    },
    getOnePopulatedById: async (adId: string): Promise<IAdPopulated> => {
        const existingAd = await adRepository.findOnePopulatedById(adId);
        if (!existingAd)
            throw new ApiError("Ad not found", StatusCodesEnum.NOT_FOUND);
        return existingAd;
    },
    getOneById: async (adId: string): Promise<IAd> => {
        const existingAd = await adRepository.findOneById(adId);
        if (!existingAd)
            throw new ApiError("Ad not found", StatusCodesEnum.NOT_FOUND);
        return existingAd;
    },
    updateById: async (
        adId: string,
        params: UpdateQuery<IAd>,
    ): Promise<IAd> => {
        const updatedAd = await adRepository.updateOneById(adId, params);
        if (!updatedAd)
            throw new ApiError("Ad not found", StatusCodesEnum.NOT_FOUND);
        return updatedAd;
    },
    incrementAdView: async (adId: string) => {
        await viewRepository.create(adId);
        await adService.updateById(adId, { $inc: { views: 1 } });
    },
    viewPublicAd: async (adId: string): Promise<IAdPopulated> => {
        const existingAd = await adService.getOneById(adId);
        if (existingAd.status !== AdStatusEnum.ACTIVE)
            throw new ApiError("Ad is inactive", StatusCodesEnum.BAD_REQUEST);
        await adService.incrementAdView(adId);
        return await adRepository.findOnePopulatedById(adId);
    },
    getMy: (user: IUser): Promise<IAdPopulated[]> =>
        adRepository.findManyPopulated({ creator: user._id }),
    editDescription: async (
        adId: string,
        description: string,
        user: IUser,
    ): Promise<IAdPopulated> => {
        const existingAd = await adRepository.findOneById(adId);

        if (!existingAd)
            throw new ApiError("Ad not found", StatusCodesEnum.NOT_FOUND);

        if (!existingAd.creator._id.equals(user._id))
            throw new ApiError(
                "You can only edit your own ads",
                StatusCodesEnum.FORBIDDEN,
            );

        if (existingAd.status === AdStatusEnum.INACTIVE)
            throw new ApiError("Ad is locked", StatusCodesEnum.FORBIDDEN);

        const newAttempts = existingAd.editAttempts + 1;
        const containsBannedWords =
            generalHelper.containsBannedWords(description);

        if (containsBannedWords) {
            await adRepository.updateOneById(adId, {
                editAttempts: newAttempts,
            });
            if (newAttempts >= MAX_EDIT_ATTEMPTS) {
                // TODO Notify manager
                await adRepository.updateOneById(adId, {
                    status: AdStatusEnum.INACTIVE,
                });
                throw new ApiError(
                    "Maximum edit attempts reached, we will notify manager, status: inactive",
                    StatusCodesEnum.BAD_REQUEST,
                );
            }
            throw new ApiError(
                `Description contains banned words. Edit attempts: ${newAttempts}/${MAX_EDIT_ATTEMPTS}`,
                StatusCodesEnum.BAD_REQUEST,
            );
        }
        await adRepository.updateOneById(adId, {
            description,
            status: AdStatusEnum.ACTIVE,
            editAttempts: 0,
        });
        const ad = await adRepository.findOnePopulatedById(adId);
        return ad;
    },
    getAdStats: async (
        adId: string,
        user: IUser,
    ): Promise<{ ad: IAdPopulated; stats: IAdStats }> => {
        if (user.accountType === UserAccountTypesEnum.BASIC)
            throw new ApiError(
                "Only premium users are allowed",
                StatusCodesEnum.FORBIDDEN,
            );

        const existingAd = await adService.getOnePopulatedById(adId);
        if (!existingAd.creator._id.equals(user._id))
            throw new ApiError(
                "Your own ads stats allowed only",
                StatusCodesEnum.FORBIDDEN,
            );

        if (existingAd.status !== AdStatusEnum.ACTIVE)
            throw new ApiError(
                "Cannot get stats for inactive ad",
                StatusCodesEnum.BAD_REQUEST,
            );

        const lastDay = dateHelper.getDateBeforeNow("day");
        const lastWeek = dateHelper.getDateBeforeNow("week");
        const lastMonth = dateHelper.getDateBeforeNow("month");
        const viewStats = await viewRepository.getAdViewsStats({
            adId,
            lastDay,
            lastWeek,
            lastMonth,
        });

        const averagePriceByCity =
            await adRepository.getAvgPriceByCarModelByCityId(
                existingAd.carModel._id.toString(),
                existingAd.city._id.toString(),
            );
        const averagePriceOverall =
            await adRepository.getAvgPriceByCarModelByCityId(
                existingAd.carModel._id.toString(),
            );

        return {
            ad: existingAd,
            stats: {
                views: viewStats,
                price: {
                    averagePriceByCity,
                    averagePriceOverall,
                },
            },
        };
    },
};
