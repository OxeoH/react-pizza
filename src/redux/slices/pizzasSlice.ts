import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";

type PizzaItem={
    id: string; 
    title: string; 
    price: number; 
    imageUrl: string; 
    sizes: number[];
    types: number[];
}

interface PizzasSliceState{
    items: PizzaItem[],
    status: "loading" | "success" | "error",
}

interface FetchProps{
    category: string; 
    sortType: string; 
    search: string; 
    currentPage: number;
}


const initialState: PizzasSliceState = {
    items: [],
    status: 'loading',
}

enum Status{
    LOADING = "loading",
    ERROR = "error",
    SUCCESS = "success"
}


export const fetchPizzas = createAsyncThunk<PizzaItem[], FetchProps>('pizzas/fetchPizzasStatus', async (fetchParams) =>{
    const {category, sortType, search, currentPage} = fetchParams;
    const {data} = await axios.get<PizzaItem[]>(`https://6348936e0b382d796c73f4b1.mockapi.io/pizzas?page=${currentPage}&limit=4
    ${category}&sortBy=${sortType}&order=desc${search}`);
    return data;
});

export const pizzasSlice = createSlice({
    name: 'pizzas',
    initialState,
    reducers:{
        setItems(state, action){
            state.items = action.payload;
        },
    },
    extraReducers:(builder) => {
        builder.addCase(fetchPizzas.pending, (state) =>{
            state.status = Status.LOADING;
            state.items = [];
        });
        builder.addCase(fetchPizzas.fulfilled, (state, action: PayloadAction<PizzaItem[]>) =>{
            state.items = action.payload;
            state.status = Status.SUCCESS;
        });

        builder.addCase(fetchPizzas.rejected, (state) =>{
            state.status = Status.ERROR;
            state.items = [];
        });
    }
});

export const { setItems } = pizzasSlice.actions
export const pizzasSelector = (state: RootState) => state.pizzas;


export default pizzasSlice.reducer
