import { StyleSheet, Dimensions } from 'react-native';
import { Tokens } from '../../theme/theme';

const { width } = Dimensions.get('window');
const TOTAL_PADDINGS = Tokens.layout.paddingHorizontal * 2;
const TAB_CONTAINER_WIDTH = width - TOTAL_PADDINGS;
const EXACT_TAB_WIDTH = (TAB_CONTAINER_WIDTH - (4 * 2)) / 3;
const SINGLE_ROW_CHIP_WIDTH = (width - TOTAL_PADDINGS - Tokens.gaps.small * 5) / 7;
const RECOMMENDATION_CARD_WIDTH = (width - TOTAL_PADDINGS - Tokens.gaps.small * 2) / 3;

export const CAROUSEL_WIDTH = width - TOTAL_PADDINGS;
export const feedbackIconSize = Tokens.scaleAsset(12);

export const createStyles = (colors) => StyleSheet.create({
  categoryText: {
    fontSize: Tokens.typography.sizes.body,
    color: colors.textSecondary,
    marginTop: 4,
    fontFamily: Tokens.typography.families.regular,
  },
  heroImageWrapper: {
    marginTop: 10,
    borderWidth: 4,
    borderColor: colors.border
  },
  heroImageContent: {
    width: '100%',
    height: 389,
    borderRadius: 12,
  },
  sectionContainer: {
    paddingHorizontal: 16,
    marginTop: 20,
  },
  descriptionText: {
    fontSize: Tokens.typography.sizes.body,
    color: colors.textSecondary,
    fontFamily: Tokens.typography.families.regular,
    lineHeight: 22,
  },
  ratingText: {
    fontSize: Tokens.typography.sizes.body,
    color: colors.danger,
    fontFamily: Tokens.typography.families.semiBold,
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: Tokens.typography.sizes.button,
    color: colors.textPrimary,
    fontFamily: Tokens.typography.families.medium,
    marginBottom: 4,
  },
  sectionBodyText: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 8,
    color: colors.textSecondary,
  },
  gallerySectionContainer: {
  },
  galleryTitle: {
    fontSize: Tokens.typography.sizes.h3,
    color: colors.textPrimary,
    fontFamily: Tokens.typography.families.bold,
    marginHorizontal: 16,
    marginBottom: 12,
  },
  galleryImage: {
    width: "auto",
    height: 250,
    borderRadius: 12,
  },
  screenContainer: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  mainContainer: {
    flex: 1,
    width: '100%',
  },
  scrollContentContainer: {
    paddingHorizontal: Tokens.layout.paddingHorizontal,
    paddingTop: Tokens.gaps.medium,
    paddingBottom: 40,
  },
  backHeaderView: {
    width: '100%',
    height: 40,
    paddingHorizontal: Tokens.layout.paddingHorizontal,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButtonView: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Tokens.gaps.small,
    height: '100%',
  },
  backButtonText: {
    fontFamily: Tokens.typography.families.medium,
    fontSize: Tokens.typography.sizes.body,
    color: colors.textPrimary,
  },
  headerView: {
    width: '100%',
    gap: Tokens.gaps.small,
    marginBottom: Tokens.gaps.large,
  },
  productTitleText: {
    fontFamily: Tokens.typography.families.semiBold,
    fontSize: Tokens.typography.sizes.title,
    lineHeight: Tokens.typography.lineHeights.title,
    color: colors.textPrimary,
  },
  productSubtitleText: {
    fontFamily: Tokens.typography.families.regular,
    fontSize: Tokens.typography.sizes.body,
    lineHeight: Tokens.typography.lineHeights.body,
    color: colors.textSecondary,
  },
  postBoxView: {
    width: '100%',
    height: 389,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: colors.card,
    position: 'relative',
    marginBottom: Tokens.gaps.large,
  },
 
  ImageCarousel: {
    position: 'absolute',
    bottom: 12,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    gap: Tokens.gaps.small,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  indicatorDotInactive: {
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 1.25,
    borderColor: '#CCCCCC',
  },
  indicatorDotActive: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  priceView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: Tokens.gaps.xlarge,
  },
  priceText: {
    fontFamily: Tokens.typography.families.semiBold,
    fontSize: 16,
    lineHeight: 26,
    color: colors.textPrimary,
  },
  excludingExtrasLabel: {
    fontFamily: Tokens.typography.families.regular,
    fontSize: 16,
    color: colors.textSecondary,
  },
 
  controlRowView: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Tokens.gaps.large,
    width: '100%',
    paddingVertical: 4,
  },
 
  Divider: {
    width: '100%',
    height: 0,
    borderTopWidth: 1,
    borderColor: colors.border,
    marginVertical: Tokens.gaps.large,
  },
  Divider1: {
    width: '100%',
    height: 0,
    borderTopWidth: 1,
    borderColor: colors.border,
    marginVertical: Tokens.gaps.large,
  },
  SelectionView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  SelectionText: {
    fontFamily: Tokens.typography.families.semiBold,
    fontSize: 16,
    color: colors.textPrimary,
    marginBottom: Tokens.gaps.xlarge,
  },

  buttonGroupBox: {
    width: '100%',
    gap: Tokens.gaps.large,
    marginTop: 8,
  },

  tabView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    height: 50,
    marginTop: Tokens.gaps.xlarge,
    marginBottom: Tokens.gaps.large,
    gap: 2,
    borderColor: colors.border,
    borderWidth: 2,
    borderRadius: 8,
    backgroundColor: colors.card
  },
  buttonWrapper: {
    width: EXACT_TAB_WIDTH,
    height: 42,
  },
  activeBorderGradientView: {
    flex: 1,
    padding: 1,
    borderRadius: 9,
    overflow: 'hidden',
  },
  activeSolidBackgroundMaskShield: {
    flex: 1,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: colors.card,
  },
  activeGredientView: {
    flex: 1,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 0, 
    borderWidth: 2,
    borderColor: colors.border
  },
  activeGredientView1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 2,
  },
  categoryTabText: {
    fontFamily: Tokens.typography.families.medium,
    fontSize: 13, 
    color: colors.textPrimary,
    textAlign: 'center',
  },
  categoryTabText1: {
    fontFamily: Tokens.typography.families.medium,
    fontSize: 13, 
    color: colors.textPrimary,
    textAlign: 'center',
  },
  tabInfoView: {
    width: '100%',
    gap: Tokens.gaps.xlarge,
    paddingVertical: 4,
    
  },
  tabInfoView2: {
    width: '100%',
    gap: Tokens.gaps.large,
    paddingVertical: 4,
  },
  tabInfoView1: {
    width: '100%',
    gap: 6,
  },
  tabText1: {
    fontFamily: Tokens.typography.families.semiBold,
    fontSize: 13,
    color: colors.textPrimary,
  },
  tabText2: {
    fontFamily: Tokens.typography.families.light,
    fontSize: 13,
    lineHeight: Tokens.typography.lineHeights.body,
    color: colors.textSecondary,
  },
  refundPolicyText: {
    textDecorationLine: 'underline',
    color: colors.primary,
    fontFamily: Tokens.typography.families.medium,
    fontSize: 13,
  },
  recommendationView: {
    width: '100%',
    gap: Tokens.gaps.large,
    marginTop: Tokens.gaps.section,
  },
  recommendationText: {
    fontFamily: Tokens.typography.families.semiBold,
    fontSize: 20,
    lineHeight: 25,
    color: colors.textPrimary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  recommendationPRoductView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  recommendationCardsView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  recommendationItem: {
    width: RECOMMENDATION_CARD_WIDTH,
    height: 138,
    borderRadius: 12,
    backgroundColor: colors.surface,
    overflow: 'hidden',
  },
  recommendationImage: {
    width: '100%',
    height: '100%',
  },
  labelText: {
    color: colors.textPrimary,
    fontFamily: Tokens.typography.families.medium,
  },
  answerText: {
    fontWeight: '400',
    color: colors.textSecondary,
  },
  subLocationCarouselContent: {
    paddingVertical: 4,
    gap: Tokens.gaps.large,
  },
  subLocationCard: {
    width: (width - TOTAL_PADDINGS - Tokens.gaps.large) / 2, 
    borderRadius: 12,
    backgroundColor: colors.surface,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
  },
  subLocationImage: {
    width: '100%',
    height: 120,
    resizeMode: 'cover',
  },
  subLocationTextContainer: {
    padding: 10,
  },
  subLocationTitle: {
    fontFamily: Tokens.typography.families.semiBold,
    fontSize: 14,
    color: colors.textPrimary,
    marginBottom: 4,
  },
  subLocationDesc: {
    fontFamily: Tokens.typography.families.regular,
    fontSize: 12,
    color: colors.textSecondary,
  },
  addTripBtn: {
    backgroundColor: colors.primary,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginHorizontal: 16,
    marginVertical: 20,
  },
  addTripBtnText: {
    color: colors.textOnPrimary,
    fontFamily: Tokens.typography.families.semiBold,
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    width: '100%',
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  modalTitle: {
    fontFamily: Tokens.typography.families.bold,
    fontSize: 20,
    color: colors.textPrimary,
    marginBottom: 16,
    textAlign: 'center',
  },
  modalInput: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 12,
    color: colors.textPrimary,
    fontFamily: Tokens.typography.families.regular,
  },
  modalActionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  modalBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelBtn: {
    backgroundColor: colors.surface,
    marginRight: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  confirmBtn: {
    backgroundColor: colors.primary,
    marginLeft: 8,
  },
  cancelBtnText: {
    color: colors.textPrimary,
    fontFamily: Tokens.typography.families.semiBold,
  },
  confirmBtnText: {
    color: colors.textOnPrimary,
    fontFamily: Tokens.typography.families.semiBold,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  checkboxOuter: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: colors.textTertiary,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxOuterSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.primary,
  },
  checkboxInner: {
    width: 10,
    height: 10,
    backgroundColor: colors.textOnPrimary,
    borderRadius: 2,
  },
  checkboxLabel: {
    fontFamily: Tokens.typography.families.regular,
    fontSize: 14,
    color: colors.textPrimary,
    flex: 1,
  }
});