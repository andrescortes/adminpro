import { IUser } from "./user.interface";

export interface IHospital {
    name: string;
    user: IUser;
    img?: string;
}