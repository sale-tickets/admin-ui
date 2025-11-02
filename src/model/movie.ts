import type { BaseModel } from "./base";

export type MovieModel = BaseModel & {
    categoryId: string[]
    name: string
    description: string
    thumbnail: string
};