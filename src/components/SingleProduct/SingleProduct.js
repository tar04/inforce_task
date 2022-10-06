import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import {productActions} from "../../store";
import {Comments} from "../Comments/Comments";
import {Modal} from "../Modal/Modal";
import {ProductForm} from "../ProductForm/ProductForm";
import "./SingleProduct.css";

const SingleProduct = ({singleProduct}) => {

    const {name, count, imageUrl, size: {width, height}, weight, comments} = singleProduct;

    const {productForUpdate} = useSelector(state => state["productReducer"]);

    const dispatch = useDispatch();

    const [modalActive, setModalActive] = useState(false);

    function editProduct() {
        setModalActive(true);
        dispatch(productActions.setProductForUpdate(singleProduct));
    }

    return (
        <div>
            <div className="product_info">
                <div className="product_info-left">
                    <img src={imageUrl ? require(`../../db/images/${imageUrl}`) : require("../../db/images/no-img.png")}
                         alt={name}/>
                    <div className="info">
                        <h3>Name: {name}</h3>
                        <h3>Count: {count}</h3>
                        <h3>Width: {width} cm</h3>
                        <h3>Height: {height} cm</h3>
                        <h3>weight: {weight}</h3>
                    </div>
                </div>
                <button onClick={editProduct}>Edit</button>
            </div>
            <Comments comments={comments}/>
            <Modal setModalActive={setModalActive} modalActive={modalActive}>
                <ProductForm setModalActive={setModalActive}/>
            </Modal>
        </div>
    );
};

export {SingleProduct};