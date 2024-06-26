import { IMenu } from "./menu-item.interface";
import { IUser } from "./user.interface";

export interface LoginResponse {
    ok: boolean;
    uid?: string;
    name?: string;
    email?: string;
    token?: string;
    user?: IUser;
    menu: IMenu[];
}