import { IAdPopulated, IPublicAd } from "../interfaces/ad.interface";

export const adPresenter = {
    toPublicAd: (entity: IAdPopulated): IPublicAd => {
        return {
            id: entity._id.toString(),
            description: entity.description,
            creator: {
                id: entity.creator._id.toString(),
                email: entity.creator.email,
                role: entity.creator.role,
            },
            price: entity.price,
            status: entity.status,
            carBrand: {
                id: entity.carBrand._id.toString(),
                brand: entity.carBrand.brand,
            },
            carModel: {
                id: entity.carModel._id.toString(),
                model: entity.carModel.model,
            },
            city: {
                id: entity.city._id.toString(),
                city: entity.city.city,
            },
            createdAt: entity.createdAt.toISOString(),
        };
    },
    toPublicAds: (entities: IAdPopulated[]): IPublicAd[] =>
        entities.map(adPresenter.toPublicAd),
};
