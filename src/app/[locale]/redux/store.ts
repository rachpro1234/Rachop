import { configureStore } from "@reduxjs/toolkit";
import cartReducer from './features/cart-slice'
import {TypedUseSelectorHook, useSelector} from "react-redux"
import checkoutReducer from "./features/checkout-slice";

export const store = configureStore({
    reducer :{
        cartReducer,
        checkoutReducer,
    }
})



export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch


export const useAppSelector : TypedUseSelectorHook<RootState> = useSelector