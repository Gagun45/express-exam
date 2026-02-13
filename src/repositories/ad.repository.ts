import { QueryFilter } from "mongoose";

import { IAd, IAdEntityCreateDto } from "../interfaces/ad.interface";
import { Ad } from "../models/ad.model";

export const adRepository = {
    create: (dto: IAdEntityCreateDto): Promise<IAd> => Ad.create(dto),
    getAll: (): Promise<IAd[]> => Ad.find(),
    getById: (id: string): Promise<IAd | null> => Ad.findById(id),
    getManyByParams: (params: QueryFilter<IAd>): Promise<IAd[]> =>
        Ad.find(params),
    updateById: (id: string, params: QueryFilter<IAd>): Promise<IAd> =>
        Ad.findByIdAndUpdate(id, params, { returnDocument: "after" }),
    countByParams: (params: QueryFilter<IAd>): Promise<number> =>
        Ad.countDocuments(params),
};
