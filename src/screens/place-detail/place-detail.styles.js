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
    borderRadius: 20,
    overflow: 'hidden',
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
    color: '#E53E3E',
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
    borderRadius: 16,
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
    fontWeight: '800',
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
    backgroundColor: colors.bg,
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
    backgroundColor: 'rgba(61, 72, 82, 0.5)',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  indicatorDotInactive: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: 'rgba(224, 229, 236, 0.3)',
    borderWidth: 1,
    borderColor: 'rgba(224, 229, 236, 0.5)',
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
    borderColor: colors.divider,
    marginVertical: Tokens.gaps.large,
  },
  Divider1: {
    width: '100%',
    height: 0,
    borderTopWidth: 1,
    borderColor: colors.divider,
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

  // Neumorphic tab bar — inset well
  tabView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    height: 50,
    marginTop: Tokens.gaps.xlarge,
    marginBottom: Tokens.gaps.large,
    gap: 2,
    borderRadius: 16,
    backgroundColor: colors.bg,
    // Inset well simulation
    borderWidth: 1,
    borderColor: 'rgba(163, 177, 198, 0.2)',
    padding: 4,
  },
  buttonWrapper: {
    width: EXACT_TAB_WIDTH,
    height: 42,
  },
  activeBorderGradientView: {
    flex: 1,
    padding: 1,
    borderRadius: 12,
    overflow: 'hidden',
  },
  activeSolidBackgroundMaskShield: {
    flex: 1,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: colors.bg,
  },
  activeGredientView: {
    flex: 1,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 0,
    backgroundColor: colors.bg,
    // Neumorphic extruded tab
    shadowColor: 'rgb(163, 177, 198)',
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 6,
    elevation: 3,
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
    color: colors.textSecondary,
    textAlign: 'center',
  },
  categoryTabText1: {
    fontFamily: Tokens.typography.families.medium,
    fontSize: 13, 
    color: '#6C63FF',
    textAlign: 'center',
    fontWeight: '700',
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
    color: '#6C63FF',
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
    borderRadius: 16,
    backgroundColor: colors.bg,
    overflow: 'hidden',
    // Neumorphic extruded small
    shadowColor: 'rgb(163, 177, 198)',
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 4,
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
    borderRadius: 16,
    backgroundColor: colors.bg,
    overflow: 'hidden',
    // Neumorphic extruded
    shadowColor: 'rgb(163, 177, 198)',
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,
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
  // Neumorphic CTA button
  addTripBtn: {
    backgroundColor: '#6C63FF',
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: 'center',
    marginHorizontal: 16,
    marginVertical: 20,
    // Neumorphic extruded
    shadowColor: 'rgb(163, 177, 198)',
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.6,
    shadowRadius: 10,
    elevation: 6,
  },
  addTripBtnText: {
    color: '#FFFFFF',
    fontFamily: Tokens.typography.families.semiBold,
    fontSize: 16,
    fontWeight: '700',
  },
  // Neumorphic modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(61, 72, 82, 0.55)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    width: '100%',
    backgroundColor: colors.bg,
    borderRadius: 32,
    padding: 24,
    // Neumorphic extruded
    shadowColor: 'rgb(163, 177, 198)',
    shadowOffset: { width: 8, height: 8 },
    shadowOpacity: 0.7,
    shadowRadius: 20,
    elevation: 12,
  },
  modalTitle: {
    fontFamily: Tokens.typography.families.semiBold,
    fontSize: 20,
    color: colors.textPrimary,
    marginBottom: 16,
    textAlign: 'center',
    fontWeight: '800',
  },
  modalInput: {
    backgroundColor: colors.bg,
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 12,
    color: colors.textPrimary,
    fontFamily: Tokens.typography.families.regular,
    // Inset well
    borderWidth: 1,
    borderColor: 'rgba(163, 177, 198, 0.25)',
  },
  modalActionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
    gap: 12,
  },
  modalBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 16,
    alignItems: 'center',
    // Neumorphic extruded small
    shadowColor: 'rgb(163, 177, 198)',
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 4,
  },
  cancelBtn: {
    backgroundColor: colors.bg,
    marginRight: 0,
  },
  confirmBtn: {
    backgroundColor: '#6C63FF',
    marginLeft: 0,
  },
  cancelBtnText: {
    color: colors.textPrimary,
    fontFamily: Tokens.typography.families.semiBold,
  },
  confirmBtnText: {
    color: '#FFFFFF',
    fontFamily: Tokens.typography.families.semiBold,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
  },
  checkboxOuter: {
    width: 20,
    height: 20,
    borderRadius: 8,
    backgroundColor: colors.bg,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(163, 177, 198, 0.3)',
  },
  checkboxOuterSelected: {
    borderColor: '#6C63FF',
    backgroundColor: '#6C63FF',
  },
  checkboxInner: {
    width: 10,
    height: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 3,
  },
  checkboxLabel: {
    fontFamily: Tokens.typography.families.regular,
    fontSize: 14,
    color: colors.textPrimary,
    flex: 1,
  }
});