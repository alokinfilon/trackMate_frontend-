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
      gap: 20,
    },
    inputGroup: {
      gap: 8,
    },
    label: {
      fontFamily: Tokens.typography.families.medium,
      fontSize: 14,
    },
    inputWrap: {
      flexDirection: 'row',
      alignItems: 'center',
      height: 52,
      borderRadius: 12,
      borderWidth: 1,
      paddingHorizontal: 12,
    },
    input: {
      flex: 1,
      height: '100%',
      fontSize: 15,
      fontFamily: Tokens.typography.families.regular,
      padding: 0,
    },
    visibilityBtn: {
      padding: 4,
    },
    saveButton: {
      height: 52,
      borderRadius: 12,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 20,
    },
    saveButtonText: {
      color: '#FFFFFF',
      fontFamily: Tokens.typography.families.semiBold,
      fontSize: 16,
    },
  });
