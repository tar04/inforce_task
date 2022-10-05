import {createSlice} from "@reduxjs/toolkit";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {productsService} from "../../services";

const initialState = {
    products: [],
    status: null,
    error: null,
    singleProduct: {},
}

const getAllProducts = createAsyncThunk(
    "productSlice/getAllProducts",
    async (_, {rejectWithValue}) => {
        try {
            return await productsService.getAll();
        } catch (e) {
            return rejectWithValue(e.message)
        }
    }
);

const deleteProduct = createAsyncThunk(
    "productSlice/getAllProducts",
    async (_, {rejectWithValue}) => {
        try {
            return await productsService.deleteById();
        } catch (e) {
            return rejectWithValue(e.message)
        }
    }
);

const productSlice = createSlice({
    name: "productSlice",
    initialState,
    reducers: {},
    extraReducers: {
        [getAllProducts.pending]: (state) => {
            state.status = "pending";
            state.error = null;
        },
        [getAllProducts.fulfilled]: (state, action) => {
            state.status = "fulfilled";
            state.products = action.payload;
        },
        [getAllProducts.rejected]: (state, action) => {
            state.status = "rejected";
            state.error=action.payload;
        },
    }
});

const {reducer: productReducer, actions: {}} = productSlice;

const productActions = {
    getAllProducts
};

export {
    productReducer,
    productActions
};