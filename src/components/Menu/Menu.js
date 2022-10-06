import React, {useState} from "react";

import {useDispatch} from "react-redux";
import {productActions} from "../../store";
import "./Menu.css";
import {Modal} from "../Modal/Modal";
import {ProductForm} from "../ProductForm/ProductForm";

const Menu = () => {

    const dispatch = useDispatch();

    const [modalActive, setModalActive] = useState(false);

    function changeSort(e) {
        dispatch(productActions.setSortType(e.target.value))
    }

    return (
        <div className="menu">
            <button className="add_button" onClick={() => setModalActive(true)}>Add products</button>
            <select onChange={changeSort} className="select_menu">
                <option value="alphabet">Sort by alphabet</option>
                <option value="count">Sort by count</option>
            </select>
            <Modal modalActive={modalActive} setModalActive={setModalActive}>
                <ProductForm setModalActive={setModalActive}/>
            </Modal>
        </div>
    );
};

export {Menu};