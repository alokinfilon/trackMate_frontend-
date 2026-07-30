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
      padding: 20,
      gap: 16,
    },
    sectionTitle: {
      fontSize: 13,
      textTransform: 'uppercase',
      fontFamily: Tokens.typography.families.semiBold,
      marginBottom: 4,
    },
    cardContainer: {
      borderRadius: 16,
      padding: 20,
      borderWidth: 1,
      gap: 16,
    },
    cardHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    cardHeaderLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
    },
    cardName: {
      fontFamily: Tokens.typography.families.semiBold,
      fontSize: 16,
    },
    removeBtn: {
      padding: 4,
    },
    removeBtnText: {
      fontFamily: Tokens.typography.families.medium,
      fontSize: 14,
    },
    cardNumber: {
      fontSize: 18,
      fontFamily: Tokens.typography.families.semiBold,
      letterSpacing: 2,
    },
    cardFooter: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    cardExpiry: {
      fontFamily: Tokens.typography.families.regular,
      fontSize: 13,
    },
    defaultBadge: {
      backgroundColor: '#E6FFFA',
      paddingHorizontal: 10,
      paddingVertical: 4,
      borderRadius: 999,
    },
    defaultText: {
      color: '#319795',
      fontSize: 12,
      fontFamily: Tokens.typography.families.semiBold,
    },
    addButton: {
      height: 52,
      borderRadius: 12,
      borderWidth: 1.5,
      borderStyle: 'dashed',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 8,
      marginTop: 10,
    },
    addButtonText: {
      fontFamily: Tokens.typography.families.semiBold,
      fontSize: 15,
    },
  });
