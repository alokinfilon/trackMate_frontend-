import { useState, useMemo } from 'react';
import { useTheme } from '../../../../context/ThemeContext';
import { createStyles } from './CollectionDetailView.styles';

export const useCollectionDetailView = () => {
  const { colors, isDarkMode } = useTheme();
  const styles = useMemo(() => createStyles(colors, isDarkMode), [colors, isDarkMode]);
  const [fabVisible, setFabVisible] = useState(true);
  const [focusedImageDeleteId, setFocusedImageDeleteId] = useState(null);

  return {
    styles,
    colors,
    fabVisible,
    setFabVisible,
    focusedImageDeleteId,
    setFocusedImageDeleteId,
  };
};
