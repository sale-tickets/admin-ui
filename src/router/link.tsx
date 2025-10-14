import React from "react"
import {
    DashboardPage,
    HomePage,
    ManagerCinemaRoomPage,
    ManagerFilmPage,
    ManagerMovieTheaterPage,
    ManagerPage,
    ManagerShowtimePage,
} from "./page"
import MainLayout from "@/components/common/main_layout"
import { Route } from "react-router"
import { IconBrandHbo, IconCalendarWeek, IconLayoutDashboard, IconMovie, type Icon, type IconProps } from "@tabler/icons-react";

export type PageLink = {
    href?: string
    name?: string
    parameter?: string
    component?: React.ReactNode
    icon?: React.ForwardRefExoticComponent<IconProps & React.RefAttributes<Icon>>
    layout?: React.ReactNode
    childs?: Record<string, PageLink>
    isMenu?: boolean
    isParentMenu?: boolean
}

export const PAGE_LINK_APP: Record<string, PageLink> = {
    MAIN: {
        layout: <MainLayout />,
        childs: {
            INTRO: {
                href: "/",
                name: "Giới thiệu",
                component: <HomePage />,
                isMenu: true,
                isParentMenu: true,
                childs: {
                    DASHBOARD: {
                        href: "thong-ke",
                        name: "Thống kê",
                        component: <DashboardPage />,
                        isMenu: true,
                        icon: IconLayoutDashboard,
                    },
                }
            },
            MANAGER: {
                href: "quan-li",
                name: "Quản lí",
                component: <ManagerPage />,
                isMenu: true,
                isParentMenu: true,
                childs: {
                    FILM: {
                        href: "phim",
                        name: "Quản lí phim",
                        parameter: "id",
                        component: <ManagerFilmPage />,
                        isMenu: true,
                        icon: IconBrandHbo,
                    },
                    MOVIE_THEATER: {
                        href: "rap-phim",
                        name: "Quản lí rạp phim",
                        parameter: "id",
                        component: <ManagerMovieTheaterPage />,
                        isMenu: true,
                        icon: IconMovie,
                        childs: {
                            CINEMA_ROOM: {
                                href: "phong-chieu",
                                name: "Quản lí phòng chiếu",
                                parameter: "id",
                                component: <ManagerCinemaRoomPage />,
                            },
                        }
                    },
                    SHOWTIME: {
                        href: "suat-chieu",
                        name: "Quản lí suất chiếu",
                        parameter: "id",
                        component: <ManagerShowtimePage />,
                        isMenu: true,
                        icon: IconCalendarWeek,
                    },
                },
            },
        },
    },
}

export const renderRouter = (links: Record<string, PageLink>) => {
        const listPage: PageLink[] = [];
        Object.keys(links).forEach(key => {
            listPage.push(links[key]);
        })

        return (
            <React.Fragment>
                {
                    listPage.map(page => {
                        if (!page.childs) {
                            return <Route path={page.href} element={page.component} />
                        }
                        if (!page.layout) {
                            return (
                                <React.Fragment>
                                    {(page.component && page.href) && <Route path={page.href} element={page.component} />}
                                    <Route path={page.href}>
                                        {renderRouter(page.childs)}
                                    </Route>
                                </React.Fragment>
                            )
                        }

                        return (
                            <React.Fragment>
                                {(page.component && page.href) && <Route path={page.href} element={page.component} />}
                                <Route path={page.href} element={page.layout}>
                                    {renderRouter(page.childs)}
                                </Route>
                            </React.Fragment>
                        )
                    })
                }
            </React.Fragment>
        )
    }
