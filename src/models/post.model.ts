import { Database } from "./database.model";
import { Post, PostFromDB, PostProp } from "../types/post.type";
import { IMultipleFinders, ISingleFinder } from "../types/finders.type";
import { PostStatus } from "@prisma/client";
import { Tag } from "../types/tag.type";

export class PostModel extends Database<Post, PostProp> implements ISingleFinder<Post>, IMultipleFinders<Post> {
    protected selectProps(): PostProp {
        return {
            id: true,
            title: true,
            description: true,
            category: true,
            image: true,
        }
    }

    async insert(entity: Post): Promise<Post> {
        const prisma = this.open();
        const tagIds = entity.tags!.map(tag => {
            return {tagId: tag.id!}
        });

        const addedPost = await prisma.post.create({
            data: {
                title: entity.title,
                description: entity.description,
                image: entity.image,
                categoryId: entity.category.id!,
                tags: {
                    createMany: {
                        data: tagIds
                    }
                }
            },
            select: this.selectProps()
        });

        await this.close();
        return addedPost;
    }

    async update(entity: Post): Promise<Post> {
        const prisma = this.open();
        
        const updatedPost = await prisma.post.update({
            where: {
                id: entity.id,
            },
            data: {
                title: entity.title,
                description: entity.description,
                image: entity.image,
                categoryId: entity.category.id!
            },
            select: this.selectProps()
        });

        await this.close();
        return updatedPost;
    }

    async delete(entityId: string | number): Promise<void> {
        const prisma = this.open();
        
        await prisma.post.update({
            where: {
                id: +entityId
            },
            data: {
                status: PostStatus.HIDDEN
            },
        });

        await this.close();
    }

    async find(value: string | number): Promise<Post | null> {
        const prisma = this.open();
        let foundPost: Post | null = null;

        if (typeof value === "number") {
            foundPost = await prisma.post.findFirst({
                where: {
                    id: value
                },
                select: this.selectProps()
            });
        } else {
            foundPost = await prisma.post.findFirst({
                where: {
                    title: value
                },
                select: this.selectProps()
            });
        }

        await this.close();
        return foundPost;
    }

    async findAll(page: number, rows: number): Promise<Post[]> {
        const prisma = this.open();

        const fetchedPost = await prisma.post.findMany({
            skip: page * rows,
            take: rows,
            where: {
                status: PostStatus.ACTIVE
            },
            select: {
                id: true,
                title: true,
                description: true,
                category: true,
                image: true
            }
        });

        await this.close();
        return fetchedPost;
    }

    async countRows(): Promise<number> {
        const prisma = this.open();
        
        const totalRows = await prisma.post.count({
            where: {
                status: PostStatus.ACTIVE
            }
        });

        await this.close();
        return totalRows;
    }

    async addTag(postId: number, tagId: number): Promise<Post> {
        const prisma = this.open();

        const updatedPost = await prisma.post.update({
            where: {
                id: postId
            },
            data: {
                tags: {
                    create: {
                        tagId: tagId
                    }
                }
            },
            select: this.selectProps()
        });

        await this.close();
        return updatedPost;
    }

    async removeTag(postId: number, tagId: number): Promise<void> {
        const prisma = this.open();
        const postTag = await prisma.postTag.findFirst({
            where: {
                postId: postId,
                tagId: tagId
            }
        });
        await prisma.postTag.delete({
            where: {
                id: postTag?.id
            }
        });
        await this.close();
    }
}