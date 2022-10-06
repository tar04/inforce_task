import React, {useEffect} from "react";
import {useForm} from "react-hook-form";
import {joiResolver} from "@hookform/resolvers/joi";
import {useDispatch, useSelector} from "react-redux";

import {productActions} from "../../store";
import {productValidator} from "../../validators";
import "./ProductForm.css";

const ProductForm = ({setModalActive}) => {

    const {productForUpdate} = useSelector(state => state["productReducer"]);

    const dispatch = useDispatch();

    const {register, handleSubmit, formState: {errors}, setValue} = useForm({
        resolver: joiResolver(productValidator), mode: "onTouched"
    });

    useEffect(() => {
        if (productForUpdate) {
            const {name, count, size, weight} = productForUpdate;
            setValue("name", name);
            setValue("count", count);
            setValue("height", size.height);
            setValue("width", size.width);
            setValue("weight", weight.split('g')[0]);
        } else {
            setValue("name", "");
            setValue("count", "");
            setValue("height", "");
            setValue("width", "");
            setValue("weight", "");
        }
    }, [productForUpdate]);

    function cancel(e) {
        setModalActive(false);
        e.preventDefault();
    }

    async function send({name, count, weight, height, width}) {

        const newProduct = {
            //TODO В даному випадку з imageUrl: null без ноди не вийде записати файл в БД, оскільки це звичайна папка в проекті
            imageUrl: null,
            name,
            count,
            size: {
                height,
                width
            },
            weight: weight + "g",
            comments: []
        };

        if (productForUpdate) {
            await dispatch(productActions.updateProduct({
                newProduct: {
                    ...newProduct,
                    comments: productForUpdate.comments,
                    imageUrl: productForUpdate.imageUrl,
                    id: productForUpdate.id,
                }
            }));
        } else {
            await dispatch(productActions.createProduct({newProduct}));
            setValue("name", "");
            setValue("count", "");
            setValue("height", "");
            setValue("width", "");
            setValue("weight", "");
        }
        setModalActive(false);
    }

    return (
        <form className="product_form" onSubmit={handleSubmit(send)}>
            <h2>{productForUpdate ? "Update" : "Add"} product</h2>
            <div>
                <div className="form_inputs">
                    <div><label>Name: </label><input {...register("name")} type="text"/></div>
                    {errors.name && <p>{errors.name.message}</p>}
                    <div><label>Count: </label><input {...register("count")} type="number"/></div>
                    {errors.count && <p>{errors.count.message}</p>}
                    <div><label>Height(in cm): </label><input {...register("height")} type="number"/>
                    </div>
                    {errors.height && <p>{errors.height.message}</p>}
                    <div><label>Width(in cm): </label><input {...register("width")} type="number"/>
                    </div>
                    {errors.width && <p>{errors.width.message}</p>}
                    <div><label>Weight(in g): </label><input {...register("weight")} type="number"/></div>
                    {errors.weight && <p>{errors.weight.message}</p>}
                    <div><label>Load image: </label><input {...register("image")} type="file"/></div>
                </div>
                <div className="form_buttons">
                    <button className="form_button_ok">{productForUpdate ? "Update" : "Add"} product</button>
                    <button className="form_button_cancel" onClick={cancel}>Cancel</button>
                </div>
            </div>
        </form>
    );
};

export {ProductForm};