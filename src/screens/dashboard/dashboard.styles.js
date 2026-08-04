import { StyleSheet } from 'react-native';

export const createDashboardStyles = (colors, isDarkMode) => StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  mainContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 40,
  },

  // ── Header greeting ──
  greetingContainer: {
    marginBottom: 20,
  },
  greetingText: {
    fontSize: 26,
    fontFamily: 'Outfit-Bold',
    color: colors.textPrimary,
    letterSpacing: -0.5,
  },
  greetingSubText: {
    fontSize: 13,
    fontFamily: 'Outfit-Regular',
    color: colors.textSecondary,
    marginTop: 2,
  },

  // ── Horizontal Trips Selector ──
  selectorHeader: {
    fontSize: 15,
    fontFamily: 'Outfit-Bold',
    color: colors.textPrimary,
    marginBottom: 10,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  tripsSelectorScroll: {
    marginBottom: 18,
  },
  tripsSelectorContent: {
    paddingVertical: 2,
    gap: 10,
  },
  tripChip: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 22,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 120,
  },
  activeTripChip: {
    backgroundColor: '#FF6B35',
    borderColor: '#FF6B35',
  },
  inactiveTripChip: {
    backgroundColor: colors.cardElevated,
    borderColor: colors.border,
  },
  tripChipTitle: {
    fontSize: 13,
    fontFamily: 'Outfit-Bold',
  },
  activeTripChipTitle: {
    color: '#FFFFFF',
  },
  inactiveTripChipTitle: {
    color: colors.textPrimary,
  },
  tripChipSubtitle: {
    fontSize: 10,
    fontFamily: 'Outfit-Regular',
    marginTop: 2,
  },
  activeTripChipSubtitle: {
    color: 'rgba(255, 255, 255, 0.8)',
  },
  inactiveTripChipSubtitle: {
    color: '#9CA3AF',
  },

  // ── Mockup Review Summary Card ──
  summaryCard: {
    backgroundColor: colors.cardElevated,
    borderRadius: 24,
    padding: 20,
    borderWidth: 1.5,
    borderColor: colors.border,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
    marginBottom: 20,
  },
  headerRow: {
    flexDirection: 'row',
    gap: 14,
    alignItems: 'center',
    marginBottom: 16,
  },
  placeThumbnail: {
    width: 85,
    height: 85,
    borderRadius: 16,
    backgroundColor: colors.card,
  },
  headerTextCol: {
    flex: 1,
  },
  placeName: {
    fontSize: 18,
    fontFamily: 'Outfit-Bold',
    color: colors.textPrimary,
    letterSpacing: -0.3,
  },
  placeSub: {
    fontSize: 12,
    fontFamily: 'Outfit-Regular',
    color: '#9CA3AF',
    marginTop: 2,
  },
  placePrice: {
    fontSize: 18,
    fontFamily: 'Outfit-Bold',
    color: '#FF6B35',
    marginTop: 8,
  },
  placePriceUnit: {
    fontSize: 12,
    fontFamily: 'Outfit-Regular',
    color: '#9CA3AF',
  },
  ratingCol: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    position: 'absolute',
    top: 0,
    right: 0,
  },
  ratingText: {
    fontSize: 12,
    fontFamily: 'Outfit-Bold',
    color: colors.textPrimary,
  },
  divider: {
    height: 1.5,
    backgroundColor: colors.divider,
    marginVertical: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'Outfit-Bold',
    color: colors.textPrimary,
    marginBottom: 14,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: 13,
    fontFamily: 'Outfit-Medium',
    color: '#9CA3AF',
  },
  detailValue: {
    fontSize: 13,
    fontFamily: 'Outfit-Bold',
    color: colors.textPrimary,
  },
  methodBadge: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 8,
    backgroundColor: isDarkMode ? 'rgba(255, 107, 53, 0.15)' : 'rgba(255, 107, 53, 0.08)',
    borderWidth: 1,
    borderColor: isDarkMode ? 'rgba(255, 107, 53, 0.3)' : 'rgba(255, 107, 53, 0.15)',
  },
  methodBadgeText: {
    fontSize: 11,
    fontFamily: 'Outfit-Bold',
    color: '#FF6B35',
  },

  // ── Bottom Action Button ──
  actionPayBtn: {
    width: '100%',
    paddingVertical: 14,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF6B35',
    marginTop: 14,
    shadowColor: '#FF6B35',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 3,
  },
  actionPayBtnText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontFamily: 'Outfit-Bold',
  },
  actionPayBtnCompleted: {
    backgroundColor: '#10B981',
    shadowColor: '#10B981',
  },
  actionPayBtnCancelled: {
    backgroundColor: '#EF4444',
    shadowColor: '#EF4444',
  },

  // ── Blank State ──
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
    paddingHorizontal: 20,
  },
  emptyText: {
    fontSize: 15,
    fontFamily: 'Outfit-Medium',
    color: '#9CA3AF',
    textAlign: 'center',
    lineHeight: 22,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 14,
    fontFamily: 'Outfit-Bold',
    color: '#EF4444',
  },

  // ── Details Header ──
  detailsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  detailsHeaderTitle: {
    fontSize: 18,
    fontFamily: 'Outfit-Bold',
    color: colors.textPrimary,
  },
  cancelHeaderBtn: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: isDarkMode ? '#2D1F21' : '#FEE2E2',
    borderWidth: 1,
    borderColor: isDarkMode ? 'rgba(239, 68, 68, 0.3)' : '#FCA5A5',
  },
  cancelHeaderBtnText: {
    fontSize: 13,
    fontFamily: 'Outfit-Bold',
    color: '#EF4444',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.card,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // ── List Header ──
  listHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  listHeaderTitle: {
    fontSize: 20,
    fontFamily: 'Outfit-Bold',
    color: colors.textPrimary,
    textAlign: 'center',
    flex: 1,
  },

  // ── Tabs ──
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    borderBottomWidth: 1.5,
    borderBottomColor: colors.border,
    marginBottom: 16,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    position: 'relative',
  },
  tabText: {
    fontSize: 14,
    fontFamily: 'Outfit-Bold',
    color: '#9CA3AF',
  },
  activeTabText: {
    color: '#FF6B35',
  },
  tabIndicator: {
    position: 'absolute',
    bottom: -1.5,
    height: 2.5,
    width: '60%',
    backgroundColor: '#FF6B35',
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
  },

  // ── Redesigned Booking List Cards ──
  card: {
    backgroundColor: colors.cardElevated,
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1.5,
    borderColor: colors.border,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 14,
  },
  cardPlaceThumbnail: {
    width: 60,
    height: 60,
    borderRadius: 14,
    backgroundColor: colors.card,
  },
  cardPlaceName: {
    fontSize: 16,
    fontFamily: 'Outfit-Bold',
    color: colors.textPrimary,
  },
  cardPlaceSub: {
    fontSize: 12,
    fontFamily: 'Outfit-Regular',
    color: '#9CA3AF',
    marginTop: 2,
  },
  cardDatesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
    paddingHorizontal: 2,
  },
  cardDatesInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  cardDateCol: {
    alignItems: 'flex-start',
  },
  cardDateText: {
    fontSize: 13,
    fontFamily: 'Outfit-Bold',
    color: colors.textPrimary,
  },
  cardDateLabel: {
    fontSize: 10,
    fontFamily: 'Outfit-Regular',
    color: '#9CA3AF',
    marginTop: 2,
  },
  cardDateDivider: {
    width: 1,
    height: 20,
    backgroundColor: colors.border,
  },
  cardPrice: {
    alignItems: 'flex-end',
  },
  cardPriceText: {
    fontSize: 15,
    fontFamily: 'Outfit-Bold',
    color: colors.primary,
  },
  cardPriceLabel: {
    fontSize: 10,
    fontFamily: 'Outfit-Regular',
    color: '#9CA3AF',
    marginTop: 2,
  },
  cardButtonsRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 4,
  },
  cardRebookBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: isDarkMode ? colors.card : 'rgba(255, 107, 53, 0.08)',
    borderWidth: 1,
    borderColor: isDarkMode ? 'rgba(255, 107, 53, 0.3)' : '#FFD2C4',
  },
  cardRebookBtnText: {
    fontSize: 13,
    fontFamily: 'Outfit-Bold',
    color: '#FF6B35',
  },
  cardReviewBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF6B35',
  },
  cardReviewBtnText: {
    fontSize: 13,
    fontFamily: 'Outfit-Bold',
    color: '#FFFFFF',
  },
  cardWideBtn: {
    width: '100%',
    paddingVertical: 12,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF6B35',
  },
  cardWideBtnText: {
    fontSize: 13,
    fontFamily: 'Outfit-Bold',
    color: '#FFFFFF',
  },
  spacer40: {
    width: 40,
  },
  flex1: {
    flex: 1,
  },
  errorWrapper: {
    marginBottom: 16,
    alignItems: 'center',
  },
  alignSelfCenter: {
    alignSelf: 'center',
  },
  alignItemsCenter: {
    alignItems: 'center',
  },
  gap6: {
    gap: 6,
  },
  marginTop2: {
    marginTop: 2,
  },
  marginTop4: {
    marginTop: 4,
  },
  marginTop14: {
    marginTop: 14,
  },
  marginBottom14: {
    marginBottom: 14,
  },
  profileBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  profileBtnLight: {
    backgroundColor: '#F3F4F6',
  },
  profileBtnDark: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
  },
  profileImage: {
    width: 40,
    height: 40,
  },
  cardCancelBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: isDarkMode ? colors.card : '#FEF2F2',
    borderWidth: 1,
    borderColor: isDarkMode ? 'rgba(239, 68, 68, 0.3)' : '#FCA5A5',
  },
  cardCancelBtnText: {
    fontSize: 13,
    fontFamily: 'Outfit-Bold',
    color: '#EF4444',
  },
});
