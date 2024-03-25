export interface LoginResponse {
    ok: boolean;
    uid?: string;
    name?: string;
    email?: string;
    token?: string;
    user?: User;
}

export interface User {
    name: string,
    email: string,
    role: string,
    status: boolean,
    google: boolean,
    uid: string,
}