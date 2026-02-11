import { ITokenPair } from "./token.interface";
import { IPublicUser, IUser } from "./user.interface";

export interface IAuthServiceResponse {
    user: IUser;
    tokens: ITokenPair;
}

export interface IAuthPublicResponse {
    user: IPublicUser;
    tokens: ITokenPair;
}

export interface IAuthCredentials {
    email: string;
    password: string;
}
