import { PrismaClient, Role, VerificationStatus } from "@prisma/client";

import { Database } from "./database.model";
import { User, UserProp } from "../types/user.type";
import { ISingleFinder } from "../types/finders.type";

export class UserModel extends Database<User, UserProp> implements ISingleFinder<User> {
    protected selectProps(): UserProp {
        return {
            id: true,
            name: true,
            email: true,
            image: true,
            role: true,
            status: true
        };
    }

    private async nextId(preferredRole: Role, prisma: PrismaClient) {
        const total = await prisma.user.count({
            where: {
                role: preferredRole
            }
        });

        return this.getUserInitialID(preferredRole) + (1000 + total);
    }

    private getUserInitialID(preferredRole: Role) {
        switch(preferredRole) {
            case Role.ADMIN:
                return "AD";
            case Role.BLOGGER:
                return "BG";
            case Role.READER:
                return "RD";
        }
    }

    async insert(entity: User): Promise<User> {
        const prisma = this.open();
        const entityId = await this.nextId(entity.role, prisma);

        const addedUser = await prisma.user.create({
            data: {
                id: entityId,
                name: entity.name,
                email: entity.email,
                password: entity.password!,
                role: entity.role,
            },
            select: this.selectProps()
        });

        await this.close();
        return addedUser;
    }

    async update(entity: User): Promise<User> {
        const prisma = this.open();
        
        const updatedUser = await prisma.user.update({
            where: {
                id: entity.id
            },
            data: {
                name: entity.name,
                email: entity.email,
                password: entity.password!,
                status: entity.status,
                image: entity.image
            },
            select: this.selectProps()
        });

        await this.close();
        return updatedUser;
    }

    async delete(entityId: string | number): Promise<void> {
        const prisma = this.open();
        
        await prisma.user.update({
            where: {
                id: entityId.toString()
            },
            data: {
                status: VerificationStatus.SUSPENDED
            }
        });

        await this.close();
    }

    async find(entityId: number | string): Promise<User | null> {
        const prisma = this.open();

        const foundUser = await prisma.user.findFirst({
            where: {
                id: entityId.toString()
            },
            select: this.selectProps()
        });

        await this.close();
        return foundUser;
    }

    async findByEmail(entityEmail: string) {
        const prisma = this.open();

        const foundUser = await prisma.user.findFirst({
            where: {
                email: entityEmail
            },
            select: {...this.selectProps(), password: true }
        });

        await this.close();
        return foundUser;
    }
}