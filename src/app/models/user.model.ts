import { environment } from "../../environments/environment";

const base_url = environment.base_url;
export class User {
    constructor(
        public name: string,
        public email: string,
        public password?: string,
        public img?: string,
        public role?: string,
        public status?: boolean,
        public google?: boolean,
        public uid?: string
    ) { }


    public get imgUrl(): string {
        if (this.img?.startsWith('https')) {
            return this.img;
        }
        if (this.img) {
            return `${base_url}/uploads/collections/users/${this.img}`;
        }
        return `${base_url}/uploads/collections/users/${this.img ?? 'no-image.png'}`;
    }

    bind(object: any): User {
        return Object.assign(Object.seal(this), object);
    }

}