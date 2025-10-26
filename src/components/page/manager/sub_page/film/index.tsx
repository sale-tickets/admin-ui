import { Button, Group, Image, Stack, useMantineTheme } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import React, { useRef } from "react";
import { EditFilmModal, type EditFilmModalRef } from "./Edit.modal";



const ManagerFilm: React.FC = () => {
    const theme = useMantineTheme();
    const editModalRef = useRef<EditFilmModalRef>(null);

    const onCreate = () => {
        if (!editModalRef.current) return;
        editModalRef.current.onOpen();
    }



    return (
        <React.Fragment>
            <Stack>
                <Group justify="space-between">
                    <Button
                        leftSection={<IconPlus />}
                        color={theme.colors.neutrals[2]}
                    >Bộ lọc</Button>
                    <Button onClick={onCreate}>Thêm mới</Button>
                </Group>
                <Image w={500} src={"http://127.0.0.1:9000/sale-tickets/dir_01/file_01.png"} />
            </Stack>
            <EditFilmModal ref={editModalRef} />
        </React.Fragment>
    )
}

export default ManagerFilm;