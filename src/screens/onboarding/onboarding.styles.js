import { StyleSheet } from 'react-native';
import { Tokens } from '../../theme/theme';

export const createStyles = (colors, isDarkMode) =>
  StyleSheet.create({
    screenContainer: {
      flex: 1,
      backgroundColor: isDarkMode ? colors.bg : '#FFFFFF',
    },
    safeArea: {
      flex: 1,
    },
    slide: {
      width: Tokens.layout.width,
      flex: 1,
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 24,
      paddingVertical: 40,
    },
    imageContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      maxHeight: Tokens.layout.height * 0.45,
    },
    image: {
      width: '90%',
      height: '90%',
    },
    textContainer: {
      alignItems: 'center',
      width: '100%',
      paddingHorizontal: 16,
      marginBottom: 30,
    },
    titleText: {
      fontFamily: Tokens.typography.families.semiBold,
      fontSize: 26,
      lineHeight: 32,
      color: colors.textPrimary,
      fontWeight: '800',
      textAlign: 'center',
      marginBottom: 12,
    },
    subtitleText: {
      fontFamily: Tokens.typography.families.regular,
      fontSize: 16,
      lineHeight: 22,
      color: colors.textSecondary,
      textAlign: 'center',
    },
    bottomContainer: {
      width: '100%',
      alignItems: 'center',
      paddingHorizontal: 24,
      paddingBottom: 20,
    },
    indicatorRow: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 32,
      gap: 8,
    },
    dot: {
      height: 8,
      width: 8,
      borderRadius: 4,
      backgroundColor: isDarkMode ? 'rgba(255,255,255,0.2)' : '#E2E8F0',
    },
    activeDot: {
      width: 24,
      backgroundColor: '#FF6B35',
    },
    buttonContainer: {
      width: '100%',
      gap: 16,
      alignItems: 'center',
    },
    primaryButton: {
      width: '100%',
      height: Tokens.components.buttonHeight,
      borderRadius: 12,
      backgroundColor: '#FF6B35',
      justifyContent: 'center',
      alignItems: 'center',
    },
    primaryButtonText: {
      fontFamily: Tokens.typography.families.semiBold,
      fontSize: 16,
      color: '#FFFFFF',
      fontWeight: '600',
    },
    skipButton: {
      paddingVertical: 8,
    },
    skipButtonText: {
      fontFamily: Tokens.typography.families.medium,
      fontSize: 15,
      color: colors.textSecondary,
    },
  });
