import { StyleSheet } from 'react-native';
import { Tokens } from '../../../../theme/theme';

export const createStyles = (colors, isDarkMode) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    centerContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
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
    avatarWrap: {
      alignSelf: 'center',
      position: 'relative',
      marginBottom: 10,
    },
    avatar: {
      width: 90,
      height: 90,
      borderRadius: 45,
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden',
    },
    avatarInitial: {
      fontSize: 32,
      fontWeight: '800',
    },
    editAvatarBtn: {
      position: 'absolute',
      bottom: 0,
      right: 0,
      width: 32,
      height: 32,
      borderRadius: 16,
      backgroundColor: '#FFFFFF',
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1.5,
      borderColor: '#E2E8F0',
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    inputGroup: {
      gap: 8,
    },
    label: {
      fontFamily: Tokens.typography.families.medium,
      fontSize: 14,
    },
    input: {
      height: 52,
      borderRadius: 12,
      borderWidth: 1,
      paddingHorizontal: 16,
      fontSize: 15,
      fontFamily: Tokens.typography.families.regular,
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
