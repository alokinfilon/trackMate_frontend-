import { StyleSheet, Dimensions } from 'react-native';
import { Tokens } from '../../theme/theme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
export const CAROUSEL_WIDTH = SCREEN_WIDTH - Tokens.layout.paddingHorizontal * 2 - 32;

export const createStyles = (colors) => StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  mainContainer: {
    flex: 1,
    width: '100%',
  },
  centerSpinnerLoaderViewFrame: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  socialFeedScrollContentContainerSpacingPadding: {
    paddingHorizontal: Tokens.layout.paddingHorizontal,
    paddingBottom: 40,
  },
  headerContainerWrapper: {
    paddingTop: Tokens.gaps.large,
  },
  topNavigationHeaderModuleOuterContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Tokens.gaps.large,
    height: 60,
    borderRadius: 32,
    backgroundColor: colors.bg,
    // Neumorphic extruded
    shadowColor: 'rgb(163, 177, 198)',
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.6,
    shadowRadius: 12,
    elevation: 6,
  },
  screenHeaderTitleMainText: {
    fontFamily: Tokens.typography.families.semiBold,
    fontSize: 24,
    lineHeight: 24,
    color: colors.textPrimary,
  },
  headerSquareActionButtonsGridWrapperRow: {
    flexDirection: 'row',
    gap: Tokens.gaps.large,
  },
  squareHeaderActionButtonItem: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: colors.bg,
    justifyContent: 'center',
    alignItems: 'center',
    // Neumorphic small extruded
    shadowColor: 'rgb(163, 177, 198)',
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 6,
    elevation: 3,
  },
  postCardOuterFrame: {
    width: '100%',
    borderRadius: 32,
    padding: 16,
    marginBottom: Tokens.gaps.xlarge,
    backgroundColor: colors.bg,
    // Neumorphic extruded
    shadowColor: 'rgb(163, 177, 198)',
    shadowOffset: { width: 6, height: 6 },
    shadowOpacity: 0.6,
    shadowRadius: 16,
    elevation: 8,
  },
  imageDisplayContainer: {
    width: '100%',
    height: 389,
    borderRadius: 20,
    backgroundColor: colors.surface,
    overflow: 'hidden',
    position: 'relative',
    marginBottom: Tokens.gaps.large,
  },
  mainPostMediaImage: {
    width: CAROUSEL_WIDTH,
    height: '100%',
  },
  mediaCarouselIndicatorTrack: {
    position: 'absolute',
    bottom: 12,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    gap: Tokens.gaps.small,
    backgroundColor: 'rgba(61, 72, 82, 0.5)',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  indicatorDotInactive: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(224, 229, 236, 0.3)',
    borderWidth: 1,
    borderColor: 'rgba(224, 229, 236, 0.5)',
  },
  indicatorDotActive: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  postContentContainerDescriptionBlock: {
    width: '100%',
    gap: Tokens.gaps.large,
    marginBottom: Tokens.gaps.large,
  },
  descriptionHeaderTitleWrapperRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    width: '100%',
    gap: Tokens.gaps.small,
  },
  mainDescriptionTitleText: {
    fontFamily: Tokens.typography.families.semiBold,
    fontSize: 18,
    lineHeight: 28,
    color: colors.textPrimary,
    flex: 1,
  },
  individualMetricTabItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Tokens.gaps.small,
    marginRight: Tokens.gaps.xlarge,
  },
  metricLabelValueStringText: {
    fontFamily: Tokens.typography.families.regular,
    fontSize: 14,
    color: colors.textSecondary,
  },
});
