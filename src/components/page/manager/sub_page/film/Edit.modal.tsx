import { forwardRef, useImperativeHandle, useState } from "react";
import { Button, FileInput, Group, Modal, MultiSelect, Stack, Text, Textarea, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useCreateSignedObjectMutation } from "@/store/api/file_api";
import { useUploadFilesMutation } from "@/store/api/minio";
import type { CreateMovieReq } from "@/dto/movie";



export type EditFilmModalRef = {
    onOpen: () => void
    onClose: () => void
}
export type EditFilmModalProps = {}
export const EditFilmModal = forwardRef<EditFilmModalRef, EditFilmModalProps>((_, ref) => {
    const [open, setOpen] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    const [createApi] = useCreateSignedObjectMutation();
    const [uploadMinio] = useUploadFilesMutation();

    const form = useForm<FormEditFilm>({
        initialValues: DefaultFormEditFilm,
    });

    useImperativeHandle(ref, () => ({
        onOpen: () => setOpen(true),
        onClose: () => setOpen(false),
    }));

    const handleSubmit = async (values: FormEditFilm) => {
        setLoading(true);
        await handleUploadImage(values);
        setLoading(false);
    }

    const handleUploadImage = async (values: FormEditFilm) => {
        let movie: CreateMovieReq = {
            ...values,
            thumbnail: "",
        };

        if (values.thumbnail) {
            const resultCreateSigned = await createApi({
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

            if(result.error) {
                return;
            }

            movie = {
                ...movie,
                thumbnail: `http://localhost:9000${filePaths.path}`,
            }
        }
        console.log("DATA: ", movie);
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
                        data={[
                            { label: "1", value: "1" },
                            { label: "2", value: "2" },
                            { label: "3", value: "3" },
                        ]}
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
                <Button flex={1} variant="outline">Hủy</Button>
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