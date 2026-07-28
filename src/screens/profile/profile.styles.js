import { StyleSheet } from 'react-native';

export const createStyles = (COLORS, GRADIENTS, SHADOWS, RADIUS) => StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 24, paddingBottom: 18,
  },
  headerTitle: { fontSize: 28, fontWeight: '900', color: COLORS.textPrimary, letterSpacing: -0.5 },
  logoutBtn: {
    width: 44, height: 44, borderRadius: 16,
    backgroundColor: COLORS.bg, justifyContent: 'center', alignItems: 'center',
    // Neumorphic extruded small
    shadowColor: 'rgb(163, 177, 198)',
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 4,
  },
  profileWrap: { paddingHorizontal: 20, marginBottom: 8 },
  profileCard: {
    borderRadius: 32, padding: 24, overflow: 'hidden',
    ...SHADOWS.glow(COLORS.primary),
  },
  profileDecoOrb: {
    position: 'absolute', top: -40, right: -40,
    width: 140, height: 140, borderRadius: 70,
    backgroundColor: 'rgba(255,255,255,0.06)',
  },
  profileInfo: { flexDirection: 'row', alignItems: 'center' },
  avatarContainer: { position: 'relative' },
  avatar: {
    width: 72, height: 72, borderRadius: 36,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderWidth: 0,
    justifyContent: 'center', alignItems: 'center', overflow: 'hidden',
  },
  avatarInitial: { fontSize: 28, color: '#FFF', fontWeight: '800' },
  editAvatarBtn: {
    position: 'absolute', bottom: -4, right: -4, width: 26, height: 26,
    borderRadius: 13, backgroundColor: COLORS.bg,
    alignItems: 'center', justifyContent: 'center',
    // Small extruded
    shadowColor: 'rgb(163, 177, 198)',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 2,
  },
  userMeta: { marginLeft: 18, flex: 1 },
  userName: { fontSize: 20, fontWeight: '800', color: 'white' },
  userEmail: { fontSize: 12, color: 'rgba(255,255,255,0.6)', fontWeight: '500', marginTop: 2 },
  badgeRow: { flexDirection: 'row', marginTop: 8 },
  proBadge: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 10, paddingVertical: 4, borderRadius: 999,
  },
  proText: { color: '#FFF', fontSize: 10, fontWeight: '800', marginLeft: 4, textTransform: 'uppercase' },
  section: { marginTop: 24, paddingHorizontal: 20 },
  sectionTitle: {
    fontSize: 11, fontWeight: '800', color: COLORS.textTertiary,
    textTransform: 'uppercase', letterSpacing: 1.2,
    marginBottom: 12, marginLeft: 8,
  },
  // Neumorphic settings group card
  groupCard: {
    backgroundColor: COLORS.bg, borderRadius: 32,
    overflow: 'hidden', paddingVertical: 6,
    // Neumorphic extruded
    shadowColor: 'rgb(163, 177, 198)',
    shadowOffset: { width: 6, height: 6 },
    shadowOpacity: 0.55,
    shadowRadius: 14,
    elevation: 6,
  },
  settingItem: {
    flexDirection: 'row', alignItems: 'center',
    paddingVertical: 14, paddingHorizontal: 18,
  },
  settingDivider: { height: 1, backgroundColor: COLORS.divider, marginLeft: 68 },
  // Neumorphic icon well (inset)
  settingIconBox: {
    width: 40, height: 40, borderRadius: 12,
    alignItems: 'center', justifyContent: 'center',
    backgroundColor: COLORS.bg,
    // Simulated inset
    borderWidth: 1,
    borderColor: 'rgba(163, 177, 198, 0.2)',
  },
  settingTextBox: { flex: 1, marginLeft: 14 },
  settingLabel: { fontSize: 15, fontWeight: '700', color: COLORS.textPrimary },
  settingSubLabel: { fontSize: 11, color: COLORS.textTertiary, marginTop: 2, fontWeight: '500' },
  settingChevron: {
    width: 28, height: 28, borderRadius: 12,
    backgroundColor: COLORS.bg, justifyContent: 'center', alignItems: 'center',
    // Small extruded
    shadowColor: 'rgb(163, 177, 198)',
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 2,
  },
  deleteBtn: {
    margin: 28, alignItems: 'center', padding: 16, borderRadius: 16,
    backgroundColor: COLORS.bg,
    borderWidth: 0,
    // Neumorphic extruded
    shadowColor: 'rgb(163, 177, 198)',
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 4,
  },
  deleteBtnText: { color: '#E53E3E', fontWeight: '800', fontSize: 14 },
  modalOverlay: {
    flex: 1, backgroundColor: 'rgba(61, 72, 82, 0.55)',
    justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20,
  },
  modalCard: {
    width: '100%', backgroundColor: COLORS.bg,
    borderRadius: 32, padding: 20,
    // Neumorphic extruded
    shadowColor: 'rgb(163, 177, 198)',
    shadowOffset: { width: 8, height: 8 },
    shadowOpacity: 0.7,
    shadowRadius: 20,
    elevation: 12,
  },
  modalTitle: { fontSize: 18, fontWeight: '800', color: COLORS.textPrimary, marginBottom: 12 },
  ringtoneRow: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingVertical: 13, paddingHorizontal: 12, borderRadius: 12,
  },
  ringtoneRowActive: { backgroundColor: COLORS.primaryGhost },
  ringtoneText: { fontSize: 15, fontWeight: '700', color: COLORS.textPrimary },
  ringtoneTextActive: { color: COLORS.primary },
  customRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  customLabel: {
    marginLeft: 14,
    fontSize: 16,
    fontWeight: '500',
  },
});
