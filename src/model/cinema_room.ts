import type { BaseModel } from "./base";

export type CinemaRoomModel = BaseModel & {
    code: string
    movieTheaterId: string
}