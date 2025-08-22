import { createSlice } from '@reduxjs/toolkit';

export const user = createSlice({
  name: 'User',
  initialState: {
    email: '',
    password: '',
    isLoggedIn: false,
    accountType: '',
    firstTime: true,
    isLoading: false,
  },
  reducers: {
    addUser: (state, action) => {
      state = action.payload;
      return state;
    },
    removeUser: (state, action) => {
      state = action.payload;
      return state;
    },
    login: state => {
      state.isLoggedIn = true;
      return state;
    },
    logout: state => {
      state.isLoggedIn = false;
      return state;
    },
    introHandle: state => {
      state.firstTime = false;
      return state;
    },
    //@ts-ignore
    test: state => {
      return state.firstTime;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addUser, removeUser, login, logout, introHandle, test } =
  user.actions;

export const loginValue = state => state.login.isLoggedIn;

export default user.reducer;
