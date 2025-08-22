import { createSlice } from '@reduxjs/toolkit';

export const spoc = createSlice({
  name: 'spoc',
  initialState: {
    addSpocFlag: false,
    spocAmount: 0,
    manageSpocData: [],
    manageSpocDetailData: {},
    spocSingleData: [],
    isLoading: false,
  },
  reducers: {
    addSpoc: state => {
      state.isLoading = true;
      state.addSpocFlag = false;
    },
    addSpocSuccess: (state, action) => {
      state.addSpocFlag = action.payload;
      state.isLoading = false;
    },
    addSpocFailure: state => {
      state.isLoading = false;
    },
    addSpocErrorFlag: state => {
      state.addSpocFlag = false;
    },
    fetchSpocAmount: state => {
      state.isLoading = true;
    },
    fetchSpocAmountSuccess: (state, action) => {
      state.spocAmount = action.payload;
      state.isLoading = false;
    },
    fetchSpocAmountFailure: state => {
      state.isLoading = false;
    },
    fetchSpocByLocation: state => {
      state.isLoading = true;
    },
    fetchSpocByLocationSuccess: (state, action) => {
      state.manageSpocData = action.payload;
      state.isLoading = false;
    },
    fetchSpocByLocationFailure: state => {
      state.isLoading = false;
    },
    fetchSpoc: state => {
      state.isLoading = true;
    },
    fetchSpocSuccess: (state, action) => {
      state.manageSpocData = action.payload;
      state.isLoading = false;
    },
    fetchSpocFailure: state => {
      state.isLoading = false;
    },
    fetchSpocDetails: state => {
      state.isLoading = true;
    },
    fetchSpocDetailsSuccess: (state, action) => {
      state.manageSpocDetailData = action.payload;
      state.isLoading = false;
    },
    fetchSpocDetailsFailure: state => {
      state.isLoading = false;
    },
    purgeSpoc: state => {
      state.addSpocFlag = false;
      state.spocAmount = 0;
      state.manageSpocData = [];
      state.manageSpocDetailData = {};
      state.spocSingleData = [];
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addSpoc,
  addSpocSuccess,
  addSpocFailure,
  addSpocErrorFlag,
  fetchSpocAmount,
  fetchSpocAmountSuccess,
  fetchSpocAmountFailure,
  fetchSpocByLocation,
  fetchSpocByLocationSuccess,
  fetchSpocByLocationFailure,
  fetchSpoc,
  fetchSpocSuccess,
  fetchSpocFailure,
  fetchSpocDetails,
  fetchSpocDetailsSuccess,
  fetchSpocDetailsFailure,
  purgeSpoc,
} = spoc.actions;

export default spoc.reducer;
