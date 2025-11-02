import type { BaseModel } from "./base";

export type MovieTheaterModel = BaseModel & {
    createrId: string
    name: string
    address: string
}