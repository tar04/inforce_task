import React from "react";

import {Products, Menu} from "../../components";
import "./ProductsPage.css";

const ProductsPage = () => {
    return (
        <div className="products_page">
            <Menu/>
            <Products/>
        </div>
    );
};

export {ProductsPage};