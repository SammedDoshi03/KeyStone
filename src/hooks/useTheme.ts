import { useSelector } from 'react-redux';
import { theme } from '../theme/theme';
import { highContrastTheme } from '../theme/high-contrast-theme';

// Define a RootState type
// This is a common pattern to get strong typing with useSelector
// You should define this in a central place, e.g., your store configuration
type RootState = {
  theme: {
    currentTheme: 'default' | 'highContrast';
  };
  // ... other reducers
};


export const useTheme = () => {
  const currentThemeName = useSelector((state: RootState) => state.theme.currentTheme);

  if (currentThemeName === 'highContrast') {
    return highContrastTheme;
  }

  return theme;
};
