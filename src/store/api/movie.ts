import type { CreateMovieReq, CreateMovieRes } from "@/dto/movie"
import { createApi } from "@reduxjs/toolkit/query/react"
import { axiosBaseQuery } from "../common/baseQuery"

export const movieApi = createApi({
    reducerPath: "movieApi",
    baseQuery: axiosBaseQuery({ baseUrl: "http://localhost:8000/api/v1/movie" }),
    endpoints: (build) => ({
        CreateMovie: build.mutation<CreateMovieRes, CreateMovieReq>({
            query: (payload) => ({
                method: "POST",
                url: "",
                data: payload,
            }),
        }),
    }),
})

export const {
    useCreateMovieMutation,
} = movieApi