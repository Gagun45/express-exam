import { QueryFilter, UpdateQuery } from "mongoose";

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
    getOnePopulatedById: (id: string): Promise<IAdPopulated | null> =>
        Ad.findById(id)
            .populate("carBrand")
            .populate("carModel")
            .populate("creator")
            .populate("city")
            .lean<IAdPopulated>(),
    findAll: (): Promise<IAdPopulated[]> =>
        Ad.find({ status: AdStatusEnum.ACTIVE })
            .populate("carBrand")
            .populate("carModel")
            .populate("creator")
            .populate("city")
            .lean<IAdPopulated[]>(),
    findById: (id: string): Promise<IAdPopulated | null> =>
        Ad.findById(id)
            .populate("carBrand")
            .populate("carModel")
            .populate("creator")
            .populate("city")
            .lean<IAdPopulated>(),

    getManyByParams: (params: QueryFilter<IAd>): Promise<IAdPopulated[]> =>
        Ad.find(params)
            .populate("carBrand")
            .populate("carModel")
            .populate("creator")
            .populate("city")
            .lean<IAdPopulated[]>(),

    updateById: (id: string, params: UpdateQuery<IAd>): Promise<IAd | null> =>
        Ad.findByIdAndUpdate(id, params, { returnDocument: "after" }),
    countByParams: (params: QueryFilter<IAd>): Promise<number> =>
        Ad.countDocuments(params),
};
