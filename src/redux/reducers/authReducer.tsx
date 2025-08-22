import { createSlice } from '@reduxjs/toolkit';

export const auth = createSlice({
  name: 'auth',
  initialState: {
    isLoggedOut: false,
    isLoading: false,
    loginSuccess: [],
  },
  reducers: {
    test: state => {},
    loginSaga: state => {
      state.isLoading = true;
    },
    loginSagaSuccess: (state, action) => {
      state.loginSuccess = action.payload;
      state.isLoading = false;
    },
    loginSagaFailure: state => {
      state.isLoading = false;
    },
    logoutSaga: state => {
      state.isLoading = true;
    },
    logoutSagaSuccess: (state, action) => {
      state.isLoggedOut = action.payload;
      state.isLoading = false;
    },
    logoutSagaFailure: state => {
      state.isLoading = false;
    },
    passwordUpdateSaga: state => {
      state.isLoading = true;
    },
    passwordUpdateSagaSuccess: (state, action) => {
      state.isLoading = false;
    },
    purgeAuth: state => {
      console.log('purge flow');
      state.loginSuccess = [];
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  logoutSaga,
  logoutSagaSuccess,
  logoutSagaFailure,
  passwordUpdateSaga,
  passwordUpdateSagaSuccess,
  loginSaga,
  loginSagaSuccess,
  loginSagaFailure,
  purgeAuth,
  test,
} = auth.actions;

export default auth.reducer;
