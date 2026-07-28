import { StyleSheet } from 'react-native';

export const createStyles = (colors, isDarkMode) => StyleSheet.create({
  container: {
    backgroundColor: colors.bg,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 24,
    paddingHorizontal: 16,
    margin: 10,
    borderRadius: 32,
    minHeight: 280,
    // Neumorphic extruded
    shadowColor: 'rgb(163, 177, 198)',
    shadowOffset: { width: 6, height: 6 },
    shadowOpacity: isDarkMode ? 0.8 : 0.6,
    shadowRadius: 16,
    elevation: 8,
  },
  center: {
    justifyContent: 'center',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.textPrimary,
    letterSpacing: -0.3,
  },
  subtitle: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.textSecondary,
    marginBottom: 12,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 14,
    color: colors.textSecondary,
  },
  errorText: {
    color: '#E53E3E',
    fontWeight: '500',
    textAlign: 'center',
    paddingHorizontal: 15,
  },
  noDataText: {
    color: colors.textTertiary,
    fontSize: 14,
    marginTop: 20,
  },
  // Custom legend styles
  legendContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 16,
    marginTop: 16,
    paddingHorizontal: 8,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    backgroundColor: colors.bg,
    // Small extruded
    shadowColor: 'rgb(163, 177, 198)',
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 2,
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  legendText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  legendCount: {
    fontSize: 12,
    fontWeight: '800',
    color: colors.textPrimary,
  },
});
