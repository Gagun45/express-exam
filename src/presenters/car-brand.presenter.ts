import { ICarBrand, IPubicCarBrand } from "../interfaces/car-brand.interface";

export const carBrandPresenter = {
    toPublicCarBrand: (entity: ICarBrand): IPubicCarBrand => {
        return {
            id: entity._id.toString(),
            brand: entity.brand,
        };
    },
    toPublicCarBrands: (entities: ICarBrand[]): IPubicCarBrand[] =>
        entities.map(carBrandPresenter.toPublicCarBrand),
};
