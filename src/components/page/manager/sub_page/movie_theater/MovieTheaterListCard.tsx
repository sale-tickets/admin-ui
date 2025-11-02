"use client"

import { SimpleGrid, Container, Text, Stack } from "@mantine/core"
import { MovieTheaterCard } from "./MovieTheaterCard"
import type { MovieTheaterModel } from "@/model/movie_theater"


export type MovieTheaterCardGridProps = {
    theaters: MovieTheaterModel[]
    onEdit?: (theater: MovieTheaterModel) => void
    onDelete?: (uuid?: string) => void
    columns?: number
}

export function MovieTheaterCardGrid({ theaters, columns = 3 }: MovieTheaterCardGridProps) {
    if (theaters.length === 0) {
        return (
            <Container>
                <Stack align="center" justify="center" py="xl">
                    <Text c="dimmed" ta="center">
                        Không có rạp chiếu phim nào
                    </Text>
                </Stack>
            </Container>
        )
    }

    return (
        <SimpleGrid cols={{ base: 1, sm: 2, lg: columns }} spacing="lg">
            {theaters.map((theater) => (
                <MovieTheaterCard
                    key={theater.uuid || theater.createrId}
                    theater={theater}
                />
            ))}
        </SimpleGrid>
    )
}
