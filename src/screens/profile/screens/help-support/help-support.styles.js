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
    sectionTitle: {
      fontSize: 13,
      textTransform: 'uppercase',
      fontFamily: Tokens.typography.families.semiBold,
      marginBottom: 4,
      marginTop: 10,
    },
    card: {
      borderRadius: 16,
      overflow: 'hidden',
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 16,
    },
    rowLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
    },
    label: {
      fontSize: 15,
      fontFamily: Tokens.typography.families.medium,
    },
    contactFormContainer: {
      gap: 12,
    },
    contactCard: {
      borderRadius: 16,
      padding: 16,
      gap: 12,
    },
    input: {
      borderWidth: 1,
      borderRadius: 12,
      padding: 12,
      height: 100,
      textAlignVertical: 'top',
      fontSize: 14,
      fontFamily: Tokens.typography.families.regular,
    },
    sendButton: {
      height: 48,
      borderRadius: 12,
      justifyContent: 'center',
      alignItems: 'center',
    },
    sendButtonText: {
      color: '#FFFFFF',
      fontFamily: Tokens.typography.families.semiBold,
      fontSize: 15,
    },
  });
