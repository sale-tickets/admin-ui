import type { CreateCinemaRoomReq } from "@/dto/cinema_room";
import { useCreateCinemaRoomMutation } from "@/store/api/cinemaroom";
import { showNoti } from "@/utils/noti";
import { Button, Group, Modal, Stack, Text, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { forwardRef, useImperativeHandle, useState } from "react";
import { useParams } from "react-router";



export type EditCinemaRoomModalRef = {
    onOpen: () => void
    onClose: () => void
}
export type EditCinemaRoomModalProps = {
    onReload: () => void
}
export const EditCinemaRoomModal = forwardRef<EditCinemaRoomModalRef, EditCinemaRoomModalProps>((props, ref) => {
    const [open, setOpen] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    const { movie_theater_id } = useParams<{ movie_theater_id: string }>();

    const [create] = useCreateCinemaRoomMutation();

    const form = useForm<FormEditCinemaRoom>({
        initialValues: DefaultFormEditTheater,
    });

    useImperativeHandle(ref, () => ({
        onOpen: handleOpen,
        onClose: handleClose,
    }));

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
        form.reset();
    }

    const handleSubmit = async (values: FormEditCinemaRoom) => {
        setLoading(true);
        await handleCreate(values);
        setLoading(false);
        props.onReload();
    }

    const handleCreate = async (values: FormEditCinemaRoom) => {
        if (!movie_theater_id) {
            showNoti("error");
            return;
        }

        let movie: CreateCinemaRoomReq = {
            ...values,
            movieTheaterId: movie_theater_id,
        };

        const result = await create({
            ...movie,
        });

        if (result.error) {
            showNoti("error");
            return;
        }
        showNoti("success");
        handleClose();
    }



    return (
        <Modal
            opened={open}
            onClose={() => setOpen(false)}
            closeOnClickOutside={false}
            closeOnEscape={false}
            title={<Text size="lg">Thêm mới phòng chiếu</Text>}
        >
            <form id="edit-cinema-room" onSubmit={form.onSubmit(handleSubmit)}>
                <Stack>
                    <TextInput
                        label="Mã phòng"
                        placeholder="Nhập mã phòng"
                        {...form.getInputProps("code")}
                    />
                </Stack>
            </form>
            <Group mt={16}>
                <Button
                    flex={1}
                    onClick={handleClose}
                    variant="outline"
                >Hủy</Button>
                <Button
                    flex={1}
                    type="submit"
                    form="edit-cinema-room"
                    loading={loading}
                >Xác nhận</Button>
            </Group>
        </Modal>
    )
})

export type FormEditCinemaRoom = {
    code: string
}

export const DefaultFormEditTheater: FormEditCinemaRoom = {
    code: ""
}