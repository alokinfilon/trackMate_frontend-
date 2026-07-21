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
    backgroundColor: colors.card,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: colors.border,
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
