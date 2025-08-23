const palette = {
  primary: '#FFFF00', // Yellow
  secondary: '#00FFFF', // Cyan
  white: '#FFFFFF',
  black: '#000000',
  grey: '#BEBEBE',
  lightGrey: '#E0E0E0',
  red: '#FF00FF', // Magenta
  green: '#00FF00', // Lime
};

export const highContrastTheme = {
  colors: {
    primary: palette.primary,
    secondary: palette.secondary,
    background: palette.black,
    text: palette.white,
    buttonText: palette.black,
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
