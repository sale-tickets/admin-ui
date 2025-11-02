import type { CreateCinemaRoomReq, CreateCinemaRoomRes, ListCinemaRoomReq, ListCinemaRoomRes } from "@/dto/cinema_room"
import { createApi } from "@reduxjs/toolkit/query/react"
import { axiosBaseQuery } from "../common/baseQuery"

export const cinemaRoomApi = createApi({
    reducerPath: "cinemaRoomApi",
    baseQuery: axiosBaseQuery({ baseUrl: "http://localhost:8000/api/v1/cinema-room" }),
    endpoints: (build) => ({
        CreateCinemaRoom: build.mutation<CreateCinemaRoomRes, CreateCinemaRoomReq>({
            query: (payload) => ({
                method: "POST",
                url: "/create",
                data: payload,
            }),
        }),
        ListCinemaRoom: build.mutation<ListCinemaRoomRes, ListCinemaRoomReq>({
            query: (payload) => ({
                method: "POST",
                url: "/list",
                data: payload,
            })
        }),
    }),
})

export const {
    useCreateCinemaRoomMutation,
    useListCinemaRoomMutation,
} = cinemaRoomApi