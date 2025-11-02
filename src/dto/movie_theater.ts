import type { MovieTheaterModel } from "@/model/movie_theater"
import type { FilterBase } from "./filter"

export type CreateMovieTheaterReq = {
    name: string
    address: string
}
export type CreateMovieTheaterRes = {
    uuid: string
    name: string
    address: string
}

export type FilterMovieTheater = {
    name?: string
    categoryId?: string[]
}
export type ListMovieTheaterReq = {
    filter: FilterMovieTheater
    filterBase: FilterBase
}
export type ListMovieTheaterRes = {
    data: MovieTheaterModel[]
}

export type DetailMovieTheaterReq = {
    uuid: string
}
export type DetailMovieTheaterRes = MovieTheaterModel & {

}
