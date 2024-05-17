import { PrismaClient } from "@prisma/client";

export abstract class Database<Type, TypeProps> {
    private connection: PrismaClient | undefined;

    protected open() {
        this.connection = new PrismaClient();
        return this.connection;
    }

    protected async close() {
        this.connection?.$disconnect();
        this.connection = undefined;
    }

    protected abstract selectProps(): TypeProps;

    abstract insert(entity: Type): Promise<Type>;
    abstract update(entity: Type): Promise<Type>;
    abstract delete(entityId: number | string): Promise<void>;
}