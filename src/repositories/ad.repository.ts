import { QueryFilter, Types, UpdateQuery, UpdateResult } from "mongoose";

import { AdStatusEnum } from "../enums/ad-status.enum";
import { CurrencyEnum } from "../enums/currency.enum";
import { adHelper } from "../helpers/ad.helper";
import {
    IAd,
    IAdEntityCreateDto,
    IAdPopulated,
} from "../interfaces/ad.interface";
import { IAvgPrice } from "../interfaces/ad-stats.interface";
import { Ad } from "../models/ad.model";

export const adRepository = {
    create: async (dto: IAdEntityCreateDto): Promise<IAd> => {
        const createdAd = await Ad.create(dto);
        return await Ad.findById(createdAd._id);
    },

    findOnePopulatedById: (id: string): Promise<IAdPopulated | null> =>
        adHelper.populateAdQuery(Ad.findById(id)).lean<IAdPopulated>(),
    findOnePopulatedByParams: (
        params: QueryFilter<IAd>,
    ): Promise<IAdPopulated | null> =>
        adHelper.populateAdQuery(Ad.findOne(params)).lean<IAdPopulated>(),

    findManyPopulated: (params: QueryFilter<IAd>): Promise<IAdPopulated[]> =>
        adHelper.populateAdQuery(Ad.find(params)).lean<IAdPopulated[]>(),

    findMany: (params: QueryFilter<IAd>): Promise<IAd[]> => Ad.find(params),
    findOneById: (id: string): Promise<IAd | null> => Ad.findById(id),

    updateOneById: (
        id: string,
        params: UpdateQuery<IAd>,
    ): Promise<IAd | null> =>
        Ad.findByIdAndUpdate(id, params, { returnDocument: "after" }),
    updateMany: (
        filter: QueryFilter<IAd>,
        params: UpdateQuery<IAd>,
    ): Promise<UpdateResult> => Ad.updateMany(filter, params),
    countByParams: (params: QueryFilter<IAd>): Promise<number> =>
        Ad.countDocuments(params),
    getAvgPriceByCarModelByCityId: async (
        carModelId: string,
        cityId?: string,
    ): Promise<IAvgPrice> => {
        const match: QueryFilter<IAd> = {
            status: AdStatusEnum.ACTIVE,
            carModel: new Types.ObjectId(carModelId),
        };
        if (cityId) {
            match.city = new Types.ObjectId(cityId);
        }
        const [result] = await Ad.aggregate<IAvgPrice>([
            {
                $match: match,
            },
            {
                $group: {
                    _id: null,
                    [CurrencyEnum.UAH]: { $avg: `$price.${CurrencyEnum.UAH}` },
                    [CurrencyEnum.USD]: { $avg: `$price.${CurrencyEnum.USD}` },
                    [CurrencyEnum.EUR]: { $avg: `$price.${CurrencyEnum.EUR}` },
                },
            },
            {
                $project: {
                    _id: 0,
                },
            },
        ]);
        return result;
    },
};
