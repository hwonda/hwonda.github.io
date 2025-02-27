import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TermData } from '@/types';

interface TermsState {
  terms: TermData[];
  searchedTerms: TermData[];
  loading: boolean;
  error: string | null;
}

const initialState: TermsState = {
  terms: [],
  searchedTerms: [],
  loading: false,
  error: null,
};

const termsSlice = createSlice({
  name: 'terms',
  initialState,
  reducers: {
    setTerms: (state, action: PayloadAction<TermData[]>) => {
      state.terms = action.payload;
      state.loading = false;
      state.error = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
    setSearchedTerms: (state, action: PayloadAction<TermData[]>) => {
      state.searchedTerms = action.payload;
    },
  },
});

export const { setTerms, setLoading, setError, setSearchedTerms } = termsSlice.actions;
export default termsSlice.reducer;