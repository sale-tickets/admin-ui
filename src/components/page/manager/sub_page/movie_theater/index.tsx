import type { MovieTheaterModel } from "@/model/movie_theater";
import { useListMovieTheaterMutation } from "@/store/api/movie_theater";
import { Button, Group, Stack, useMantineTheme } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import React, { useEffect, useRef, useState } from "react";
import { EditMovieTheaterModal, type EditMovieTheaterModalRef } from "./Edit.modal";
import { MovieTheaterCardGrid } from "./MovieTheaterListCard";




const ManagerMovieTheater: React.FC = () => {
    const theme = useMantineTheme();
    const editModalRef = useRef<EditMovieTheaterModalRef>(null);
    const [movieTheaters, setMovieTheaters] = useState<MovieTheaterModel[]>([]);

    const [listMovieTheater] = useListMovieTheaterMutation();

    const onCreate = () => {
        if (!editModalRef.current) return;
        editModalRef.current.onOpen();
    }

    const handleQuery = async () => {
        const result = await listMovieTheater({
            filter: {
                name: "",
                categoryId: [],
            },
            filterBase: {
                limit: 100,
                offset: 0
            }
        });
        setMovieTheaters(result?.data?.data || []);
    }

    useEffect(() => {
        handleQuery();
    }, []);


    return (
        <React.Fragment>
            <Stack h={"100%"} mah={"100%"}>
                <Group justify="space-between">
                    <Button
                        leftSection={<IconPlus />}
                        color={theme.colors.neutrals[2]}
                    >Bộ lọc</Button>
                    <Button onClick={onCreate}>Thêm mới</Button>
                </Group>
                <Stack
                    flex={1}
                    style={{
                        overflowX: "hidden",
                        overflowY: "scroll",
                    }}
                >
                    <MovieTheaterCardGrid theaters={movieTheaters} />
                </Stack>
            </Stack>
            <EditMovieTheaterModal
                ref={editModalRef}
                onReload={handleQuery}
            />
        </React.Fragment>
    )
}

export default ManagerMovieTheater;