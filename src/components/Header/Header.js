import React from "react";

import "./Header.css";
import {Link} from "react-router-dom";

const Header = () => {
    return (
        <div className="header">
            <div className="logo">
                <Link to={"/products"}>
                    <img src={require("../../db/images/products-logo.png")} alt="logo"/>
                </Link>
            </div>
        </div>
    );
};

export {Header};