import { QueryFilter } from "mongoose";

import { IAd, IAdEntityCreateDto } from "../interfaces/ad.interface";
import { Ad } from "../models/ad.model";

export const adRepository = {
    create: (dto: IAdEntityCreateDto): Promise<IAd> => Ad.create(dto),
    getAll: (): Promise<IAd[]> => Ad.find(),
    getByParams: (params: QueryFilter<IAd>): Promise<IAd[]> => Ad.find(params),
};
