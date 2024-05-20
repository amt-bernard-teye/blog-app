import { UsageStatus } from "@prisma/client";

export interface Tag {
    id?: number;
    name: string;
    status?: UsageStatus
}

export interface TagProp {
    id: boolean;
    name: boolean;
}