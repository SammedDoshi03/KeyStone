const palette = {
  primary: '#3274AB',
  secondary: '#5E99C7',
  white: '#FFFFFF',
  black: '#000000',
  grey: '#979797',
  lightGrey: '#E0E0E0',
  red: '#FF0000',
  green: '#9BC354',
};

export const theme = {
  colors: {
    primary: palette.primary,
    secondary: palette.secondary,
    background: palette.white,
    text: palette.black,
    buttonText: palette.white,
    disabled: palette.grey,
    error: palette.red,
    success: palette.green,
    ...palette,
  },
  spacing: {
    xs: 4,
    s: 8,
    m: 12,
    l: 16,
    xl: 20,
    xxl: 24,
  },
  typography: {
    h0: {
      fontSize: 40,
      fontWeight: '400',
    },
    h1: {
      fontSize: 28,
      fontWeight: 'bold',
    },
    h2: {
      fontSize: 20,
      fontWeight: '300',
    },
    body: {
      fontSize: 18,
      fontWeight: '600',
    },
    caption: {
      fontSize: 12,
    },
  },
};
