export interface Page {
    name: string;
    path: string;
    active: boolean;
}

export interface Login {
    email: string;
    password: string;
}

export interface Register {
    firstname: string;
    lastname: string;
    username: string;
    phone: number;
    email: string;
    password: string;
    confirmPassword: string;
}