import { StyleSheet } from 'react-native';

export const createStyles = (COLORS, GRADIENTS, SHADOWS, RADIUS) => StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 24, paddingBottom: 18,
  },
  headerTitle: { fontSize: 28, fontWeight: '900', color: COLORS.textPrimary, letterSpacing: -0.5 },
  logoutBtn: {
    width: 42, height: 42, borderRadius: RADIUS.md,
    backgroundColor: COLORS.card, justifyContent: 'center', alignItems: 'center',
    ...SHADOWS.sm,
  },
  profileWrap: { paddingHorizontal: 20, marginBottom: 8 },
  profileCard: {
    borderRadius: RADIUS.xxl, padding: 24, overflow: 'hidden',
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
    width: 72, height: 72, borderRadius: 35,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderWidth: 1.5, borderColor: 'rgba(255,255,255,0.4)',
    justifyContent: 'center', alignItems: 'center', overflow: 'hidden',
  },
  avatarInitial: { fontSize: 28, color: '#FFF', fontWeight: '800' },
  editAvatarBtn: {
    position: 'absolute', bottom: -4, right: -4, width: 26, height: 26,
    borderRadius: 13, backgroundColor: COLORS.darkBg,
    alignItems: 'center', justifyContent: 'center',
    borderWidth: 2, borderColor: 'white',
  },
  userMeta: { marginLeft: 18, flex: 1 },
  userName: { fontSize: 20, fontWeight: '800', color: 'white' },
  userEmail: { fontSize: 12, color: 'rgba(255,255,255,0.6)', fontWeight: '500', marginTop: 2 },
  badgeRow: { flexDirection: 'row', marginTop: 8 },
  proBadge: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 10, paddingVertical: 4, borderRadius: RADIUS.pill,
  },
  proText: { color: '#FFF', fontSize: 10, fontWeight: '800', marginLeft: 4, textTransform: 'uppercase' },
  section: { marginTop: 24, paddingHorizontal: 20 },
  sectionTitle: {
    fontSize: 11, fontWeight: '800', color: COLORS.textTertiary,
    textTransform: 'uppercase', letterSpacing: 1.2,
    marginBottom: 12, marginLeft: 8,
  },
  groupCard: {
    backgroundColor: COLORS.card, borderRadius: RADIUS.xl,
    overflow: 'hidden', paddingVertical: 6,
    ...SHADOWS.sm,
  },
  settingItem: {
    flexDirection: 'row', alignItems: 'center',
    paddingVertical: 14, paddingHorizontal: 18,
  },
  settingDivider: { height: 1, backgroundColor: COLORS.divider, marginLeft: 68 },
  settingIconBox: {
    width: 40, height: 40, borderRadius: RADIUS.sm,
    alignItems: 'center', justifyContent: 'center',
  },
  settingTextBox: { flex: 1, marginLeft: 14 },
  settingLabel: { fontSize: 15, fontWeight: '700', color: COLORS.textPrimary },
  settingSubLabel: { fontSize: 11, color: COLORS.textTertiary, marginTop: 2, fontWeight: '500' },
  settingChevron: {
    width: 28, height: 28, borderRadius: RADIUS.xs,
    backgroundColor: COLORS.surface, justifyContent: 'center', alignItems: 'center',
  },
  deleteBtn: {
    margin: 28, alignItems: 'center', padding: 16, borderRadius: RADIUS.lg,
    borderWidth: 1, borderColor: COLORS.dangerGhost,
    backgroundColor: COLORS.dangerGhost,
  },
  deleteBtnText: { color: COLORS.danger, fontWeight: '800', fontSize: 14 },
  modalOverlay: {
    flex: 1, backgroundColor: 'rgba(15,23,42,0.55)',
    justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20,
  },
  modalCard: {
    width: '100%', backgroundColor: COLORS.card,
    borderRadius: RADIUS.xl, padding: 20,
    ...SHADOWS.xl,
  },
  modalTitle: { fontSize: 18, fontWeight: '800', color: COLORS.textPrimary, marginBottom: 12 },
  ringtoneRow: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingVertical: 13, paddingHorizontal: 12, borderRadius: RADIUS.sm,
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
    fontWeight: '500', // adjust thickness to match your system font choice
  },
});
