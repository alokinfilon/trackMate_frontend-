import { useTheme } from '../../../../context/ThemeContext';

export const useAppearance = () => {
  const { toggleTheme, isDarkMode } = useTheme();

  return {
    toggleTheme,
    isDarkMode,
  };
};
