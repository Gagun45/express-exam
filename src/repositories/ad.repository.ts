import { QueryFilter } from "mongoose";

import { AdStatusEnum } from "../enums/ad-status.enum";
import {
    IAd,
    IAdEntityCreateDto,
    IAdPopulated,
} from "../interfaces/ad.interface";
import { Ad } from "../models/ad.model";

export const adRepository = {
    create: async (dto: IAdEntityCreateDto): Promise<IAd> => {
        const createdAd = await Ad.create(dto);
        return await Ad.findById(createdAd._id);
    },
    findAll: (): Promise<IAdPopulated[]> =>
        Ad.find({ status: AdStatusEnum.ACTIVE })
            .populate("carBrand")
            .populate("carModel")
            .populate("creator")
            .populate("city")
            .lean<IAdPopulated[]>(),
    findById: (id: string): Promise<IAd | null> => Ad.findById(id),

    getManyByParams: (params: QueryFilter<IAd>): Promise<IAdPopulated[]> =>
        Ad.find(params)
            .populate("carBrand")
            .populate("carModel")
            .populate("creator")
            .populate("city")
            .lean<IAdPopulated[]>(),

    updateById: (id: string, params: QueryFilter<IAd>): Promise<IAd> =>
        Ad.findByIdAndUpdate(id, params, { returnDocument: "after" }),
    countByParams: (params: QueryFilter<IAd>): Promise<number> =>
        Ad.countDocuments(params),
};
