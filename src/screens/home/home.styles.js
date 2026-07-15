import { StyleSheet, Dimensions } from 'react-native';
import { Tokens } from '../../theme/theme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
export const CAROUSEL_WIDTH = SCREEN_WIDTH - Tokens.layout.paddingHorizontal * 2 - 32;

export const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: '#000000',
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
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Tokens.gaps.large,
  },
  screenHeaderTitleMainText: {
    fontFamily: Tokens.typography.families.semiBold,
    fontSize: 20,
    lineHeight: 24,
    color: '#FFFFFF',
  },
  headerSquareActionButtonsGridWrapperRow: {
    flexDirection: 'row',
    gap: Tokens.gaps.large,
  },
  squareHeaderActionButtonItem: {
    width: 40,
    height: 40,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#323537',
    justifyContent: 'center',
    alignItems: 'center',
  },
  postCardOuterFrame: {
    width: '100%',
    borderRadius: 20,
    borderWidth: 0.5,
    borderColor: '#323537',
    padding: 16,
    marginBottom: Tokens.gaps.xlarge,
  },
  imageDisplayContainer: {
    width: '100%',
    height: 389,
    borderRadius: 16,
    backgroundColor: '#1A1C1D',
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  indicatorDotInactive: {
    width: 8,
    height: 8,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
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
    color: '#E5E5E5',
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
    color: '#CCCCCC',
  },
});
