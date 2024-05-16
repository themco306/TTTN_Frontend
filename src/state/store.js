import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/authReducers";
import cartReducers from "./reducers/cartReducers";


export default configureStore({
    reducer: {
        authReducer,
        cartReducers
    }
})
