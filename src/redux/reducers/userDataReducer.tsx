import { createSlice } from '@reduxjs/toolkit';

export const userData = createSlice({
  name: 'userData',
  initialState: {
    userData: {},
    userId: '',
    userCount: 0,
    isLoading: false,
    isUserIdLoaded: false,
    isCount: false,
  },
  reducers: {
    fetchUser: state => {
      state.isLoading = true;
    },
    fetchUserId: state => {
      state.isUserIdLoaded = true;
    },
    fetchUserIdSuccess: (state, action) => {
      state.userId = action.payload;
      state.isUserIdLoaded = true;
    },
    fetchUserCountValue: (state, action) => {
      state.isCount = true;
    },
    fetchUserSuccess: (state, action) => {
      state.userData = action.payload;
      state.isLoading = false;
    },
    fetchUserFailure: state => {
      state.isLoading = false;
    },
    fetchUserCount: (state, action) => {
      state.userCount = action.payload;
    },
    purgeUserData: state => {
      state.userData = {};
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  fetchUser,
  fetchUserId,
  fetchUserCountValue,
  fetchUserIdSuccess,
  fetchUserSuccess,
  fetchUserFailure,
  fetchUserCount,
  purgeUserData,
} = userData.actions;

export default userData.reducer;
