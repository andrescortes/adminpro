export interface LoginResponse {
    ok: boolean;
    uid?: string;
    name?: string;
    email?: string;
    token?: string;
    user?: User;
}

export interface User {
    name: string;
    email: string;
    password?: string;
    img?: string;
    role?: string;
    status?: boolean;
    google?: boolean;
    uid?: string;
}