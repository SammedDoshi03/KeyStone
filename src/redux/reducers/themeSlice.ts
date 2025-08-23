import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type ThemeState = {
  currentTheme: 'default' | 'highContrast';
};

const initialState: ThemeState = {
  currentTheme: 'default',
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme(state, action: PayloadAction<'default' | 'highContrast'>) {
      state.currentTheme = action.payload;
    },
  },
});

export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer;
