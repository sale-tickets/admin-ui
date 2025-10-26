import { createApi } from "@reduxjs/toolkit/query/react"
import { axiosBaseQuery } from "../common/baseQuery"
import type { CreateFileReq, CreateFileRes } from "@/dto/file_api"

export const fileApi = createApi({
    reducerPath: "fileApi",
    baseQuery: axiosBaseQuery({ baseUrl: "http://172.17.8.248:30800/api/v1/file-api" }),
    endpoints: (build) => ({
        CreateSignedObject: build.mutation<CreateFileRes, CreateFileReq>({
            query: (payload) => ({
                method: "POST",
                url: "/create",
                data: payload,
            }),
        }),
    }),
})

export const {
    useCreateSignedObjectMutation,
} = fileApi