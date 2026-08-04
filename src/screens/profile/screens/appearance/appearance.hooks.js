import { useTheme } from '../../../../context';

export const useAppearance = () => {
  const { toggleTheme, isDarkMode } = useTheme();

  return {
    toggleTheme,
    isDarkMode,
  };
};
