import { StyleSheet } from 'react-native';

export const createStyles = (colors, isDarkMode) => StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  container: {
    marginHorizontal: 10,
    marginTop: 20,
  },
  centerContainer: {
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // Neumorphic segmented toggle — inset well container
  toggleBar: {
    flexDirection: 'row',
    backgroundColor: colors.bg,
    borderRadius: 16,
    padding: 4,
    marginBottom: 16,
    // Neumorphic inset simulation
    borderWidth: 1,
    borderColor: 'rgba(163, 177, 198, 0.2)',
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 12,
  },
  activeToggleButton: {
    backgroundColor: colors.bg,
    // Neumorphic small extruded — pops out of the inset well
    shadowColor: 'rgb(163, 177, 198)',
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: isDarkMode ? 0.7 : 0.5,
    shadowRadius: 8,
    elevation: 4,
  },
  toggleText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textTertiary,
  },
  activeToggleText: {
    color: '#6C63FF',
    fontWeight: '700',
  },
  listPadding: {
    paddingBottom: 10,
  },
  // Neumorphic trip card
  card: {
    backgroundColor: colors.bg,
    borderRadius: 24,
    padding: 18,
    marginBottom: 14,
    position: 'relative',
    // Neumorphic extruded
    shadowColor: 'rgb(163, 177, 198)',
    shadowOffset: { width: 6, height: 6 },
    shadowOpacity: isDarkMode ? 0.7 : 0.55,
    shadowRadius: 14,
    elevation: 6,
  },
  // Left accent stripe
  cardAccentStripe: {
    position: 'absolute',
    left: 0,
    top: 16,
    bottom: 16,
    width: 4,
    borderRadius: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
    paddingLeft: 12,
  },
  headerRightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  locationTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.textPrimary,
    letterSpacing: -0.2,
  },
  // Status badge — small neumorphic pill
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    backgroundColor: colors.bg,
    // Small extruded
    shadowColor: 'rgb(163, 177, 198)',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 2,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'capitalize',
  },
  editButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    backgroundColor: colors.bg,
    // Small extruded
    shadowColor: 'rgb(163, 177, 198)',
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 3,
  },
  editButtonText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#6C63FF',
  },
  subtext: {
    fontSize: 13,
    color: colors.textSecondary,
    marginBottom: 10,
    paddingLeft: 12,
  },
  divider: {
    height: 1,
    backgroundColor: colors.divider,
    marginVertical: 12,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 12,
  },
  label: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.textTertiary,
    marginBottom: 3,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  dateText: {
    fontSize: 12,
    color: colors.textPrimary,
    fontWeight: '600',
  },
  rightAlign: {
    alignItems: 'flex-end',
  },
  priceText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#6C63FF',
  },
  errorText: {
    color: '#E53E3E',
    fontWeight: '500',
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 30,
  },
  emptyText: {
    color: colors.textSecondary,
    fontSize: 13,
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(224, 229, 236, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 24,
  }
});
