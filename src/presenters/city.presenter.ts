import { ICity, IPublicCity } from "../interfaces/city.interface";

export const cityPresenter = {
    toPublicCity: (entity: ICity): IPublicCity => {
        return {
            id: entity._id.toString(),
            city: entity.city,
        };
    },
    toPublicCities: (entities: ICity[]): IPublicCity[] =>
        entities.map(cityPresenter.toPublicCity),
};
