import { useMemo } from 'react';
import { useTheme } from '../../../../context/ThemeContext';
import { createStyles } from './ImageUploadView.styles';

export const useImageUploadView = () => {
  const { colors, isDarkMode } = useTheme();
  const styles = useMemo(() => createStyles(colors, isDarkMode), [colors, isDarkMode]);

  return { styles, colors };
};
