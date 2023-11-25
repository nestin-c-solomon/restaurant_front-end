import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name:'cart',
    initialState:[],// array can have multiple items
    reducers:{
        //actions
        // fn to add items into cart array
        addToCart:(state,action)=>{
            state.push(action.payload)
        },

        //fn to  remove items from cart array
        removeFromCart:(state,action)=>{
            return state.filter((item)=>item.id!=action.payload)
        },

        //fn to empty cart array after checkout
        emptyCart:(state)=>{
            return state = []
        }
    }

})



export const {addToCart, removeFromCart, emptyCart} = cartSlice.actions
export default cartSlice.reducer