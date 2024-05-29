import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/authReducers";
import cartReducers from "./reducers/cartReducers";
import favoriteReducers from "./reducers/favoriteReducers";


export default configureStore({
    reducer: {
        authReducer,
        cartReducers,
        favoriteReducers,
    }
})
