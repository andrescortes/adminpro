import { IDoctorApi } from "./doctor-api.interface";

export interface IDoctorsApi {
    data: IDoctorApi[];
    ok: boolean;
}