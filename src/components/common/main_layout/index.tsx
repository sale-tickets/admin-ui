import React from "react";
import { Outlet } from "react-router";
import { Box, Group, Stack, Text, useMantineTheme } from "@mantine/core";
import { PAGE_LINK_APP, type PageLink } from "@/router/link";



const MainLayout: React.FC = () => {
    const theme = useMantineTheme();

    const renderMenu = (links: Record<string, PageLink>, level: number) => {
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
                        const key: string = `${level}-${item.href}`;
                        if(item.isMenu === false || item.isMenu === undefined){
                            return (<Box key={key} display={"none"}></Box>)
                        }
                        if (!item.childs) {
                            return (
                                <Group 
                                    key={key}
                                    h={hLink}
                                >
                                    <Text>{item.name}</Text>
                                </Group>
                            )
                        }
                        return (
                            <React.Fragment key={key}>
                                <Group
                                    h={hLink}
                                >
                                    <Text>{item.name}</Text>
                                </Group>
                                {item.isParentMenu && renderMenu(item.childs, level + 1)}
                            </React.Fragment>
                        )
                    })
                }
            </Stack>
        )
    }

    return (
        <Group 
            h={"100%"}
        >
            <Stack 
                w={"300px"}
                h={"100%"}
                bg={theme.colors.neutrals[0]}
                p={16}
                pr={0}
            >
                {renderMenu(PAGE_LINK_APP["MAIN"].childs || {}, 0)}
            </Stack>
            <Outlet/>
        </Group>
    )
}

export default MainLayout