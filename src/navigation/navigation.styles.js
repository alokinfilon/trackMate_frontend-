import { StyleSheet } from 'react-native';
import { Tokens } from '../theme/theme';

export const createNavigationStyles = (colors) => StyleSheet.create({
  safeAreaWrapper: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  placeholderWrapper: {
    flex: 1,
    backgroundColor: colors.bg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderText: {
    color: colors.textPrimary,
    fontSize: 24,
    fontWeight: '900',
  },
  bottomNavigation: {
    height: 78,
    paddingTop: 8,
    paddingBottom: 16,
    paddingHorizontal: 5,
    backgroundColor: colors.bg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    // Neumorphic: remove border, use upward shadow
    borderTopWidth: 0,
    shadowColor: 'rgb(163, 177, 198)',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 12,
    position: 'relative',
  },
  bottomItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    height: '100%',
    position: 'relative',
  },
  topLineContainer: {
    position: 'absolute',
    top: -9,
    left: 0,
    right: 0,
    height: 3,
    alignItems: "center",
  },
  bottomItemLabel: {
    color: colors.textSecondary,
    fontSize: 12,
    fontFamily: Tokens.typography.families.regular,
    textAlign: 'center',
  },
  activeBottomItemLabel: {
    fontSize: 12,
    fontFamily: Tokens.typography.families.regular,
  }
});
