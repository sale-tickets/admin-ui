import React from "react";
import { Routes } from "react-router";
import { PAGE_LINK_APP, renderRouter } from "./link";


const AppRouter: React.FC = () => {
    return (
        <Routes>
            {renderRouter(PAGE_LINK_APP)}
        </Routes>
    )
}

export default AppRouter;