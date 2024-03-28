import { IHospital } from "./hospital.interface";
import { IUser } from "./user.interface";

export interface IDoctor {
    name: string;
    hospital: IHospital;
    user: IUser;
    img?: string;    
}