import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/authReducers";


export default configureStore({
    reducer: {
        authReducer,
    }
})
