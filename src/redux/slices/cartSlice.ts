import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getCartFromLS } from "../../utils/getCartFromLS";
import { RootState } from "../store";

export type CartItemSlice={
    id: string; 
    title: string; 
    price: number; 
    imageUrl: string; 
    sizes: number;
    types: number;
    count: number;
}

interface CartSliceState{
    totalPrice: number,
    items: CartItemSlice[],
}

const {items, totalPrice} = getCartFromLS();

const initialState: CartSliceState = {
    totalPrice,
    items
};


const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers:{
        addItem(state, action: PayloadAction<CartItemSlice>){
            const findClone = state.items.find(obj => obj.id === action.payload.id);
            if(findClone){
                findClone.count++
                state.totalPrice += Number(findClone.price);
            }else{
                state.items.push({...action.payload, count: 1});
                state.totalPrice += Number(action.payload.price);
            }
            
            
        },

        removeItem(state, action: PayloadAction<string>){
            const findClone = state.items.find(obj => obj.id === action.payload);
            if(findClone){
                if(findClone.count > 1){
                    findClone.count--;
                    state.totalPrice -= Number(findClone.price);
                }else{
                    state.items = state.items.filter(item => item.id !== action.payload);
                    state.totalPrice -= Number(findClone.price);
                }
            }
        },

        removeIndividual(state, action: PayloadAction<{id: string, count: number}>){
            const findClone = state.items.find(obj => obj.id === action.payload.id);
            
            if(findClone){
                state.items = state.items.filter(item => item.id !== action.payload.id);
                state.totalPrice -= Number(findClone.price * findClone.count);
            }
        },
        
        removeAll(state){
            state.items = [];
            state.totalPrice = 0;
        } 
    }
});
export const cartSelector = (state: RootState) => state.cart;
export const cartSelectorById = (id: string) => (state: RootState) => state.cart.items.find((obj) => obj.id === id);
export const {addItem, removeItem, removeAll, removeIndividual} = cartSlice.actions;
export default cartSlice.reducer;