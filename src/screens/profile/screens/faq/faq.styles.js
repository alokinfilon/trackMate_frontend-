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
      gap: 16,
    },
    searchBox: {
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderRadius: 12,
      paddingHorizontal: 12,
      height: 48,
      gap: 8,
      marginBottom: 8,
    },
    searchInput: {
      flex: 1,
      fontSize: 14,
      fontFamily: Tokens.typography.families.regular,
      padding: 0,
    },
    faqList: {
      gap: 12,
    },
    faqItem: {
      borderRadius: 12,
      borderWidth: 1,
      overflow: 'hidden',
    },
    faqHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 16,
    },
    faqQuestion: {
      fontFamily: Tokens.typography.families.medium,
      fontSize: 15,
      flex: 1,
      paddingRight: 8,
    },
    faqBody: {
      padding: 16,
    },
    faqAnswer: {
      fontFamily: Tokens.typography.families.regular,
      fontSize: 14,
      lineHeight: 20,
    },
    emptyText: {
      textAlign: 'center',
      paddingVertical: 12,
      fontSize: 14,
      fontFamily: Tokens.typography.families.regular,
    },
  });
