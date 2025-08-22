import { createSlice } from '@reduxjs/toolkit';

export const asset = createSlice({
  name: 'asset',
  initialState: {
    assetDataList: [],
    allocatedAssetUserList: [],
    allocatedAssetUserAssetDataList: [],
    isLoading: false,
  },
  reducers: {
    getAssets: (state, action) => {
      state.isLoading = true;
    },
    getUserAssets: (state, action) => {
      state.isLoading = true;
    },
    getAssetSuccess: (state, action) => {
      state.assetDataList = action.payload;
      state.isLoading = false;
    },
    getassetFailure: state => {
      state.isLoading = false;
    },
    addAssets: state => {
      state.isLoading = true;
    },
    addAssetSuccess: (state, action) => {
      state.isLoading = false;
    },
    fetchAssetAllocatedUsers: state => {
      state.isLoading = true;
    },
    fetchAssetAllocatedUsersSuccess: (state, action) => {
      state.allocatedAssetUserList = action.payload;
      state.isLoading = false;
    },
    fetchAssetAllocatedUsersDataSuccess: (state, action) => {
      state.allocatedAssetUserAssetDataList = action.payload;
      state.isLoading = false;
    },
    fetchAssetAllocatedUsersFailure: state => {
      state.isLoading = false;
    },
    updateAssetStatus: state => {
      state.isLoading = true;
    },
    updateAssetStatusSuccess: state => {
      state.isLoading = false;
    },
    updateAsset: state => {
      state.isLoading = true;
    },
    removeAsset: state => {
      state.isLoading = true;
    },
    removeAssetSuccess: state => {
      state.isLoading = false;
    },
    purseUserAsset: state => {
      state.allocatedAssetUserAssetDataList = [];
    },
    purgeAsset: state => {
      state.assetDataList = [];
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  getAssets,
  getUserAssets,
  getAssetSuccess,
  getassetFailure,
  updateAssetStatus,
  updateAssetStatusSuccess,
  removeAsset,
  updateAsset,
  removeAssetSuccess,
  purgeAsset,
  purseUserAsset,
  fetchAssetAllocatedUsers,
  fetchAssetAllocatedUsersSuccess,
  fetchAssetAllocatedUsersDataSuccess,
  fetchAssetAllocatedUsersFailure,
  addAssets,
  addAssetSuccess,
} = asset.actions;

export default asset.reducer;
