import {createSlice, PayloadAction} from "@reduxjs/toolkit"


const initialState = null;


// reducer
const checkout = createSlice({
    name: 'checkout',
    initialState,
    reducers: {
      // @ts-ignore
      setClientSecret: (state, action: PayloadAction<string | null> ) =>  {
        return action.payload; 
      } 
    }
});

export const { setClientSecret } = checkout.actions;
export default checkout.reducer
