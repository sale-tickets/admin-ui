import type { CreateMovieTheaterReq, CreateMovieTheaterRes, DetailMovieTheaterReq, DetailMovieTheaterRes, ListMovieTheaterReq, ListMovieTheaterRes } from "@/dto/movie_theater"
import { createApi } from "@reduxjs/toolkit/query/react"
import { axiosBaseQuery } from "../common/baseQuery"

export const movieTheaterApi = createApi({
    reducerPath: "movieTheaterApi",
    baseQuery: axiosBaseQuery({ baseUrl: "http://localhost:8000/api/v1/movie-theater" }),
    endpoints: (build) => ({
        CreateMovieTheater: build.mutation<CreateMovieTheaterRes, CreateMovieTheaterReq>({
            query: (payload) => ({
                method: "POST",
                url: "/create",
                data: payload,
            }),
        }),
        ListMovieTheater: build.mutation<ListMovieTheaterRes, ListMovieTheaterReq>({
            query: (payload) => ({
                method: "POST",
                url: "",
                data: payload,
            })
        }),
        DetailMovieTheater: build.query<DetailMovieTheaterRes, DetailMovieTheaterReq>({
            query: (payload) => ({
                method: "GET",
                url: `/${payload.uuid}`,
            })
        }),
    }),
})

export const {
    useCreateMovieTheaterMutation,
    useListMovieTheaterMutation,
    useDetailMovieTheaterQuery,
} = movieTheaterApi