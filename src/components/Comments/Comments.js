import React, {useRef} from "react";
import {useDispatch} from "react-redux";

import {productActions} from "../../store";
import {Comment} from "../Comment/Comment";
import "./Comments.css";

const Comments = ({comments}) => {

    const input = useRef();

    const dispatch = useDispatch();

    function postComment() {
        //TODO Працює додавання коментарів лише без id, в іншому випадку працює некоректно, не зміг це вирішити

        // const time = new Date();
        // const date = `${time.toLocaleTimeString().split(":").splice(0, 2).join(":")} ${time.toLocaleDateString()}`;
        // dispatch(productActions.addComment({
        //     description: input.current.value,
        //     date
        // }));
    }

    return (
        <div className="comments">
            <h1>Comments</h1>
            <div className="comments_body">
                <div className="comments_add">
                    <input ref={input} type="text"/>
                    <img src={require("./add-button.png")} alt="post comment" onClick={postComment}/>
                </div>
                {!comments[0] ? "No comments yet" : comments.map(comment => <Comment key={comment.id}
                                                                                     comment={comment}/>)}
            </div>
        </div>
    );
};

export {Comments};