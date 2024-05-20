import { UsageStatus } from "@prisma/client";
import { IMultipleFinders, ISingleFinder } from "../types/finders.type";
import { Tag, TagProp } from "../types/tag.type";
import { Database } from "./database.model";

export class TagModel extends Database<Tag, TagProp> implements ISingleFinder<Tag>, IMultipleFinders<Tag> {
    protected selectProps(): TagProp {
        return {
            id: true,
            name: true
        };
    }

    async insert(entity: Tag): Promise<Tag> {
        const prisma = this.open();

        const addedTag = await prisma.tag.create({
            data: {
                name: entity.name
            },
            select: this.selectProps()
        });

        await this.close();
        return addedTag;
    }

    async update(entity: Tag): Promise<Tag> {
        const prisma = this.open();

        const updatedTag = await prisma.tag.update({
            where: {
                id: entity.id
            },
            data: {
                name: entity.name
            },
            select: this.selectProps()
        });

        await this.close();
        return updatedTag;
    }

    async delete(entityId: string | number): Promise<void> {
        const prisma = this.open();

        await prisma.tag.update({
            where: {
                id: +entityId
            },
            data: {
                status: UsageStatus.HIDDEN
            }
        });

        await this.close();
    }

    async find(value: string | number): Promise<Tag | null> {
        const prisma = this.open();
        let foundTag: Tag | null = null;
        
        if (typeof value === "number") {
            foundTag = await prisma.tag.findFirst({
                where: {
                    id: value,
                    status: UsageStatus.ACTIVE
                },
                select: this.selectProps()
            });
        }
        else {
            foundTag = await prisma.tag.findFirst({
                where: {
                    name: {
                        contains: value,
                        mode: "insensitive"
                    }
                }
            });
        }

        await this.close();
        return foundTag;
    }

    async findAll(page: number, rows: number): Promise<Tag[]> {
        const prisma = this.open();

        const tags = await prisma.tag.findMany({
            skip: page * rows,
            take: rows,
            where: {
                status: UsageStatus.ACTIVE
            },
            select: this.selectProps()
        });

        await this.close();
        return tags;
    }

    async countRows(): Promise<number> {
        const prisma = this.open();

        const tags = await prisma.tag.count({
            where: {
                status: UsageStatus.ACTIVE
            }
        });

        await this.close();
        return tags;
    }
}