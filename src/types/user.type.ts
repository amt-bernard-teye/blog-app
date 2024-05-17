import { Role, VerificationStatus } from "@prisma/client";

export interface User {
    id?: string;
    name: string;
    email: string;
    password?: string;
    image: string | null;
    role: Role;
    status?: VerificationStatus;
}

export interface UserProp {
    id: boolean;
    name: boolean;
    email: boolean;
    image: boolean;
    role: boolean;
    status: boolean;
}