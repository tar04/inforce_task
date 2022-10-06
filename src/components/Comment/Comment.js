import React from "react";

import "./Comment.css";
import {useDispatch} from "react-redux";
import {productActions} from "../../store";

const Comment = ({comment: {id, description, date}}) => {

    const dispatch = useDispatch();

    function deleteComment() {
        dispatch(productActions.deleteComment({commentId:id}));
    }

    return (
        <div className="comment_wrap">
            <div className="comment">
                <h3 className="comment_info">{id}) {description}</h3>
                <div className="comment_date">{date}</div>
            </div>
            <img src={require("./remove.png")} alt="delete" onClick={deleteComment}/>
        </div>
    );
};

export {Comment};