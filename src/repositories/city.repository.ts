import { QueryFilter } from "mongoose";

import { ICity, ICityCreateDto } from "../interfaces/city.interface";
import { City } from "../models/city.model";

export const cityRepository = {
    create: (dto: ICityCreateDto): Promise<ICity> => City.create(dto),
    findAll: (): Promise<ICity[]> => City.find(),
    findOneByParams: (params: QueryFilter<ICity>): Promise<ICity | null> =>
        City.findOne(params),
};
