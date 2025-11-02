import type { CinemaRoomModel } from "@/model/cinema_room"
import { SimpleGrid, Text } from "@mantine/core"
import type React from "react"
import { CinemaroomCard } from "./CinemaroomCard"

interface Props {
    rooms: CinemaRoomModel[]
}

export const CinemaroomList: React.FC<Props> = ({ rooms }) => {
    if (rooms.length === 0) {
        return <Text c="dimmed">Không có phòng chiếu nào.</Text>
    }

    return (
        <SimpleGrid
            cols={{ base: 1, sm: 2, md: 3 }}
            spacing="lg"
            verticalSpacing="lg"
        >
            {rooms.map((room) => (
                <CinemaroomCard key={room.uuid || room.code} data={room} />
            ))}
        </SimpleGrid>
    )
}

export default CinemaroomList
