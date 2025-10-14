import { lazy } from "react";

export const HomePage = lazy(() => import("@/components/page/home"));

export const DashboardPage = lazy(() => import("@/components/page/dashboard"));

export const ManagerPage = lazy(() => import("@/components/page/manager"));
export const ManagerFilmPage = lazy(() => import("@/components/page/manager/sub_page/film"));
export const ManagerMovieTheaterPage = lazy(() => import("@/components/page/manager/sub_page/movie_theater"));
export const ManagerCinemaRoomPage = lazy(() => import("@/components/page/manager/sub_page/movie_theater/sub_page/cinema_room"));
export const ManagerShowtimePage = lazy(() => import("@/components/page/manager/sub_page/showtime"));