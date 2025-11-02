import type { CinemaRoomModel } from "@/model/cinema_room"
import { Badge, Card, Group, Text, useMantineTheme } from "@mantine/core"
import { IconBrandCinema4d } from "@tabler/icons-react"
import type React from "react"



interface Props {
    data: CinemaRoomModel
}

export const CinemaroomCard: React.FC<Props> = ({ data }) => {
    const theme = useMantineTheme();



    return (
        <Card
            shadow="sm"
            padding="lg"
            radius="lg"
            withBorder
            className="hover:shadow-xl transition-shadow duration-200"
        >
            <Group justify="space-between" mb="xs">
                <Group>
                    <IconBrandCinema4d size={22} />
                    <Text c={theme.colors.white[0]} fw={600}>Phòng: {data.code}</Text>
                </Group>
                <Badge color={data.deletedAt ? "red" : theme.colors.primary[0]} variant="outline">
                    {data.deletedAt ? "Đã xóa" : "Hoạt động"}
                </Badge>
            </Group>

            <Text size="sm" c="dimmed">
                Mã rạp: {data.movieTheaterId}
            </Text>

            {data.createdAt && (
                <Text size="xs" mt="sm" c="dimmed">
                    Tạo: {new Date(data.createdAt).toLocaleString("vi-VN")}
                </Text>
            )}
        </Card>
    )
}

export default CinemaroomCard
