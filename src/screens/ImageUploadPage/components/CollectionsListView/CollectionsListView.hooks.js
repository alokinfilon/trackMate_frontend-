import { useMemo } from 'react';
import { useTheme } from '../../../../context/ThemeContext';
import { createStyles } from './CollectionsListView.styles';

export const useCollectionsListView = () => {
  const { colors, isDarkMode } = useTheme();
  const styles = useMemo(() => createStyles(colors, isDarkMode), [colors, isDarkMode]);

  return {
    styles,
    colors,
    isDarkMode,
  };
};
