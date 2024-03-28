import { User } from "../models/user.model";

export interface IUserPaginated {
    ok: boolean;
    total: number;
    users: User[];
}