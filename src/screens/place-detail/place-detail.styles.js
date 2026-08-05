import { StyleSheet, Dimensions, Platform } from 'react-native';
import { Tokens } from '../../theme';

const { width, height } = Dimensions.get('window');
const HERO_HEIGHT = height * 0.48; // Hero height spans ~48% of screen height

export const createStyles = (colors, isDarkMode) => StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: isDarkMode ? '#121212' : '#FFFFFF',
  },
  mainContainer: {
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 110, // Safeguard space for sticky bottom bar
  },

  // ── Hero Section ───────────────────────────────────────────────────────────
  heroWrapper: {
    width: width,
    height: HERO_HEIGHT,
    position: 'relative',
    borderBottomLeftRadius: 44,
    borderBottomRightRadius: 44,
    overflow: 'hidden',
    backgroundColor: isDarkMode ? '#1E1E1E' : '#F3F4F6',
    ...Platform.select({
      ios: {
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 10,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  gradientOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '65%',
  },
  headerButtonsRow: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 50 : 20,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    zIndex: 10,
  },
  circularButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: isDarkMode ? '#2D3748' : '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: isDarkMode ? '#3E4E68' : '#E2E8F0',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  titleOverlay: {
    position: 'absolute',
    left: 20,
    bottom: 24,
    right: 100, // Leave clear gap for floating gallery thumbnails
    zIndex: 5,
  },
  placeTitle: {
    fontSize: 28,
    fontFamily: Tokens.typography.families.semiBold,
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.4)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
    letterSpacing: -0.5,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
    gap: 4,
  },
  locationText: {
    fontSize: 13,
    fontFamily: Tokens.typography.families.medium,
    color: 'rgba(255, 255, 255, 0.85)',
    textShadowColor: 'rgba(0, 0, 0, 0.4)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },

  // ── Floating Gallery Vertical Column ───────────────────────────────────────
  floatingGallery: {
    position: 'absolute',
    right: 20,
    top: HERO_HEIGHT * 0.25,
    gap: 12,
    alignItems: 'center',
    zIndex: 8,
  },
  thumbWrapper: {
    width: 52,
    height: 52,
    borderRadius: 14,
    borderWidth: 2,
    overflow: 'hidden',
    backgroundColor: isDarkMode ? '#1E1E1E' : '#FFFFFF',
    ...Platform.select({
      ios: {
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.12,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  thumbActive: {
    borderColor: '#FF6B35',
  },
  thumbInactive: {
    borderColor: '#FFFFFF',
  },
  thumbImage: {
    width: '100%',
    height: '100%',
  },

  // ── Specs Section ──────────────────────────────────────────────────────────
  specsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 24,
    gap: 10,
  },
  specCard: {
    flex: 1,
    borderRadius: 18,
    borderWidth: 1.5,
    paddingVertical: 14,
    paddingHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: isDarkMode ? '#1E1E1E' : '#FFFFFF',
    borderColor: isDarkMode ? '#2D3748' : '#F1F5F9',
  },
  specLabel: {
    fontSize: 12,
    fontFamily: Tokens.typography.families.medium,
    color: '#9CA3AF',
    marginBottom: 4,
  },
  specValue: {
    fontSize: 15,
    fontFamily: Tokens.typography.families.semiBold,
    color: '#FF6B35', // Accent theme color
  },

  // ── Description Section ────────────────────────────────────────────────────
  descriptionContainer: {
    paddingHorizontal: 20,
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: Tokens.typography.families.semiBold,
    color: colors.textPrimary,
    marginBottom: 8,
  },
  descriptionText: {
    fontSize: 14,
    fontFamily: Tokens.typography.families.regular,
    color: colors.textSecondary,
    lineHeight: 22,
  },
  readMoreBtn: {
    marginTop: 6,
  },
  readMoreText: {
    fontSize: 14,
    fontFamily: Tokens.typography.families.semiBold,
    color: '#FF6B35',
  },

  // ── Details Tabs Area ──────────────────────────────────────────────────────
  tabsContainer: {
    marginTop: 24,
    paddingHorizontal: 20,
  },
  tabButtonsRow: {
    flexDirection: 'row',
    borderBottomWidth: 1.5,
    borderBottomColor: isDarkMode ? '#2D3748' : '#F1F5F9',
    marginBottom: 16,
    justifyContent: 'space-between',
  },
  tabButton: {
    paddingVertical: 8,
    borderBottomWidth: 3,
  },
  tabActiveButton: {
    borderBottomColor: '#FF6B35',
  },
  tabInactiveButton: {
    borderBottomColor: 'transparent',
  },
  tabButtonText: {
    fontSize: 14,
    fontFamily: Tokens.typography.families.semiBold,
  },
  tabActiveText: {
    color: colors.textPrimary,
  },
  tabInactiveText: {
    color: '#9CA3AF',
  },
  tabContentWrapper: {
    backgroundColor: isDarkMode ? '#1E1E1E' : '#F9FAFB',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
  },
  gemCard: {
    flexDirection: 'row',
    gap: 12,
    padding: 16,
    borderRadius: 18,
    backgroundColor: isDarkMode ? '#2D3748' : '#F9FAFB',
    borderWidth: 1.5,
    borderColor: isDarkMode ? '#3E4E68' : '#E2E8F0',
    marginBottom: 20,
  },
  gemIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: isDarkMode ? '#1E1E1E' : '#FFFFFF',
    borderWidth: 1,
    borderColor: isDarkMode ? '#3E4E68' : '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  gemTitle: {
    fontSize: 14,
    fontFamily: Tokens.typography.families.semiBold,
    color: colors.textPrimary,
    marginBottom: 4,
  },
  gemText: {
    fontSize: 13,
    fontFamily: Tokens.typography.families.regular,
    color: colors.textSecondary,
    lineHeight: 18,
    flex: 1,
  },
  factsHeader: {
    fontSize: 15,
    fontFamily: Tokens.typography.families.semiBold,
    color: colors.textPrimary,
    marginBottom: 12,
    marginTop: 4,
  },
  factRow: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  factBullet: {
    fontSize: 14,
    color: '#FF6B35',
  },
  factText: {
    flex: 1,
    fontSize: 13,
    fontFamily: Tokens.typography.families.regular,
    color: colors.textSecondary,
    lineHeight: 18,
  },
  tabInfoItem: {
    marginBottom: 14,
  },
  tabInfoLabel: {
    fontSize: 12,
    fontFamily: Tokens.typography.families.semiBold,
    color: '#9CA3AF',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  tabInfoValue: {
    fontSize: 14,
    fontFamily: Tokens.typography.families.regular,
    color: colors.textPrimary,
    lineHeight: 20,
  },

  // ── Sub-locations Carousel ─────────────────────────────────────────────────
  subLocationsWrapper: {
    marginTop: 10,
    marginBottom: 24,
  },
  subLocationCarouselContent: {
    paddingLeft: 20,
    paddingRight: 10,
    gap: 12,
  },
  subLocationCard: {
    width: 220,
    borderRadius: 18,
    overflow: 'hidden',
    borderWidth: 1.5,
    borderColor: isDarkMode ? '#2D3748' : '#F1F5F9',
    backgroundColor: isDarkMode ? '#1E1E1E' : '#FFFFFF',
  },
  subLocationImage: {
    width: '100%',
    height: 120,
  },
  subLocationTextContainer: {
    padding: 12,
    gap: 4,
  },
  subLocationTitle: {
    fontSize: 14,
    fontFamily: Tokens.typography.families.semiBold,
    color: colors.textPrimary,
  },
  subLocationDesc: {
    fontSize: 12,
    fontFamily: Tokens.typography.families.regular,
    color: colors.textSecondary,
    lineHeight: 16,
  },

  // ── Sticky Bottom Bar ──────────────────────────────────────────────────────
  bottomStickyBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 85,
    backgroundColor: isDarkMode ? '#1E1E1E' : '#FFFFFF',
    borderTopWidth: 1.5,
    borderTopColor: isDarkMode ? '#2D3748' : '#F1F5F9',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingBottom: Platform.OS === 'ios' ? 15 : 0,
    zIndex: 100,
  },
  priceBlock: {
    justifyContent: 'center',
  },
  priceLabel: {
    fontSize: 12,
    fontFamily: Tokens.typography.families.medium,
    color: '#9CA3AF',
    marginBottom: 2,
  },
  priceAmount: {
    fontSize: 22,
    fontFamily: Tokens.typography.families.semiBold,
    color: colors.textPrimary,
  },
  actionChevronButton: {
    paddingHorizontal: 22,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FF6B35',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    ...Platform.select({
      ios: {
        shadowColor: '#FF6B35',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.35,
        shadowRadius: 6,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontFamily: Tokens.typography.families.semiBold,
  },

  // ── Modal Styles ───────────────────────────────────────────────────────────
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    width: '100%',
    backgroundColor: isDarkMode ? '#1E1E1E' : '#FFFFFF',
    borderRadius: 28,
    padding: 24,
    ...Platform.select({
      ios: {
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.25,
        shadowRadius: 16,
      },
      android: {
        elevation: 10,
      },
    }),
  },
  modalTitle: {
    fontFamily: Tokens.typography.families.semiBold,
    fontSize: 20,
    color: colors.textPrimary,
    marginBottom: 20,
    textAlign: 'center',
  },
  modalInput: {
    backgroundColor: isDarkMode ? '#2D3748' : '#F9FAFB',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 14,
    color: colors.textPrimary,
    fontFamily: Tokens.typography.families.regular,
    borderWidth: 1.5,
    borderColor: isDarkMode ? '#3E4E68' : '#E2E8F0',
  },
  modalActionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 14,
    gap: 12,
  },
  modalBtn: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelBtn: {
    backgroundColor: isDarkMode ? '#2D3748' : '#F3F4F6',
  },
  confirmBtn: {
    backgroundColor: '#FF6B35',
  },
  cancelBtnText: {
    color: colors.textPrimary,
    fontFamily: Tokens.typography.families.semiBold,
    fontSize: 14,
  },
  confirmBtnText: {
    color: '#FFFFFF',
    fontFamily: Tokens.typography.families.semiBold,
    fontSize: 14,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: isDarkMode ? '#2D3748' : '#F3F4F6',
  },
  checkboxOuter: {
    width: 20,
    height: 20,
    borderRadius: 6,
    backgroundColor: isDarkMode ? '#2D3748' : '#F9FAFB',
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: isDarkMode ? '#3E4E68' : '#D1D5DB',
  },
  checkboxOuterSelected: {
    borderColor: '#FF6B35',
    backgroundColor: '#FF6B35',
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
  },
  labelText: {
    fontFamily: Tokens.typography.families.semiBold,
    fontSize: 14,
    color: colors.textPrimary,
  },
  // ── Map Card Section ──
  mapSectionContainer: {
    paddingHorizontal: 20,
    marginTop: 24,
  },
  mapCard: {
    height: 180,
    borderRadius: 20,
    overflow: 'hidden',
    position: 'relative',
    marginTop: 8,
    borderWidth: 1.5,
    borderColor: isDarkMode ? '#2D3748' : '#E2E8F0',
    backgroundColor: isDarkMode ? '#1E1E1E' : '#F3F4F6',
  },
  mapImage: {
    width: '100%',
    height: '100%',
    opacity: isDarkMode ? 0.65 : 0.9,
  },
  mapMarkerContainer: {
    position: 'absolute',
    alignSelf: 'center',
    top: '32%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  markerCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FF6B35',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  markerPulse: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 107, 53, 0.3)',
    zIndex: 1,
  },
  mapBanner: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: isDarkMode ? '#1E1E1E' : '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: isDarkMode ? '#2D3748' : '#F1F5F9',
  },
  mapBannerText: {
    fontSize: 12,
    fontFamily: Tokens.typography.families.semiBold,
    color: '#FF6B35',
  },
  alignSelfCenter: {
    alignSelf: 'center',
  },
  alignItemsCenter: {
    alignItems: 'center',
  },
  flex1: {
    flex: 1,
  },
  spacer40: {
    width: 40,
  },
  marginBottom4: {
    marginBottom: 4,
  },
  marginBottom6: {
    marginBottom: 6,
  },
  marginBottom8: {
    marginBottom: 8,
  },
  marginBottom12: {
    marginBottom: 12,
  },
  marginBottom14: {
    marginBottom: 14,
  },
  marginTop4: {
    marginTop: 4,
  },
  marginTop8: {
    marginTop: 8,
  },
  marginTop14: {
    marginTop: 14,
  },
  width100: {
    width: '100%',
  },
  width95: {
    width: '95%',
  },
  width90: {
    width: '90%',
  },
  width85: {
    width: '85%',
  },
  modalInputText: {
    color: colors.textPrimary,
    fontFamily: Tokens.typography.families.regular,
    fontSize: 14,
  },
  modalInputPlaceholder: {
    color: colors.textTertiary,
    fontFamily: Tokens.typography.families.regular,
    fontSize: 14,
  },
  modalInputTouchable: {
    justifyContent: 'center',
  },
  subLocationSectionTitle: {
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  mapInfoBox: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: isDarkMode ? 'rgba(0, 0, 0, 0.85)' : '#FFFFFF',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    flexDirection: 'row',
    alignItems: 'center',
    maxWidth: '65%',
  },
  mapInfoTextWrapper: {
    marginRight: 10,
  },
  mapInfoTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: isDarkMode ? '#FFFFFF' : '#1A202C',
  },
  mapInfoSubtitle: {
    fontSize: 9,
    color: isDarkMode ? '#A0AEC0' : '#4A5568',
    marginTop: 1,
  },
  mapInfoLink: {
    fontSize: 8.5,
    color: '#3182CE',
    marginTop: 3,
    textDecorationLine: 'underline',
  },
  mapInfoDirectionsBtn: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#3182CE',
    alignItems: 'center',
    justifyContent: 'center',
  },
  zoomControls: {
    position: 'absolute',
    bottom: 12,
    right: 12,
    backgroundColor: isDarkMode ? 'rgba(0, 0, 0, 0.85)' : '#FFFFFF',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: isDarkMode ? '#2D3748' : '#E2E8F0',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  zoomBtn: {
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  zoomBtnBorder: {
    borderBottomWidth: 1,
    borderBottomColor: isDarkMode ? '#2D3748' : '#E2E8F0',
  },
  zoomText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: isDarkMode ? '#FFFFFF' : '#4A5568',
  },
  googleBranding: {
    position: 'absolute',
    bottom: 12,
    left: 12,
    opacity: 0.7,
  },
  googleText: {
    fontSize: 12,
    fontWeight: '900',
    color: isDarkMode ? '#A0AEC0' : '#718096',
    letterSpacing: -0.5,
  },
});