export interface ISingleFinder<Type> {
    find: (entityId: number | string) => Promise<Type | null>;
}

export interface IMultipleFinders<Type> {
    findAll: () => Promise<Type[]>;
}