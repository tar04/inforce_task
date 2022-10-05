import React from "react";
import {Routes, Route, Navigate} from "react-router";

import {MainPage, NotFoundPage, ProductsPage, SingleProductPage} from "./pages";

function App() {
    return (
        <Routes>
            <Route path={"/"} element={<Navigate to={"/products"}/>}/>
            <Route path={"/products"} element={<MainPage/>}>
                <Route index element={<ProductsPage/>}/>
                <Route path={":id"} element={<SingleProductPage/>}/>
            </Route>
            <Route path={"*"} element={<NotFoundPage/>}/>
        </Routes>
    );
}

export default App;