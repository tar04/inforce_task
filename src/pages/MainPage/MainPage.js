import React from "react";
import {Outlet} from "react-router";

import {Header} from "../../components";
import "./MainPage.css"

const MainPage = () => {
    return (
        <div className="main">
            <Header/>
            <Outlet/>
        </div>
    );
};

export {MainPage};