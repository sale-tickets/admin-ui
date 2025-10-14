import React from "react";
import { Outlet } from "react-router";



const Manager: React.FC = () => {
    return (
        <>Manager <Outlet/></>
    )
}

export default Manager;