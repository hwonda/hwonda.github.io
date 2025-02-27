import { configureStore } from '@reduxjs/toolkit';
import termsReducer from './termsSlice';
import searchReducer from './searchSlice';
import pageReducer from './pageSlice';

export const store = configureStore({
  reducer: {
    terms: termsReducer,
    search: searchReducer,
    page: pageReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;