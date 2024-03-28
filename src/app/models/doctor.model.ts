import { environment } from "../../environments/environment";
import { Hospital } from "./hospital.model";
import { User } from "./user.model";

const base_url = environment.base_url;
export class Doctor {
    constructor(
        public name: string,
        public user: User,
        public hospital: Hospital,
        public img?: string,
    ) { }


    public get imgUrl(): string {
        if (this.img) {
            return `${base_url}/uploads/collections/doctors/${this.img}`;
        }
        if (this.img?.startsWith('https')) {
            return this.img;
        }
        return `${base_url}/uploads/collections/doctors/${this.img ?? 'no-image.png'}`;
    }

    bind(object: any): Doctor {
        return Object.assign(Object.seal(this), object);
    }

}