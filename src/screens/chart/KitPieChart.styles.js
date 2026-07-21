import { StyleSheet } from 'react-native';

export const createStyles = (colors, isDarkMode) => StyleSheet.create({
  container: {
    backgroundColor: colors.card,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    margin: 10,
    borderRadius: 12,
    minHeight: 260,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: isDarkMode ? 0.3 : 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  center: {
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 10,
    color: colors.textPrimary,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 14,
    color: colors.textSecondary,
  },
  errorText: {
    color: colors.danger,
    fontWeight: '500',
    textAlign: 'center',
    paddingHorizontal: 15,
  },
  noDataText: {
    color: colors.textTertiary,
    fontSize: 14,
    marginTop: 20,
  }
});
