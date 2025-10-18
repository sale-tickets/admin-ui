import React from "react";
import Header from "./header";
import { Outlet } from "react-router";
import { Box, Group } from "@mantine/core";



const MainLayout: React.FC = () => {
    return (
        <Group
            h={"100%"}
            gap={0}
        >
            <Header />
            <Box
                style={{
                    flex: 1,
                    height: "100%",
                    padding: 8,
                }}
            >
                <Outlet />
            </Box>
        </Group>
    )
}

export default MainLayout