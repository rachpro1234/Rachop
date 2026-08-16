import {createSlice, PayloadAction} from "@reduxjs/toolkit"


const initialState: string | null = null;

// reducer
const checkout = createSlice({
    name: 'checkout',
    initialState,
    reducers: {
      setClientSecret: (state, action: PayloadAction<string | null> ) => {
         return action.payload
      } 
    }
});

export const { setClientSecret } = checkout.actions;
export default checkout.reducer
