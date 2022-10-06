import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import {productActions} from "../../store";
import {Product} from "../Product/Product";
import {Modal} from "../Modal/Modal";
import "./Products.css";

const Products = () => {

    let {sortType, products, status, error} = useSelector(state => state["productReducer"]);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(productActions.getAllProducts());
        dispatch(productActions.setSortType("alphabet"));
    }, []);

    useEffect(() => {
        dispatch(productActions.sortProducts());
    }, [sortType]);

    const [modalActive, setModalActive] = useState(false);

    const [idForDelete, setIdForDelete] = useState(null);

    function deleteProduct() {
        setModalActive(false);
        dispatch(productActions.deleteProductById({idForDelete}))
    }

    return (
        <>
            {status === "pending" && <h2> Loading...</h2>}
            {error && <h2>{error}. Try again later</h2>}
            <div className="products">
                {products.map(product => <Product key={product.id} product={product} setModalActive={setModalActive}
                                                  setIdForDelete={setIdForDelete}/>)}
            </div>
            <Modal modalActive={modalActive} setModalActive={setModalActive}>
                <div className="modal_delete">
                    <button className="cancel" onClick={() => setModalActive(false)}>Cancel</button>
                    <button className="confirm" onClick={deleteProduct}>Confirm</button>
                </div>
            </Modal>
        </>
    );
};

export {Products};