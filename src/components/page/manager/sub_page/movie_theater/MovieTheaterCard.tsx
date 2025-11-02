"use client"

import type { MovieTheaterModel } from "@/model/movie_theater"
import { Card, Text, Group, Stack, Badge, Button, Tooltip, useMantineTheme } from "@mantine/core"
import { IconMapPin, IconUser } from "@tabler/icons-react"
import { useLocation, useNavigate } from "react-router"



export type MovieTheaterCardProps = {
    theater: MovieTheaterModel
}

export function MovieTheaterCard({ theater }: MovieTheaterCardProps) {
    const { uuid, createrId, name, address } = theater
    const theme = useMantineTheme();
    const navigation = useNavigate();
    const location = useLocation();

    const gotoDetail = () => {
        let href = `${location.pathname}/${theater.uuid}`;
        navigation(href);
    }



    return (
        <Card shadow="sm" padding="lg" radius="md" withBorder className="h-full">
            <Stack gap="md">
                {/* Header */}
                <Stack gap="xs">
                    <Tooltip label={name} multiline miw={300}>
                        <Text fw={700} size="lg" c={theme.colors.white[0]} truncate>
                            {name}
                        </Text>
                    </Tooltip>

                    {uuid && (
                        <Badge variant="light" size="sm">
                            {uuid.substring(0, 8)}...
                        </Badge>
                    )}
                </Stack>

                {/* Address */}
                <Group gap="xs" wrap="nowrap">
                    <IconMapPin size={18} color={theme.colors.white[0]} />
                    <Text size="sm" c="dimmed" truncate>
                        {address}
                    </Text>
                </Group>

                {/* Creator Info */}
                <Group gap="xs" wrap="nowrap">
                    <IconUser size={18} color={theme.colors.white[0]} />
                    <Text size="xs" c="dimmed" truncate>
                        Creator: {createrId}
                    </Text>
                </Group>

                <Button onClick={gotoDetail}>Chi tiết</Button>
            </Stack>
        </Card>
    )
}
