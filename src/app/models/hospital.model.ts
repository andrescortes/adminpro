import { environment } from "../../environments/environment";
import { User } from "./user.model";

const base_url = environment.base_url;
export class Hospital {
    constructor(
        public _id: string,
        public name: string,
        public user: User,
        public img?: string,
    ) { }


    public get imgUrl(): string {
        if (this.img?.startsWith('https')) {
            return this.img;
        }
        if (this.img) {
            return `${base_url}/uploads/collections/hospitals/${this.img}`;
        }
        return `${base_url}/uploads/collections/hospitals/${this.img ?? 'no-image.png'}`;
    }

    bind(object: any): Hospital {
        return Object.assign(Object.seal(this), object);
    }

}