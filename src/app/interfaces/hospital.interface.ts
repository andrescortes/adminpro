import { IUser } from "./user.interface";

export interface IHospital {
    _id: string;
    uid: string;
    name: string;
    user: IUser;
    img?: string;
}