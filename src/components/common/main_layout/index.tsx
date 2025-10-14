import React from "react";
import Header from "./header";
import { Outlet } from "react-router";
import { Group } from "@mantine/core";



const MainLayout: React.FC = () => {
    return (
        <Group
            h={"100%"}
        >
            <Header />
            <Outlet />
        </Group>
    )
}

export default MainLayout