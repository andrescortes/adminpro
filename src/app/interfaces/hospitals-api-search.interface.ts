import { HospitalHelper } from "../models/hospital-helper.model";

export interface IHospitalsApiSearch {
    data: HospitalHelper[]
    ok: boolean
}