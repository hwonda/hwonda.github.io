import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SortType, SortDirection } from '@/types';

interface PageState {
  sortType: SortType;
  sortDirection: SortDirection;
  currentPage: number;
}

const initialState: PageState = {
  sortType: 'created',
  sortDirection: 'desc',
  currentPage: 1,
};

const pageSlice = createSlice({
  name: 'page',
  initialState,
  reducers: {
    setSortType: (state, action: PayloadAction<SortType>) => {
      state.sortType = action.payload;
    },
    setSortDirection: (state, action: PayloadAction<SortDirection>) => {
      state.sortDirection = action.payload;
    },
    setSort: (state, action: PayloadAction<{ type: SortType; direction: SortDirection }>) => {
      state.sortType = action.payload.type;
      state.sortDirection = action.payload.direction;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
  },
});

export const { setSortType, setSortDirection, setSort, setCurrentPage } = pageSlice.actions;
export default pageSlice.reducer;
