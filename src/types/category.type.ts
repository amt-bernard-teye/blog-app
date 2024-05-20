import { UsageStatus } from "@prisma/client";

export interface Category {
    id?: number;
    name: string;
    status?: UsageStatus;
}

export interface CategoryProp {
    id: boolean;
    name: boolean;
}