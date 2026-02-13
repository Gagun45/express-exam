import { QueryFilter } from "mongoose";

import { ICity, ICityCreateDto } from "../interfaces/city.interface";
import { City } from "../models/city.model";

export const cityRepository = {
    create: (dto: ICityCreateDto): Promise<ICity> => City.create(dto),
    getAll: (): Promise<ICity[]> => City.find(),
    getOneByParams: (params: QueryFilter<ICity>): Promise<ICity | null> =>
        City.findOne(params),
};
