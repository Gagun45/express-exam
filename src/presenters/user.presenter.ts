import { IPublicUser, IUser } from "../interfaces/user.interface";

export const userPresenter = {
    toPublicUser: (entity: IUser): IPublicUser => {
        return {
            accountType: entity.accountType,
            email: entity.email,
            isBanned: entity.isBanned,
            id: entity._id.toString(),
            role: entity.role,
        };
    },
};
