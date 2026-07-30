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
    },
    sectionTitle: {
      fontSize: 13,
      textTransform: 'uppercase',
      fontFamily: Tokens.typography.families.semiBold,
      marginBottom: 8,
      marginTop: 20,
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
  });
