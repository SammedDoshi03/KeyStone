import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { filterByLocation } from '../../firebase/manageSpoc';

export const fetchSpocByLocationAsync = createAsyncThunk(
  'spoc/fetchSpocByLocation',
  async (location: string) => {
    const response = await filterByLocation(location);
    return response;
  },
);

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
  extraReducers: builder => {
    builder
      .addCase(fetchSpocByLocationAsync.pending, state => {
        state.isLoading = true;
      })
      .addCase(fetchSpocByLocationAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.manageSpocData = action.payload;
      })
      .addCase(fetchSpocByLocationAsync.rejected, state => {
        state.isLoading = false;
      });
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
  fetchSpoc,
  fetchSpocSuccess,
  fetchSpocFailure,
  fetchSpocDetails,
  fetchSpocDetailsSuccess,
  fetchSpocDetailsFailure,
  purgeSpoc,
} = spoc.actions;

export default spoc.reducer;
