import { configureStore } from "@reduxjs/toolkit";
import { fileApi } from "./api/file_api";
import { minioApi } from "./api/minio";
import { movieApi } from "./api/movie";
import { movieTheaterApi } from "./api/movie_theater";
import { cinemaRoomApi } from "./api/cinemaroom";

export const store = configureStore({
    reducer: {
        [fileApi.reducerPath]: fileApi.reducer,
        [minioApi.reducerPath]: minioApi.reducer,
        [movieApi.reducerPath]: movieApi.reducer,
        [movieTheaterApi.reducerPath]: movieTheaterApi.reducer,
        [cinemaRoomApi.reducerPath]: cinemaRoomApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            fileApi.middleware,
            minioApi.middleware,
            movieApi.middleware,
            movieTheaterApi.middleware,
            cinemaRoomApi.middleware,
        ),
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch