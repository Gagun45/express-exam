import { QueryFilter, UpdateQuery, UpdateResult } from "mongoose";

import { adHelper } from "../helpers/ad.helper";
import { IAd, IAdCreateDto, IAdPopulated } from "../interfaces/ad.interface";
import { Ad } from "../models/ad.model";

export const adRepository = {
    create: (dto: IAdCreateDto, creatorId: string): Promise<IAd> =>
        Ad.create({ ...dto, creator: creatorId }),

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
};
