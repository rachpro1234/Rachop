import {createSlice, PayloadAction} from "@reduxjs/toolkit"


interface cartItems {
    id: number;
    slug: string;
    title_key: string;
    desc_key: string;
    category: string;
    img: string;
    price: number;
    prev_price: number | null;
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