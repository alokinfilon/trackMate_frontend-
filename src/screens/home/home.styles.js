import { StyleSheet, Dimensions } from 'react-native';
import { Tokens } from '../../theme/theme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
export const CAROUSEL_WIDTH = SCREEN_WIDTH - Tokens.layout.paddingHorizontal * 2;

export const createStyles = (colors, isDarkMode) =>
  StyleSheet.create({
    rootView: {
      flex: 1,
    },
    screenContainer: {
      flex: 1,
      backgroundColor: isDarkMode ? '#13132B' : '#FFFFFF',
    },
    safeArea: {
      flex: 1,
    },
    loaderContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: isDarkMode ? '#13132B' : '#FFFFFF',
    },
    listContent: {
      paddingBottom: 40,
    },
    // Cards section wrapper — horizontal padding applied here
    cardsPadding: {
      paddingHorizontal: Tokens.layout.paddingHorizontal,
    },
    recommendedHeader: {
      paddingHorizontal: Tokens.layout.paddingHorizontal,
      marginBottom: Tokens.gaps.large,
    },
    footerLoader: {
      paddingVertical: 24,
      alignItems: 'center',
    },
    popularWrapper: {
      paddingHorizontal: Tokens.layout.paddingHorizontal,
    },
  });
