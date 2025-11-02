import type { MovieModel } from "@/model/movie"
import type { FilterBase } from "./filter"

export type CreateMovieReq = {
    data: MovieModel
}

export type CreateMovieRes = {
    data: MovieModel
}

export type FilterMovie = {
    name?: string
    categoryId?: string[]
}
export type ListMovieReq = {
    filter: FilterMovie
    filterBase: FilterBase
}
export type ListMovieRes = {
    data: MovieModel[]
}