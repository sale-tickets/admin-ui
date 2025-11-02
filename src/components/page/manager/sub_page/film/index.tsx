import type { MovieModel } from "@/model/movie";
import { useListMovieMutation } from "@/store/api/movie";
import { Button, Grid, Group, Stack, useMantineTheme } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import React, { useEffect, useRef, useState } from "react";
import { EditFilmModal, type EditFilmModalRef } from "./Edit.modal";
import { MovieCard } from "./MovieCard";



const ManagerFilm: React.FC = () => {
    const theme = useMantineTheme();
    const editModalRef = useRef<EditFilmModalRef>(null);
    const [movies, setMovies] = useState<MovieModel[]>([]);

    const [listMovie] = useListMovieMutation();

    const onCreate = () => {
        if (!editModalRef.current) return;
        editModalRef.current.onOpen();
    }

    const handleQueryMovie = async () => {
        const result = await listMovie({
            filter: {
                name: "",
                categoryId: [],
            },
            filterBase: {
                limit: 100,
                offset: 0
            }
        });
        setMovies(result?.data?.data || []);
    }

    useEffect(() => {
        handleQueryMovie();
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
                    <Grid>
                        {
                            movies.map(item =>
                                <Grid.Col
                                    key={item.uuid}
                                    span={{
                                        xs: 12,
                                        sm: 6,
                                        md: 4,
                                        xl: 3,
                                    }}
                                >
                                    <MovieCard movie={item} />
                                </Grid.Col>
                            )
                        }
                    </Grid>
                </Stack>
            </Stack>
            <EditFilmModal
                ref={editModalRef}
                onReload={handleQueryMovie}
            />
        </React.Fragment>
    )
}

export default ManagerFilm;