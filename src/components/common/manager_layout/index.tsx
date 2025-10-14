import React from "react";
import { Outlet } from "react-router";



const ManagerLayout: React.FC = () => {
    return (
        <>
            ManagerLayout <Outlet/>
        </>
    )
}

export default ManagerLayout