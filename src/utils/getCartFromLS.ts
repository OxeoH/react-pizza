import { CartItemSlice } from "../redux/slices/cartSlice";
import { calcTotalPrice } from "./calcTotalPrice";

export const getCartFromLS =()=>{
    const data = localStorage.getItem('cart');
    const items: CartItemSlice[] = data ? JSON.parse(data) : [];
    const totalPrice = calcTotalPrice(items);

    if(items.length){
        return {
            items,
            totalPrice,
        }
    }else{
        return{
            items: [],
            totalPrice: 0,
        }
    }
}