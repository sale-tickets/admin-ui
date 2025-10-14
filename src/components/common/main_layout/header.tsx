import React from "react";
import { PAGE_LINK_APP, type PageLink } from "@/router/link";
import { Group, Stack, Text, useMantineTheme } from "@mantine/core";
import { motion, type HTMLMotionProps } from "framer-motion";
import { useLocation, useNavigate } from "react-router";



const Header: React.FC = () => {
    const theme = useMantineTheme();
    const navigation = useNavigate();
    const location = useLocation();

    const animationLink: HTMLMotionProps<"div"> = {
        style: {
            transformOrigin: "center center", 
            display: "inline-block",          
        },
        initial: {
            cursor: "pointer",
            paddingLeft: 8,
            paddingRight: 8,
            borderTopLeftRadius: 8,
            borderBottomLeftRadius: 8,
            borderStyle: "solid",
            borderColor: theme.colors.primary[4],
            borderWidth: 0,
        },
        whileHover: {
            backgroundColor: theme.colors.neutrals[2],
            borderRightWidth: 5,
            scale: 1.05,
        },
        whileTap: {
            scale: 1.025,
        },
    }

    const handleNavigation = (paths: string[]) => {
        paths = paths.filter(item => item !== "/");
        let href: string = `/${paths.join("/")}`;
        navigation(href);
    }

    const isActive = (paths: string[]): boolean => {
        let curPaths = location.pathname.
            split("/").
            filter(item => item !== "");
        curPaths = ["/", ...curPaths]
        paths = [...new Set(paths)];
        return paths.join("") === curPaths.join("");
    }

    const renderMenu = (links: Record<string, PageLink>, level: number, pathParents: string[]) => {
        const hLink: number = 45;
        const listPage: PageLink[] = [];
        Object.keys(links).forEach(key => {
            listPage.push(links[key]);
        })

        return (
            <Stack
                pl={level * 8}
                gap={4}
            >
                {
                    listPage.map(item => {
                        const IconLink = item.icon;
                        const key: string = `${level}-${item.href}`;
                        const paths: string[] = [...pathParents];
                        item.href && paths.push(item.href);
                        const motionProps = { ...animationLink };

                        if (isActive(paths)) {
                            motionProps.animate = {
                                borderRightWidth: 5,
                                backgroundColor: theme.colors.neutrals[2],
                            }
                        }



                        if (item.isMenu === false || item.isMenu === undefined) return null

                        if (!item.childs) {
                            return (
                                <motion.div
                                    key={key}
                                    {...motionProps}
                                    onClick={() => handleNavigation(paths)}
                                >
                                    <Group
                                        h={hLink}
                                    >
                                        {IconLink && <IconLink />} <Text>{item.name}</Text>
                                    </Group>
                                </motion.div>
                            )
                        }

                        return (
                            <React.Fragment key={key}>
                                <motion.div
                                    {...motionProps}
                                    onClick={() => handleNavigation(paths)}
                                >
                                    <Group
                                        h={hLink}
                                    >
                                        {IconLink && <IconLink />} <Text>{item.name}</Text>
                                    </Group>
                                </motion.div>
                                {item.isParentMenu && renderMenu(item.childs, level + 1, paths)}
                            </React.Fragment>
                        )
                    })
                }
            </Stack>
        )
    }

    return (
        <Stack
            w={"300px"}
            h={"100%"}
            bg={theme.colors.neutrals[0]}
            p={16}
            pr={0}
        >
            <Group pl={8}>SALE</Group>
            <Stack 
                gap={0} 
                style={{
                    flex: 1,
                }}
            >
                {renderMenu(PAGE_LINK_APP["MAIN"].childs || {}, 0, ["/"])}
            </Stack>
        </Stack>
    )
}

export default Header;