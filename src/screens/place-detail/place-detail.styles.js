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



export const styles = StyleSheet.create({
  categoryText: {
    fontSize: Tokens.typography.sizes.body,
    color: '#3b3b3b',
    marginTop: 4,
    fontFamily: Tokens.typography.families.regular,
  },
  heroImageWrapper: {
    marginTop: 10,
    borderWidth:4
  },
  heroImageContent: {
    width: '100%',
    height: 389,
    borderRadius: 12,
  },
  sectionContainer: {
    paddingHorizontal: 16,
    marginTop: 20,
    //borderWidth:2
  },
  descriptionText: {
    fontSize: Tokens.typography.sizes.body,
    color: '#333',
    fontFamily: Tokens.typography.families.regular,
    lineHeight: 22,
  },
  ratingText: {
    fontSize: Tokens.typography.sizes.body,
    color: '#eb2a08',
    fontFamily: Tokens.typography.families.semiBold,
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: Tokens.typography.sizes.button,
    color: '#000',
    fontFamily: Tokens.typography.families.medium,
    marginBottom: 4,
  },
  sectionBodyText: {
    fontSize: Tokens.typography.sizes.body,
    color: '#171717',
  },
  gallerySectionContainer: {
    //marginTop: 20,
  },
  galleryTitle: {
    fontSize: Tokens.typography.sizes.h3,
    color: '#000',
    fontFamily: Tokens.typography.families.bold,
    marginHorizontal: 16,
    marginBottom: 12,
  },
  galleryImage: {
    width: CAROUSEL_WIDTH,
    height: 250,
    borderRadius: 12,
    //marginHorizontal: 8,
    width:"auto"
  },
  screenContainer: {
    flex: 1,
    backgroundColor: '#000000',
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
    color: '#000000',
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
    color: '#000000',
  },
  productSubtitleText: {
    fontFamily: Tokens.typography.families.regular,
    fontSize: Tokens.typography.sizes.body,
    lineHeight: Tokens.typography.lineHeights.body,
    color: '#000000',
  },
  postBoxView: {
    width: '100%',
    height: 389,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#1E1E20',
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
    color: '#000000',
  },
  excludingExtrasLabel: {
    fontFamily: Tokens.typography.families.regular,
    fontSize: 16,
    color: '#000000',
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
    borderColor: '#323537',
    marginVertical: Tokens.gaps.large,
  },
  Divider1: {
    width: '100%',
    height: 0,
    borderTopWidth: 0,
    borderColor: '#000000',
    marginVertical: Tokens.gaps.large,
  },
  SelectionView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  SelectionText: {
    fontFamily: Tokens.typography.families.semiBold,
    fontSize: 16,
    color: '#000000',
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
    //borderWidth:2,
    borderColor:"#000000",
    borderWidth:2,
    borderRadius:8,
    backgroundColor:"#ffff"
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
    backgroundColor: '#ffffff',
  },
  activeGredientView: {
    flex: 1,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 0, 
    borderWidth:2
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
    color: '#000000',
    textAlign: 'center',
  },
  categoryTabText1: {
    fontFamily: Tokens.typography.families.medium,
    fontSize: 13, 
    color: '#000000',
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
    color: '#000000',
  },
  tabText2: {
    fontFamily: Tokens.typography.families.light,
    fontSize: 13,
    lineHeight: Tokens.typography.lineHeights.body,
    color: '#000000',
  },
  refundPolicyText: {
    textDecorationLine: 'underline',
    color: '#04a7f9',
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
    color: '#000000',
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
    backgroundColor: '#FFF3E8',
    overflow: 'hidden',
  },
  recommendationImage: {
    width: '100%',
    height: '100%',
  },
   sectionBodyText: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 8,
    color: '#333333', // Fallback color
  },
  labelText: {
           // Bold styling for labels
    color: '#000000',        // Darker contrast tint
    fontFamily: Tokens.typography.families.medium,  // Or use your premium custom font asset
  },
  answerText: {
    fontWeight: '400',       // Normal weight for values
    color: '#181818',        // Softer slate color for readability
  },
});