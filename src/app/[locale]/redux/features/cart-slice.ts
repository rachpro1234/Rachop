import {createSlice, PayloadAction} from "@reduxjs/toolkit"


interface cartItems {
    id: number;
    title: string;
    desc: string;
    img: string;
    price: number;
    prevPrice: number;
    quantity: number;
  }


  const initialState : cartItems[] = []

  // reducer
  export const cart = createSlice({
    name: "cart",
    initialState,
    reducers: {
        updateCart: (state, action: PayloadAction<cartItems[]>) => {
            return action.payload
        }
    }
  })

  export const {updateCart} = cart.actions;
  export default cart.reducer