import React, { useRef } from "react";
import { Button, Group, Image, Stack, TextInput } from "@mantine/core";
import { EditFilmModal, type EditFilmModalRef } from "./Edit.modal";



const ManagerFilm: React.FC = () => {
    const editModalRef = useRef<EditFilmModalRef>(null);

    const onCreate = () => {
        if(!editModalRef.current) return;
        editModalRef.current.onOpen();
    }



    return (
        <React.Fragment>
            <Stack>
                <Group>
                    <TextInput flex={1} />
                    <Button onClick={onCreate}>Thêm mới</Button>
                </Group>
                <Image w={500} src={"http://127.0.0.1:9000/sale-tickets/dir_01/file_01.png"} />
            </Stack>
            <EditFilmModal ref={editModalRef} />
        </React.Fragment>
    )
}

export default ManagerFilm;