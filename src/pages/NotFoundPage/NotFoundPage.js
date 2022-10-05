import React from "react";
import {Link} from "react-router-dom";

import "./NotFoundPage.css"

const NotFoundPage = () => {
    return (
        <div className="not_found_page">
            <div className="text">
                <h1>There's no such page... Please try again</h1>
                <button><Link to={"/products"}>Go to homepage</Link></button>
            </div>
            <img src={require("./error-404.png")} alt="ERROR 404"/>
        </div>
    );
};

export {NotFoundPage};