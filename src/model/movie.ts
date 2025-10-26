import type { BaseModel } from "./base";

export type MovieModel = BaseModel & {
    category_id: string[]
    name: string
    description: string
    thumbnail: string
};