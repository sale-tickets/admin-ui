import type { CinemaRoomModel } from "@/model/cinema_room"
import type { FilterBase } from "./filter"

export type CreateCinemaRoomReq = {
    code: string
    movieTheaterId: string
}
export type CreateCinemaRoomRes = {
    uuid: string
    code: string
    movieTheaterId: string
}

export type FilterCinemaRoom = {
    code: string
}
export type ListCinemaRoomReq = {
    filterBase: FilterBase
    filter: FilterCinemaRoom
}
export type ListCinemaRoomRes = {
    data: CinemaRoomModel[]
    total: number
}