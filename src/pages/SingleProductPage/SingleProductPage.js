import React, {useEffect, useState} from "react";
import {useLocation, useParams} from "react-router";
import {useDispatch, useSelector} from "react-redux";

import "./SingleProductPage.css";
import {productActions} from "../../store";
import {SingleProduct} from "../../components";

const SingleProductPage = () => {

    const {id} = useParams();

    const {state} = useLocation();

    const {singleProduct, singleProductError, singleProductStatus} = useSelector(state => state["productReducer"]);

    const dispatch = useDispatch();

    useEffect(() => {
        if (state) {
            dispatch(productActions.resetSingleProductError(state));
        } else {
            dispatch(productActions.getSingleProduct({id}));
        }
    }, [id, state, singleProductStatus]);


    return (
        <div className="single_product">
            {singleProductError && <h1>Not found</h1>}
            {singleProduct && <SingleProduct singleProduct={singleProduct}/>}
        </div>
    );
};

export {SingleProductPage};