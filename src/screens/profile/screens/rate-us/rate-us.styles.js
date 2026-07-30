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
    scrollContent: {
      padding: 24,
      alignItems: 'center',
    },
    title: {
      fontSize: 22,
      fontFamily: Tokens.typography.families.semiBold,
      marginBottom: 8,
      textAlign: 'center',
      marginTop: 16,
    },
    subtitle: {
      fontSize: 14,
      fontFamily: Tokens.typography.families.regular,
      lineHeight: 20,
      marginBottom: 32,
      textAlign: 'center',
    },
    starsContainer: {
      flexDirection: 'row',
      gap: 12,
      marginBottom: 32,
    },
    feedbackCard: {
      width: '100%',
      gap: 8,
      marginBottom: 32,
    },
    feedbackLabel: {
      fontFamily: Tokens.typography.families.medium,
      fontSize: 14,
    },
    input: {
      borderWidth: 1,
      borderRadius: 12,
      padding: 12,
      height: 120,
      textAlignVertical: 'top',
      fontSize: 14,
      fontFamily: Tokens.typography.families.regular,
    },
    submitButton: {
      width: '100%',
      height: 52,
      borderRadius: 12,
      justifyContent: 'center',
      alignItems: 'center',
    },
    submitButtonText: {
      color: '#FFFFFF',
      fontFamily: Tokens.typography.families.semiBold,
      fontSize: 16,
    },
  });
