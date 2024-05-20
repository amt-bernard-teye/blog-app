import { UsageStatus } from "@prisma/client";
import { Category, CategoryProp } from "../types/category.type";
import { IMultipleFinders, ISingleFinder } from "../types/finders.type";
import { Database } from "./database.model";

export class CategoryModel extends Database<Category, CategoryProp> 
    implements ISingleFinder<Category>, IMultipleFinders<Category> {
    protected selectProps(): CategoryProp {
        return {
            id: true,
            name: true
        };
    }

    async insert(entity: Category): Promise<Category> {
        const prisma = this.open();
        
        const addedCategory = await prisma.category.create({
            data: {
                name: entity.name
            },
            select: this.selectProps()
        });

        await this.close();
        return addedCategory;
    }

    async update(entity: Category): Promise<Category> {
        const prisma = this.open();
        
        const updatedCategory = await prisma.category.update({
            where: {
                id: entity.id!
            },
            data: {
                name: entity.name,
                status: entity.status
            }
        });

        await this.close();
        return updatedCategory;
    }

    async delete(entityId: string | number): Promise<void> {
        const prisma = this.open();

        await prisma.category.update({
            where: {
                id: +entityId
            },
            data: {
                status: UsageStatus.HIDDEN
            }
        });
        
        await this.close();
    }

    async find(value: number | string): Promise<Category | null> {
        const prisma = this.open();
        let foundCategory: Category | null = null;

        if(typeof value === "number") {
            foundCategory = await prisma.category.findFirst({
                where: {
                    id: +value,
                    status: UsageStatus.ACTIVE
                }
            });
        } else {
            foundCategory = await prisma.category.findFirst({
                where: {
                    name: {
                        contains: value,
                        mode: "insensitive"
                    }
                }
            })
        }

        await this.close();
        return foundCategory;
    }

    async findAll(page: number, rows: number): Promise<Category[]> {
        const prisma = this.open();

        const categories = await prisma.category.findMany({
            skip: page * rows,
            take: rows,
            where: {
                status: UsageStatus.ACTIVE
            },
            select: this.selectProps()
        });

        await this.close();
        return categories;
    }

    async countRows(): Promise<number> {
        const prisma = this.open();
        const totalCategories = await prisma.category.count({
            where: {
                status: UsageStatus.ACTIVE
            }
        });

        await this.close();
        return totalCategories;
    }
}