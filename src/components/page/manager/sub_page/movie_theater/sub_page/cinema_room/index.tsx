import type { CinemaRoomModel } from "@/model/cinema_room";
import { useListCinemaRoomMutation } from "@/store/api/cinemaroom";
import { useDetailMovieTheaterQuery } from "@/store/api/movie_theater";
import { showNoti } from "@/utils/noti";
import { Button, Group, Stack, Text, useMantineTheme } from "@mantine/core";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "react-router";
import CinemaroomList from "./CinemaroomList";
import { EditCinemaRoomModal, type EditCinemaRoomModalRef } from "./EditModal";




const ManagerCinemaRoom: React.FC = () => {
    const theme = useMantineTheme();
    const editModalRef = useRef<EditCinemaRoomModalRef>(null);
    const { movie_theater_id } = useParams<{ movie_theater_id: string }>();
    const [cinemarooms, setCinemarooms] = useState<CinemaRoomModel[]>([]);

    const [listCinemaRoom] = useListCinemaRoomMutation();

    const {
        data: dataMovieTheater,
        refetch: refetchMovieTheater,
    } = useDetailMovieTheaterQuery({ uuid: movie_theater_id || "" });
    const movieThearer = useMemo(() => {
        return dataMovieTheater
    }, [dataMovieTheater]);

    const onCreate = () => {
        if (!editModalRef.current) return;
        editModalRef.current.onOpen();
    }

    const handleQuery = async () => {
        if (!movie_theater_id) {
            showNoti("error");
            return;
        }

        const result = await listCinemaRoom({
            filter: {
                code: movie_theater_id,
            },
            filterBase: {
                limit: 100,
                offset: 0
            }
        });
        setCinemarooms(result.data?.data || []);
    }


    useEffect(() => {
        handleQuery();
        refetchMovieTheater();
    }, [movie_theater_id]);



    return (
        <React.Fragment>
            <Stack h={"100%"} mah={"100%"}>
                <Group justify="space-between">
                    <Text c={theme.colors.white[0]} fw={500} size="md">{movieThearer?.name}</Text>
                    <Button onClick={onCreate}>Thêm mới</Button>
                </Group>
                <Stack
                    flex={1}
                    style={{
                        overflowX: "hidden",
                        overflowY: "scroll",
                    }}
                >
                    <CinemaroomList rooms={cinemarooms} />
                </Stack>
            </Stack>
            <EditCinemaRoomModal
                ref={editModalRef}
                onReload={handleQuery}
            />
        </React.Fragment>
    )
}

export default ManagerCinemaRoom;