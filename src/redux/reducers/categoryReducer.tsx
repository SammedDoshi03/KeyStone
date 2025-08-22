import { createSlice } from '@reduxjs/toolkit';

export const categoryData = createSlice({
  name: 'categoryData',
  initialState: {
    CategoryData: [],
    subCategoryData: [],
    isLoading: false,
  },
  reducers: {
    fetchCategory: state => {
      state.isLoading = true;
    },
    fetchCategoryDetails: (state, action) => {
      state.CategoryData = action.payload;
      state.isLoading = false;
    },
    fetchCategoryFailure: state => {
      state.isLoading = false;
    },
    fetchSubCategory: state => {
      state.isLoading = true;
    },
    fetchSubCategorySuccess: (state, action) => {
      state.subCategoryData = action.payload;
      state.isLoading = false;
    },
    fetchSubCategoryFailure: state => {
      state.isLoading = false;
    },
    purgeCategoryData: state => {
      state.CategoryData = [];
      state.subCategoryData = [];
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  fetchCategory,
  fetchCategoryDetails,
  fetchCategoryFailure,
  purgeCategoryData,
  fetchSubCategory,
  fetchSubCategoryFailure,
  fetchSubCategorySuccess,
} = categoryData.actions;

export default categoryData.reducer;
