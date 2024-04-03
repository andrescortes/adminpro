import { IDoctorApi } from "./doctor-api.interface";
import { IHospital } from "./hospital.interface";
import { IUser } from "./user.interface";

export interface IModels {
    users: IUser[];
    doctors: IDoctorApi[];
    hospitals: IHospital[];
}