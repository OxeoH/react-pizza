import { CartItemSlice } from "../redux/slices/cartSlice";

export const calcTotalPrice = (items: CartItemSlice[]) =>{
    return items.reduce((sum, obj) => obj.price * obj.count + sum, 0);
};