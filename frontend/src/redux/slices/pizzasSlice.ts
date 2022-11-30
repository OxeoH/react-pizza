import { createAsyncThunk, createSlice, current, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";

export type PizzaItemSlice={
    id: string; 
    title: string; 
    price: number; 
    imageUrl: string; 
    sizes: number[];
    types: number[];
}

interface PizzasSliceState{
    items: PizzaItemSlice[],
    status: "loading" | "success" | "error",
}

interface FetchProps{
    categoryId: number; 
    sortType: string; 
    searchValue: string; 
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


export const fetchPizzas = createAsyncThunk<PizzaItemSlice[], FetchProps>('pizzas/fetchPizzasStatus', async (fetchParams) =>{
    const {categoryId, sortType, searchValue, currentPage} = fetchParams;

    const {data} = await axios.get<PizzaItemSlice[]>(`http://localhost:8080/pizzas`,
    {params: {
        page: currentPage,
        limit: 4,
        category: categoryId,
        search: searchValue,
        order: "desc",
        sortBy: sortType
    }});


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
        builder.addCase(fetchPizzas.fulfilled, (state, action: PayloadAction<PizzaItemSlice[]>) =>{
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
