import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store';

export type SortItem={
  name: string;
  sortType: 'rating' | 'title' | 'price';
}


interface FilterSliceState{
  searchValue: string,
  categoryId : number,
  currentPage: number,
  sort: SortItem
}

const initialState: FilterSliceState= {
  searchValue: '',
  categoryId : 0,
  currentPage: 1,
  sort:{
      name: "популярности",
      sortType: "rating"
  }
}

export const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setSearchValue(state, action: PayloadAction<string>){
      state.searchValue = String(action.payload);
    },
    setCategoryId: (state, action: PayloadAction<number>) => {
      state.categoryId = action.payload;
    },
    setActiveSort: (state, action: PayloadAction<SortItem>) =>{
        state.sort = action.payload;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    // setFilterParams: (state, action: PayloadAction<>) =>{
    //   state.categoryId = action.payload.categoryId;
    //   state.sort = action.payload.sort;
    //   state.currentPage = action.payload.currentPage;
    //   state.searchValue = action.payload.search;
    // }
  },
})

export const { setCategoryId, setActiveSort, setCurrentPage, setSearchValue } = filterSlice.actions;  //setFilterParams
export const filterSelector = (state: RootState) => state.filter;
export const filterSortSelector = (state: RootState) => state.filter.sort;
export default filterSlice.reducer;