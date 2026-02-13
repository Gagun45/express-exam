import { ICarModel, IPubicCarModel } from "../interfaces/car-model.interface";

export const carModelPresenter = {
    toPublicCarModel: (entity: ICarModel): IPubicCarModel => {
        return {
            id: entity._id.toString(),
            model: entity.model,
        };
    },
    toPublicCarModels: (entities: ICarModel[]): IPubicCarModel[] =>
        entities.map(carModelPresenter.toPublicCarModel),
};
