import { IHospital } from "./hospital.interface";
import { IUser } from "./user.interface";

export interface IDoctorApi {
    _id: string;
    uid: string;
    name: string;
    img: string;
    user: IUser;
    hospital: IHospital;
}