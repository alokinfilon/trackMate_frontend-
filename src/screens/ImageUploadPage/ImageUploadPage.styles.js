import { StyleSheet } from 'react-native';

export const createStyles = (colors, isDarkMode) => StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  mainContainer: {
    flex: 1,
    width: '100%',
  },
  // Header nav — neumorphic separation
  topNav: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    paddingHorizontal: 20, 
    paddingVertical: 14,
    backgroundColor: colors.bg,
    // Subtle bottom shadow for separation
    shadowColor: 'rgb(163, 177, 198)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  container: {
    flex: 1, 
    padding: 20,
  },
  centerContainer: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    padding: 20,
  },
  headerTitle: {
    fontSize: 18, 
    fontWeight: '800', 
    color: colors.textPrimary,
    letterSpacing: -0.2,
  },
  switchButton: {
    backgroundColor: colors.bg, 
    paddingHorizontal: 14, 
    paddingVertical: 8, 
    borderRadius: 12,
    // Neumorphic extruded small
    shadowColor: 'rgb(163, 177, 198)',
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 6,
    elevation: 3,
  },
  switchButtonText: {
    fontSize: 12, 
    fontWeight: '700', 
    color: '#6C63FF',
  },
  scrollList: { paddingBottom: 20 },
  sectionHeading: {
    fontSize: 16, 
    fontWeight: '800', 
    color: colors.textPrimary, 
    marginBottom: 10,
    letterSpacing: -0.2,
  },
  // Neumorphic collection card
  cardItem: {
    backgroundColor: colors.bg,
    padding: 14,
    borderRadius: 16,
    marginBottom: 10,
    // Neumorphic extruded
    shadowColor: 'rgb(163, 177, 198)',
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: isDarkMode ? 0.7 : 0.5,
    shadowRadius: 10,
    elevation: 5,
  },
  selectedCardItem: {
    // Inset + accent ring
    shadowColor: 'rgb(163, 177, 198)',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
    borderWidth: 2,
    borderColor: '#6C63FF',
  },
  checkmarkIcon: {
    position: 'absolute',
    top: 12,
    right: 12,
    color: '#6C63FF',
    fontWeight: 'bold',
    fontSize: 13,
  },
  cardTitle: {
    fontSize: 15, 
    fontWeight: '700',
    color: colors.textPrimary,
  },
  cardDesc: {
    fontSize: 12, 
    color: colors.textSecondary, 
    marginTop: 3,
  },
  cardMeta: {
    fontSize: 10,
    color: '#6C63FF',
    marginTop: 5, 
    fontWeight: '700', 
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  emptyText: {
    color: colors.textTertiary, 
    fontSize: 13, 
    fontStyle: 'italic',
  },
  // Image grid
  imageGrid: {
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    gap: 10,
  },
  gridImage: {
    width: 90,
    height: 90,
    borderRadius: 12, 
    backgroundColor: colors.bg,
    // Small extruded
    shadowColor: 'rgb(163, 177, 198)',
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 2,
  },
  // Image preview — neumorphic inset well
  imagePreviewContainer: {
    width: '100%',
    height: 220, 
    backgroundColor: colors.bg,
    borderRadius: 20, 
    alignItems: 'center', 
    justifyContent: 'center', 
    marginBottom: 15,
    overflow: 'hidden',
    // Inset well simulation
    borderWidth: 1.5,
    borderColor: 'rgba(163, 177, 198, 0.25)',
  },
  previewImage: {
    width: '100%',
    height: '100%', 
    resizeMode: 'cover',
  },
  placeholderText: {
    color: colors.textTertiary, 
    fontSize: 14,
  },
  // Text inputs — neumorphic inset
  textInput: {
    width: '100%',
    backgroundColor: colors.bg,
    borderRadius: 16, 
    padding: 12,
    marginBottom: 10,
    fontSize: 14, 
    color: colors.textPrimary,
    // Inset well simulation
    borderWidth: 1,
    borderColor: 'rgba(163, 177, 198, 0.25)',
  },
  // Primary button — accent violet extruded
  primaryButton: { 
    backgroundColor: '#6C63FF', 
    width: '100%',
    paddingVertical: 14,
    borderRadius: 16, 
    alignItems: 'center',
    marginBottom: 10,
    // Neumorphic extruded
    shadowColor: 'rgb(163, 177, 198)',
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.6,
    shadowRadius: 10,
    elevation: 6,
  },
  // Upload button — teal extruded
  uploadButton: {
    backgroundColor: '#38B2AC',
    width: '100%', 
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: 'center',
    // Neumorphic extruded
    shadowColor: 'rgb(163, 177, 198)',
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.6,
    shadowRadius: 10,
    elevation: 6,
  },
  disabledButton: {
    opacity: 0.5,
  },
  buttonText: { 
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  // Target folder indicator — neumorphic card
  targetFolderCard: {
    backgroundColor: colors.bg,
    padding: 14,
    borderRadius: 16,
    marginBottom: 15,
    // Small extruded
    shadowColor: 'rgb(163, 177, 198)',
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 3,
  },
  targetFolderLabel: {
    color: colors.textSecondary,
    fontSize: 12,
    fontWeight: '500',
  },
  targetFolderValue: {
    fontWeight: '700',
    marginTop: 3,
    fontSize: 13,
  },
  // Modal — neumorphic bottom sheet
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(61, 72, 82, 0.55)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    borderTopLeftRadius: 32, 
    borderTopRightRadius: 32,
    padding: 20,
    maxHeight: '80%',
    backgroundColor: colors.bg,
    // Extruded shadow upward
    shadowColor: 'rgb(163, 177, 198)',
    shadowOffset: { width: 0, height: -6 },
    shadowOpacity: 0.5,
    shadowRadius: 16,
    elevation: 16,
  },
  modalDragHandle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(163, 177, 198, 0.4)',
    alignSelf: 'center',
    marginBottom: 16,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  modalTitle: { 
    fontSize: 18,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  closeText: { 
    fontSize: 18,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  inputLabel: { 
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 6, 
    marginTop: 6,
    color: colors.textPrimary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  // Clear selection button
  clearSelectionBtn: {
    marginBottom: 10, 
    padding: 6,
    borderRadius: 8,
  },
  clearSelectionText: {
    color: '#6C63FF', 
    fontWeight: '700',
    fontSize: 13,
  },
});