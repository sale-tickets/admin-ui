import type { CreateMovieTheaterReq } from "@/dto/movie_theater";
import { useCreateMovieTheaterMutation } from "@/store/api/movie_theater";
import { showNoti } from "@/utils/noti";
import { Button, Group, Modal, Stack, Text, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { forwardRef, useImperativeHandle, useState } from "react";



export type EditMovieTheaterModalRef = {
    onOpen: () => void
    onClose: () => void
}
export type EditMovieTheaterModalProps = {
    onReload: () => void
}
export const EditMovieTheaterModal = forwardRef<EditMovieTheaterModalRef, EditMovieTheaterModalProps>((props, ref) => {
    const [open, setOpen] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    const [create] = useCreateMovieTheaterMutation();

    const form = useForm<FormEditMovieTheater>({
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

    const handleSubmit = async (values: FormEditMovieTheater) => {
        setLoading(true);
        await handleCreate(values);
        setLoading(false);
        props.onReload();
    }

    const handleCreate = async (values: FormEditMovieTheater) => {
        let movie: CreateMovieTheaterReq = {
            ...values,
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
            title={<Text size="lg">Thêm mới rạp phim</Text>}
        >
            <form id="edit-movie-theater" onSubmit={form.onSubmit(handleSubmit)}>
                <Stack>
                    <TextInput
                        label="Tên rạp"
                        placeholder="Nhập tên rạp"
                        {...form.getInputProps("name")}
                    />
                    <TextInput
                        label="Địa chỉ"
                        placeholder="Nhập địa chỉ"
                        {...form.getInputProps("address")}
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
                    form="edit-movie-theater"
                    loading={loading}
                >Xác nhận</Button>
            </Group>
        </Modal>
    )
})

export type FormEditMovieTheater = {
    name: string
    address: string
}

export const DefaultFormEditTheater: FormEditMovieTheater = {
    name: "",
    address: ""
}