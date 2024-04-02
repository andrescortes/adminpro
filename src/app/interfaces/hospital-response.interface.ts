import { IHospital } from "./hospital.interface";

export interface IHospitalResponse {
    ok: boolean;
    hospitals: IHospital[];
}