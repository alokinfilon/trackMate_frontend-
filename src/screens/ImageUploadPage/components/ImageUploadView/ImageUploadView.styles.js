import { StyleSheet } from 'react-native';
import { Tokens } from '../../../../theme/theme';

export const createStyles = (colors, isDarkMode) =>
  StyleSheet.create({
    uploadContainer: {
      flexGrow: 1,
      padding: 20,
    },
    imagePreviewWrap: {
      width: '100%',
      height: 260,
      borderRadius: 24,
      backgroundColor: isDarkMode ? '#2D3748' : '#F7FAFC',
      borderWidth: 2,
      borderColor: colors.divider,
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      marginBottom: 20,
    },
    previewImg: {
      width: '100%',
      height: '100%',
      resizeMode: 'cover',
    },
    placeholderText: {
      fontFamily: Tokens.typography.families.medium,
      fontSize: 14,
      color: colors.textSecondary,
      marginTop: 8,
    },
    inputGroup: {
      marginBottom: 16,
    },
    label: {
      fontFamily: Tokens.typography.families.semiBold,
      fontSize: 14,
      color: colors.textSecondary,
      marginBottom: 6,
    },
    textInput: {
      height: 48,
      borderRadius: 12,
      borderWidth: 1.5,
      borderColor: colors.divider,
      paddingHorizontal: 16,
      fontFamily: Tokens.typography.families.medium,
      fontSize: 14,
      color: colors.textPrimary,
    },
    pickerRow: {
      flexDirection: 'row',
      gap: 12,
      marginTop: 4,
    },
    pickerOption: {
      flex: 1,
      height: 44,
      borderRadius: 12,
      borderWidth: 1.5,
      justifyContent: 'center',
      alignItems: 'center',
    },
    pickerOptionText: {
      fontFamily: Tokens.typography.families.semiBold,
      fontSize: 13,
    },
    actionBtn: {
      height: 52,
      borderRadius: 26,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 24,
    },
    actionBtnText: {
      color: '#FFFFFF',
      fontFamily: Tokens.typography.families.semiBold,
      fontSize: 15,
    },
  });
