import React, {useEffect} from "react";
import {useParams} from "react-router";
import {useDispatch, useSelector} from "react-redux";

import {productActions} from "../../store";
import {SingleProduct} from "../../components";
import "./SingleProductPage.css";

const SingleProductPage = () => {

    const {id} = useParams();

    const {singleProduct, singleProductError, singleProductStatus} = useSelector(state => state["productReducer"]);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(productActions.getSingleProduct({id}));
    }, [id, singleProductStatus]);

    return (
        <div className="single_product">
            {singleProductError && <h1>Not found</h1>}
            {singleProduct && <SingleProduct singleProduct={singleProduct}/>}
        </div>
    );
};

export {SingleProductPage};