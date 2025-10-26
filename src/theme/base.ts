import {
    type ButtonProps,
    type CSSProperties,
    type MantineTheme,
    type MantineThemeOverride,
    type MultiSelectProps,
    type TextareaProps,
    type TextInputProps,
} from "@mantine/core";

export const BaseTheme: MantineThemeOverride = {
    colors: {
        primary: [
            "#5E1A8A",
            "#5E1A8A",
            "#702F95",
            "#702F95",
            "#8F5EAC",
            "#8F5EAC",
            "#BFA4CF",
            "#BFA4CF",
            "#BFA4CF",
            "#BFA4CF",
        ],
        white: [
            "#FDFDFD",
            "#FDFDFD",
            "#FDFDFD",
            "#FDFDFD",
            "#FDFDFD",
            "#FDFDFD",
            "#FDFDFD",
            "#FDFDFD",
            "#FDFDFD",
            "#FDFDFD",
        ],
        dark: [
            "#0F1319",
            "#0F1319",
            "#0F1319",
            "#0F1319",
            "#0F1319",
            "#0F1319",
            "#0F1319",
            "#0F1319",
            "#0F1319",
            "#0F1319",
        ],
        neutrals: [
            "#181C1F",
            "#292C34",
            "#3F4450",
            "#575E6B",
            "#666C75",
            "#A7B0BD",
            "#A7B0BD",
            "#A7B0BD",
            "#A7B0BD",
            "#A7B0BD",
        ]
    },
    primaryColor: "primary",
    primaryShade: {
        light: 2,
        dark: 2,
    },
    components: {
        Button: {
            defaultProps: {
                radius: "md",
                size: "sm",
            } as ButtonProps
        },
        TextInput: {
            defaultProps: {
                radius: "md",
            } as TextInputProps,
            styles: (theme: MantineTheme) => ({
                input: {
                    backgroundColor: theme.colors.neutrals[3],
                    outline: "none",
                    border: 0,
                    color: theme.colors.white[0],
                } as CSSProperties,
            }),
        },
        Textarea: {
            defaultProps: {
                radius: "md",
                minRows: 5,
                autosize: true,
            } as TextareaProps,
            styles: (theme: MantineTheme) => ({
                input: {
                    backgroundColor: theme.colors.neutrals[3],
                    outline: "none",
                    border: 0,
                    color: theme.colors.white[0],
                } as CSSProperties,
            }),
        },
        MultiSelect: {
            defaultProps: {
                searchable: true,
                radius: "md"
            } as MultiSelectProps,
            styles: (theme: MantineTheme) => ({
                input: {
                    backgroundColor: theme.colors.neutrals[3],
                    outline: "none",
                    border: 0,
                    color: theme.colors.white[0],
                } as CSSProperties,
                dropdown: {
                    backgroundColor: theme.colors.neutrals[1],
                    outline: "none",
                    border: 0,
                    color: theme.colors.white[0],
                } as CSSProperties,
                option: {
                    "&:hover": {
                        backgroundColor: theme.colors.neutrals[3],
                    } as CSSProperties,
                } as CSSProperties,
            }),
        },
        FileInput: {
            styles: (theme: MantineTheme) => ({
                input: {
                    backgroundColor: theme.colors.neutrals[3],
                    outline: "none",
                    border: 0,
                    color: theme.colors.white[0],
                } as CSSProperties,
            }),
        },
        Modal: {
            styles: (theme: MantineTheme) => ({
                header: {
                    borderRadius: theme.radius.lg,
                    backgroundColor: theme.colors.neutrals[0],
                } as CSSProperties,
            })
        },
        Paper: {
            styles: (theme: MantineTheme) => ({
                root: {
                    borderRadius: theme.radius.lg,
                    backgroundColor: theme.colors.neutrals[0],
                } as CSSProperties,
            })
        },
    },
}