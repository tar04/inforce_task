import React from "react";

import {Products} from "../../components";
import "./ProductsPage.css";

const ProductsPage = () => {
    return (
        <div className="products_page">
            {/*todo sort + arr button*/}
            <Products/>
        </div>
    );
};

export {ProductsPage};