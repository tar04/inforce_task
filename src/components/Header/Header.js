import React from "react";
import {Link} from "react-router-dom";

import "./Header.css";

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