import { StyleSheet } from 'react-native';
import { Tokens } from '../../../../theme/theme';

export const createStyles = (colors, isDarkMode) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 16,
      height: 56,
    },
    backButton: {
      width: 40,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
    },
    headerTitle: {
      fontFamily: Tokens.typography.families.semiBold,
      fontSize: 18,
    },
    progressWrap: {
      paddingHorizontal: 24,
      paddingVertical: 10,
      gap: 6,
    },
    progressBar: {
      height: 6,
      borderRadius: 3,
      backgroundColor: isDarkMode ? '#2D3748' : '#E2E8F0',
      overflow: 'hidden',
    },
    progressFill: {
      height: '100%',
      backgroundColor: '#FF6B35',
      borderRadius: 3,
    },
    stepText: {
      fontSize: 12,
      fontFamily: Tokens.typography.families.medium,
      textTransform: 'uppercase',
      letterSpacing: 0.5,
    },
    scrollContent: {
      paddingHorizontal: 24,
      paddingTop: 16,
      paddingBottom: 40,
    },
    title: {
      fontFamily: Tokens.typography.families.semiBold,
      fontSize: 22,
      marginBottom: 6,
    },
    subtitle: {
      fontFamily: Tokens.typography.families.regular,
      fontSize: 14,
      marginBottom: 28,
      lineHeight: 20,
    },
    grid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      rowGap: 24,
    },
    gridItem: {
      width: '30%',
      alignItems: 'center',
    },
    circleWrap: {
      width: 80,
      height: 80,
      borderRadius: 40,
      backgroundColor: isDarkMode ? '#2D3748' : '#F7FAFC',
      borderWidth: 2,
      borderColor: 'transparent',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.05,
      shadowRadius: 3,
      elevation: 2,
    },
    circleEmoji: {
      fontSize: 32,
    },
    checkmarkWrap: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      borderRadius: 40,
      backgroundColor: 'rgba(255, 107, 53, 0.15)',
      alignItems: 'center',
      justifyContent: 'center',
    },
    circleLabel: {
      marginTop: 8,
      fontSize: 12,
      fontFamily: Tokens.typography.families.medium,
      textAlign: 'center',
    },
    saveButton: {
      height: 52,
      borderRadius: 26,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 32,
      shadowColor: '#FF6B35',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 6,
      elevation: 4,
    },
    saveButtonText: {
      color: '#FFFFFF',
      fontFamily: Tokens.typography.families.semiBold,
      fontSize: 16,
    },
  });
