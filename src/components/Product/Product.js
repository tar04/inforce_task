import React  from "react";
import {Link} from "react-router-dom";

import "./Product.css";

const Product = ({product,setModalActive}) => {

    const {id, imageUrl, name, count} = product;

    return (
        <div className="product">
            <Link to={id.toString()}><img
                src={imageUrl ? require(`../../db${imageUrl}`) : require("../../db/images/no-img.png")} alt={name}/>
                <h2>{name}</h2>
            </Link>
            <div className="bottom_menu">
                <h3>Amount: {count}</h3>
                <button onClick={() => setModalActive(true)}>Delete</button>
            </div>

        </div>
    );
};

export {Product};