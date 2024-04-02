import { IDoctorApi } from "./doctor-api.interface";

export interface IDoctorsApiData {
    doctors: IDoctorApi[];
    ok: boolean;
}