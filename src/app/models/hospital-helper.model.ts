interface _HospitalUser {
    _id: string;
    name: string;
    img: string;
}

export class HospitalHelper {
    constructor(
        public _id: string,
        public uid: string,
        public name: string,
        public user: _HospitalUser,
        public img: string,
    ) { }
}