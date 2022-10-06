import {createSlice} from "@reduxjs/toolkit";
import {createAsyncThunk} from "@reduxjs/toolkit";

import {productsService} from "../../services";

const initialState = {
    products: [],
    status: null,
    error: null,
    singleProduct: null,
    singleProductError: null,
    singleProductStatus: false,
    productForUpdate: null,
    sortType: "alphabet",
};

const getAllProducts = createAsyncThunk(
    "productSlice/getAllProducts",
    async (_, {dispatch, rejectWithValue}) => {
        try {
            dispatch(resetProductForUpdate());
            return await productsService.getAll();
        } catch (e) {
            return rejectWithValue(e.message);
        }
    }
);

const getSingleProduct = createAsyncThunk(
    "productSlice/getSingleProduct",
    async ({id}, {rejectWithValue}) => {
        try {
            return await productsService.getById(id);
        } catch (e) {
            return rejectWithValue(e.message);
        }
    }
);

const deleteProductById = createAsyncThunk(
    "productSlice/deleteProductById",
    async ({idForDelete: id}, {dispatch, rejectWithValue}) => {
        try {
            await productsService.deleteById(id);
            dispatch(deleteProduct({id}));
        } catch (e) {
            return rejectWithValue(e.response.data);
        }
    }
);

const createProduct = createAsyncThunk(
    "productSlice/createProduct",
    async ({newProduct}, {dispatch}) => {
        const product = await productsService.create(newProduct);
        dispatch(createProd(product));
    }
);

const updateProduct = createAsyncThunk(
    "productSlice/updateProduct",
    async ({newProduct}, {dispatch, rejectWithValue}) => {
        try {
            await productsService.updateById(newProduct.id, newProduct);
            dispatch(setSingleProductStatus());
        } catch (e) {
            return rejectWithValue(e.response.data);
        }
    }
);

const deleteComment = createAsyncThunk(
    "productSlice/deleteComment",
    async ({commentId, comments}, {dispatch, rejectWithValue, getState}) => {
        try {
            const {productReducer: {singleProduct}} = getState();
            const comments = singleProduct.comments.filter(comment => comment.id !== commentId);
            await productsService.updateById(singleProduct.id, {...singleProduct, comments});
            dispatch(setSingleProductStatus());
        } catch (e) {
            return rejectWithValue(e.response.data);
        }
    }
);

const addComment = createAsyncThunk(
    "productSlice/addComment",
    async ({description, date}, {dispatch, getState}) => {
        //TODO Та сама функція з компоненти Comments.js, яку не вийшло пофіксити

        // try {
        //     const {productReducer: {singleProduct, products}} = getState();
        //     const flat = products.reduce((acc, item) => [...acc, item.comments], []).flat();
        //     const id = flat.reduce((acc, item) => acc > item.id ? acc : item.id, flat[0].id);
        //     const comments = singleProduct.comments.concat({id: id + 1, description, date, productId: singleProduct.id})
        //
        //     await productsService.updateById(singleProduct.id, {
        //         ...singleProduct,
        //         comments
        //     });
        //     dispatch(setSingleProductStatus());
        // } catch (e) {
        //     console.log(e);
        // }
    }
);

const productSlice = createSlice({
    name: "productSlice",
    initialState,
    reducers: {
        createProd: (state, action) => {
            state.products.push(action.payload);
        },
        resetProductForUpdate: (state) => {
            state.productForUpdate = null;
        },
        setProductForUpdate: (state, action) => {
            state.productForUpdate = action.payload;
        },
        setSingleProductStatus: (state) => {
            state.singleProductStatus = !state.singleProductStatus;
        },
        deleteProduct: (state, action) => {
            const {id} = action.payload;
            state.products = state.products.filter(product => product.id !== id);
        },
        sortProducts: (state) => {
            switch (state.sortType) {
                case "alphabet":
                    state.products = state.products.sort((a, b) => a.name.localeCompare(b.name));
                    break;
                case "count":
                    state.products = state.products.sort((a, b) => b.count - a.count);
                    break;
            }
        },
        setSortType: (state, action) => {
            state.sortType = action.payload;
        }
    },
    extraReducers: {
        [getAllProducts.pending]: (state) => {
            state.status = "pending";
            state.error = null;
        },
        [getAllProducts.fulfilled]: (state, action) => {
            state.status = "fulfilled";
            state.products = action.payload.sort((a, b) => a.name.localeCompare(b.name));
        },
        [getAllProducts.rejected]: (state, action) => {
            state.status = "rejected";
            state.error = action.payload;
        },
        [getSingleProduct.pending]: (state) => {
            state.singleProductError = null;
        },
        [getSingleProduct.fulfilled]: (state, action) => {
            state.singleProduct = action.payload;
        },
        [getSingleProduct.rejected]: (state) => {
            state.singleProductError = "rejected"
        },
    }
});

const {
    reducer: productReducer,
    actions: {
        createProd,
        setProductForUpdate,
        resetProductForUpdate,
        deleteProduct,
        sortProducts,
        setSortType,
        setSingleProductStatus
    }
} = productSlice;

const productActions = {
    getAllProducts,
    createProduct,
    updateProduct,
    deleteProductById,
    getSingleProduct,
    deleteComment,
    addComment,
    sortProducts,
    setSortType,
    setProductForUpdate,
};

export {
    productReducer,
    productActions
};