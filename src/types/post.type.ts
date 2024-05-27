import { Category } from "./category.type";
import { Tag } from "./tag.type";

export interface Post {
    id?: number;
    title: string;
    description: string;
    image: string;
    category: Category;
    tags?: Tag[];
}

export interface PostProp {
    id: true,
    title: true,
    description: true,
    category: true,
    image: true,
}

export interface PostFromDB {
    category: Category;
    id: number;
    title: string;
    description: string;
    image: string;
    tags: {
        tag: Tag;
    }[];
}
