import { IUser } from "./user.interface";

export interface IUserPage {
    users: IUser[];
    total: number;
    ok: boolean;
}