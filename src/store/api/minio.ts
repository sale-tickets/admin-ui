import { createApi } from "@reduxjs/toolkit/query/react"
import { axiosBaseQuery } from "../common/baseQuery"
import type { UploadFileMinioReq } from "@/dto/minio"

export const minioApi = createApi({
    reducerPath: "minioApi",
    baseQuery: axiosBaseQuery({ baseUrl: "http://172.17.8.248:30900" }),
    endpoints: (build) => ({
        UploadFiles: build.mutation<any, UploadFileMinioReq>({
            query: (payload) => ({
                headers: {
                    "Content-Type": payload.type,
                },
                method: "PUT",
                url: payload.path,
                data: payload.body,
            })
        })
    }),
})

export const {
    useUploadFilesMutation,
} = minioApi