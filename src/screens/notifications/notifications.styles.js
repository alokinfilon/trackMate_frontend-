import { StyleSheet, Platform } from 'react-native';
import { Tokens } from '../../theme/theme';

export const createStyles = (colors, isDarkMode) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDarkMode ? colors.bg : '#FFFFFF',
    },

    // ── Header Section ────────────────────────────────────────────────────────
    headerContainer: {
      paddingHorizontal: 24,
      paddingTop: Platform.OS === 'ios' ? 10 : 20,
      paddingBottom: 18,
      borderBottomWidth: 1,
      borderBottomColor: isDarkMode ? '#1E293B' : '#F1F5F9',
    },
    headerTopRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 6,
    },
    headerTitle: {
      fontSize: 32,
      fontFamily: Tokens.typography.families.semiBold,
      color: colors.textPrimary,
      letterSpacing: -0.5,
    },
    backButton: {
      width: 44,
      height: 44,
      borderRadius: 22,
      backgroundColor: isDarkMode ? colors.card : '#F3F4F6',
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 12,
    },
    settingsBtn: {
      width: 44,
      height: 44,
      borderRadius: 22,
      backgroundColor: isDarkMode ? colors.card : '#FFFFFF',
      borderWidth: 1.5,
      borderColor: isDarkMode ? colors.border : '#000000',
      alignItems: 'center',
      justifyContent: 'center',
    },
    subtitleText: {
      fontSize: 14,
      fontFamily: Tokens.typography.families.medium,
      color: '#9CA3AF',
      marginTop: 4,
    },
    subtitleHighlight: {
      color: '#FF6B35',
      fontFamily: Tokens.typography.families.semiBold,
    },

    // ── Section List ──────────────────────────────────────────────────────────
    listContent: {
      paddingBottom: 40,
    },
    sectionHeader: {
      paddingHorizontal: 24,
      paddingTop: 24,
      paddingBottom: 10,
    },
    sectionHeaderText: {
      fontSize: 16,
      fontFamily: Tokens.typography.families.semiBold,
      color: colors.textPrimary,
    },

    // ── Notification Row ──────────────────────────────────────────────────────
    rowContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 24,
      paddingVertical: 14,
      justifyContent: 'space-between',
    },
    rowLeftSection: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
      gap: 12,
    },
    unreadDot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: '#EF4444',
      marginRight: -4,
    },
    unreadPlaceholder: {
      width: 8,
      marginRight: -4,
    },
    avatarContainer: {
      position: 'relative',
      width: 52,
      height: 52,
    },
    avatarImage: {
      width: 52,
      height: 52,
      borderRadius: 26,
      backgroundColor: isDarkMode ? '#2D3748' : '#F3F4F6',
    },
    avatarPlaceholder: {
      width: 52,
      height: 52,
      borderRadius: 26,
      backgroundColor: isDarkMode ? '#2D3748' : '#F3F4F6',
      alignItems: 'center',
      justifyContent: 'center',
    },
    typeBadge: {
      position: 'absolute',
      top: -2,
      right: -2,
      width: 20,
      height: 20,
      borderRadius: 10,
      backgroundColor: '#FFFFFF',
      alignItems: 'center',
      justifyContent: 'center',
      ...Platform.select({
        ios: {
          shadowColor: '#000000',
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.2,
          shadowRadius: 1.5,
        },
        android: {
          elevation: 2,
        },
      }),
    },
    typeBadgeEmoji: {
      fontSize: 11,
    },
    textContainer: {
      flex: 1,
      justifyContent: 'center',
    },
    bodyText: {
      fontSize: 14,
      fontFamily: Tokens.typography.families.regular,
      color: colors.textSecondary,
      lineHeight: 18,
    },
    boldName: {
      fontFamily: Tokens.typography.families.semiBold,
      color: colors.textPrimary,
    },
    subtitleTextRow: {
      fontSize: 12,
      fontFamily: Tokens.typography.families.regular,
      color: '#9CA3AF',
      marginTop: 2,
    },
    inviteButtonsContainer: {
      flexDirection: 'row',
      gap: 8,
      marginTop: 10,
    },
    actionButton: {
      paddingVertical: 8,
      paddingHorizontal: 16,
      borderRadius: 12,
      alignItems: 'center',
      justifyContent: 'center',
    },
    acceptButton: {
      backgroundColor: '#FF6B35',
    },
    declineButton: {
      backgroundColor: 'transparent',
      borderWidth: 1.5,
      borderColor: isDarkMode ? '#3E4E68' : '#D1D5DB',
    },
    acceptButtonText: {
      color: '#FFFFFF',
      fontSize: 12,
      fontFamily: Tokens.typography.families.semiBold,
    },
    declineButtonText: {
      color: colors.textPrimary,
      fontSize: 12,
      fontFamily: Tokens.typography.families.medium,
    },
    actionedText: {
      fontSize: 12,
      fontFamily: Tokens.typography.families.medium,
      color: '#9CA3AF',
      marginTop: 6,
      fontStyle: 'italic',
    },

    // ── Right preview ─────────────────────────────────────────────────────────
    previewContainer: {
      marginLeft: 12,
    },
    previewImage: {
      width: 50,
      height: 50,
      borderRadius: 8,
      backgroundColor: isDarkMode ? '#2D3748' : '#F3F4F6',
    },
    previewFallback: {
      width: 50,
      height: 50,
      borderRadius: 8,
      backgroundColor: isDarkMode ? 'rgba(8,184,243,0.1)' : '#eef7fe',
      alignItems: 'center',
      justifyContent: 'center',
    },

    // ── Row separator ─────────────────────────────────────────────────────────
    separator: {
      height: StyleSheet.hairlineWidth,
      backgroundColor: isDarkMode ? '#2D3748' : '#F3F4F6',
      marginLeft: 80,
    },

    // ── Empty State ───────────────────────────────────────────────────────────
    emptyWrap: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 40,
      paddingTop: 80,
      gap: 16,
    },
    emptyEmoji: {
      fontSize: 64,
    },
    emptyTitle: {
      fontSize: 18,
      fontFamily: Tokens.typography.families.semiBold,
      color: colors.textPrimary,
      textAlign: 'center',
    },
    emptySubtitle: {
      fontSize: 14,
      fontFamily: Tokens.typography.families.regular,
      color: colors.textSecondary,
      textAlign: 'center',
      lineHeight: 20,
    },
  });
