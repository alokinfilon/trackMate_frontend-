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
    card: {
      borderRadius: 16,
      padding: 20,
      height: 160,
      justifyContent: 'space-between',
      elevation: 4,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 8,
    },
    cardHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    cardLabel: {
      color: 'rgba(255,255,255,0.7)',
      fontFamily: Tokens.typography.families.semiBold,
      fontSize: 12,
      letterSpacing: 1,
    },
    cardBody: {
      gap: 4,
    },
    cardTitle: {
      color: '#FFFFFF',
      fontFamily: Tokens.typography.families.semiBold,
      fontSize: 22,
    },
    cardText: {
      color: 'rgba(255,255,255,0.85)',
      fontFamily: Tokens.typography.families.regular,
      fontSize: 13,
    },
    sectionTitle: {
      fontSize: 13,
      textTransform: 'uppercase',
      fontFamily: Tokens.typography.families.semiBold,
      marginBottom: 4,
      marginTop: 16,
    },
    groupCard: {
      borderRadius: 16,
      overflow: 'hidden',
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 16,
    },
    rowLabel: {
      fontFamily: Tokens.typography.families.medium,
      fontSize: 15,
    },
    rowValue: {
      fontFamily: Tokens.typography.families.regular,
      fontSize: 14,
    },
    invoiceDate: {
      fontFamily: Tokens.typography.families.medium,
      fontSize: 15,
    },
    invoiceId: {
      fontFamily: Tokens.typography.families.regular,
      fontSize: 12,
      marginTop: 2,
    },
    invoiceAmount: {
      fontFamily: Tokens.typography.families.semiBold,
      fontSize: 16,
    },
  });
