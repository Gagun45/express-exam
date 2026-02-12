import { IUser } from "./models/User"; // Adjust path to your actual interface

declare global {
    namespace Express {
        interface Locals {
            currentUserId: string;
            targetUserId: string;
            currentUser: IUser;
        }
    }
}
