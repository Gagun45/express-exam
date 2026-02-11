import { ITokenPair } from "./token.interface";
import { IUser } from "./user.interface";

export interface IAuthResponse {
    user: IUser;
    tokens: ITokenPair;
}

export interface IAuthCredentials {
    email: string;
    password: string;
}
