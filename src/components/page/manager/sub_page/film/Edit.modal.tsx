import { MOVIE_CATEGORY } from "@/constant/movie";
import type { CreateMovieReq } from "@/dto/movie";
import { useCreateSignedObjectMutation } from "@/store/api/file_api";
import { useUploadFilesMutation } from "@/store/api/minio";
import { useCreateMovieMutation } from "@/store/api/movie";
import { showNoti } from "@/utils/noti";
import { Button, FileInput, Group, Modal, MultiSelect, Stack, Text, Textarea, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { forwardRef, useImperativeHandle, useState } from "react";



export type EditFilmModalRef = {
    onOpen: () => void
    onClose: () => void
}
export type EditFilmModalProps = {
    onReload: () => void
}
export const EditFilmModal = forwardRef<EditFilmModalRef, EditFilmModalProps>((props, ref) => {
    const [open, setOpen] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    const [createSigned] = useCreateSignedObjectMutation();
    const [uploadMinio] = useUploadFilesMutation();
    const [createMovie] = useCreateMovieMutation();

    const form = useForm<FormEditFilm>({
        initialValues: DefaultFormEditFilm,
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

    const handleSubmit = async (values: FormEditFilm) => {
        setLoading(true);
        await handleUploadImage(values);
        setLoading(false);
        props.onReload();
    }

    const handleUploadImage = async (values: FormEditFilm) => {
        let movie: CreateMovieReq = {
            data: {
                ...values,
                thumbnail: "",
                categoryId: values.category,
            }
        };

        if (values.thumbnail) {
            const resultCreateSigned = await createSigned({
                data: [
                    {
                        model: "",
                        targetId: "",
                        hrefEdit: "",
                        path: `movie/${values.thumbnail.name}`,
                        fileType: "",
                    }
                ],
            });

            if (resultCreateSigned.error) return;
            if (!resultCreateSigned.data?.data) return;

            const filePaths = resultCreateSigned.data.data[0]
            if (!filePaths) return;
            const result = await uploadMinio({
                path: filePaths.hrefEdit,
                body: values.thumbnail,
                type: values.thumbnail.type,
            });

            if (result.error) {
                return;
            }

            movie = {
                data: {
                    ...movie.data,
                    thumbnail: `http://172.17.8.248:30900${filePaths.path}`,
                },
            }
            setOpen(false);
            form.reset();
        }

        const result = await createMovie({
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
            title={<Text size="lg">Thêm mới film</Text>}
        >
            <form id="edit-film" onSubmit={form.onSubmit(handleSubmit)}>
                <Stack>
                    <TextInput
                        label="Tên phim"
                        placeholder="Nhập tên film"
                        {...form.getInputProps("name")}
                    />
                    <MultiSelect
                        label="Thể loại"
                        data={MOVIE_CATEGORY}
                        {...form.getInputProps("category")}
                    />
                    <Textarea
                        label="Mô tả"
                        placeholder="Nhập mô tả"
                        {...form.getInputProps("description")}
                    />
                    <FileInput
                        label="Upload file"
                        multiple={false}
                        accept={"image/png"}
                        {...form.getInputProps("thumbnail")}
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
                    form="edit-film"
                    loading={loading}
                >Xác nhận</Button>
            </Group>
        </Modal>
    )
})

export type FormEditFilm = {
    name: string
    category: string[]
    description: string
    thumbnail: File | null
}

export const DefaultFormEditFilm = {
    name: "",
    category: [],
    description: "",
    thumbnail: null,
}