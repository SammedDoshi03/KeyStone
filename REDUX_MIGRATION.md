# Redux Migration to Redux Toolkit

This document outlines the process of migrating our Redux implementation to use the modern Redux Toolkit library. This migration simplifies our state management, reduces boilerplate code, and improves performance.

## Key Changes

- **`createSlice` for Reducers**: We now use the `createSlice` function from Redux Toolkit to create our reducers. This function automatically generates action creators and action types, which significantly reduces the amount of code we need to write.

- **`createAsyncThunk` for Asynchronous Logic**: We have replaced `redux-saga` with `createAsyncThunk` for handling asynchronous operations like API calls. `createAsyncThunk` provides a standardized way to handle the pending, fulfilled, and rejected states of an async action, which makes the code more predictable and easier to debug.

## How to Migrate a Saga to an Async Thunk

Here is a step-by-step guide on how to migrate an existing saga to an async thunk:

1.  **Identify the Saga**: Find the saga worker function (e.g., `workFetchSomeData`) and the corresponding `takeEvery` call in the saga file.

2.  **Create an Async Thunk**: In the corresponding reducer file (e.g., `someDataSlice.ts`), create an async thunk using `createAsyncThunk`. The thunk should call the asynchronous function that was previously called in the saga.

    ```typescript
    import { createAsyncThunk } from '@reduxjs/toolkit';
    import { fetchData } from '../../firebase/someService';

    export const fetchDataAsync = createAsyncThunk(
      'someData/fetchData',
      async (params) => {
        const response = await fetchData(params);
        return response;
      }
    );
    ```

3.  **Handle the Thunk in the Slice**: In the `createSlice` call, use the `extraReducers` builder syntax to handle the `pending`, `fulfilled`, and `rejected` actions dispatched by the async thunk.

    ```typescript
    extraReducers: builder => {
      builder
        .addCase(fetchDataAsync.pending, state => {
          state.isLoading = true;
        })
        .addCase(fetchDataAsync.fulfilled, (state, action) => {
          state.isLoading = false;
          state.data = action.payload;
        })
        .addCase(fetchDataAsync.rejected, state => {
          state.isLoading = false;
          // Handle error state if needed
        });
    },
    ```

4.  **Update the Component**: In the component that dispatches the action, replace the old saga action with the new async thunk.

    ```typescript
    // Before
    dispatch(fetchDataAction(params));

    // After
    dispatch(fetchDataAsync(params));
    ```

5.  **Remove the Saga**: Once the thunk is working correctly, you can safely remove the old saga worker function and the `takeEvery` call from the saga file.

By following this process, we can gradually migrate our entire Redux implementation to use the modern, efficient, and developer-friendly Redux Toolkit.
