import React, { useContext, useRef } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, ScrollView,
  StatusBar, Dimensions, Image, Animated, Modal, Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import { COLORS, GRADIENTS, SHADOWS, RADIUS } from '../../theme/theme';

const { width } = Dimensions.get('window');

export default function SettingsScreen({ navigation }) {

  const propScale = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(propScale, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(propScale, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  const SettingItem = ({ icon, label, color = COLORS.textPrimary, onPress, subLabel, style }) => (
    <Animated.View style={style}>
      <TouchableOpacity
        activeOpacity={0.7}
        style={s.settingItem}
        onPress={onPress}
        onPressIn={style ? handlePressIn : undefined}
        onPressOut={style ? handlePressOut : undefined}
      >
        <View style={[s.settingIconBox, { backgroundColor: `${color}12` }]}>
          <MaterialCommunityIcons name={icon} size={22} color={color} />
        </View>
        <View style={s.settingTextBox}>
          <Text style={s.settingLabel}>{label}</Text>
          {subLabel && <Text style={s.settingSubLabel}>{subLabel}</Text>}
        </View>
        <View style={s.settingChevron}>
          <Ionicons name="chevron-forward" size={16} color={COLORS.textTertiary} />
        </View>
      </TouchableOpacity>
    </Animated.View>
  );


  return (
    <SafeAreaView style={s.container}>
      <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />

      <ScrollView contentContainerStyle={{ paddingBottom: 120 }} showsVerticalScrollIndicator={false}>
     
        <View style={s.header}>
          <Text style={s.headerTitle}>Settings</Text>
          <TouchableOpacity style={s.logoutBtn}>
            <MaterialCommunityIcons name="logout" size={20} color={COLORS.danger} />
          </TouchableOpacity>
        </View>


        <View style={s.profileWrap}>
          <LinearGradient
            colors={GRADIENTS.primaryShift}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={s.profileCard}
          >
            <View style={s.profileDecoOrb} />
            <View style={s.profileInfo}>
              <View style={s.avatarContainer}>
                <View style={s.avatar}>
                 
                    <Image source={{ }} style={s.avatarImage} />
                 
                    <Text style={s.avatarInitial}>U</Text>
                 
                </View>
                <TouchableOpacity style={s.editAvatarBtn}>
                  <Ionicons name="camera" size={14} color="white" />
                </TouchableOpacity>
              </View>
              <View style={s.userMeta}>
                <Text style={s.userName}>Alok Mourya</Text>
                <Text style={s.userEmail}>email@example.com</Text>
                <View style={s.badgeRow}>
                  <LinearGradient colors={['rgba(255,255,255,0.2)', 'rgba(255,255,255,0.08)']} style={s.proBadge}>
                    <MaterialCommunityIcons name="crown" size={11} color="#FFD60A" />
                    <Text style={s.proText}>Premium</Text>
                  </LinearGradient>
                </View>
              </View>
            </View>
          </LinearGradient>
        </View>

    
        <View style={s.section}>
          <Text style={s.sectionTitle}>Account & Property</Text>
          <View style={s.groupCard}>
            <SettingItem
              icon="home"
              label="Account Setting"
              
              color={COLORS.primary}
              
              
            />
            <View style={s.settingDivider} />
            <SettingItem
              icon="account-group-outline"
              label="Personalized"
             
              color={COLORS.accent}
            
            />
            <View style={s.settingDivider} />
            <SettingItem
              icon="qrcode-scan"
              label="Theme"
             
              color="#52c9de"
              
            />
          </View>
        </View>

        <View style={s.section}>
          <Text style={s.sectionTitle}>App Preferences</Text>
          <View style={s.groupCard}>
            
            <View style={s.settingDivider} />
            <SettingItem icon="shield-check-outline" label="Privacy & Security" color={COLORS.success} />
            <View style={s.settingDivider} />
            <SettingItem icon="share-variant-outline" label="Invite Friends" color={COLORS.primary} />
          </View>
        </View>

        <View style={s.section}>
          <Text style={s.sectionTitle}>Support</Text>
          <View style={s.groupCard}>
            <SettingItem icon="star-outline" label="Rate TrackMate" color="#FFCC00" />
            <View style={s.settingDivider} />
            <SettingItem icon="help-circle-outline" label="Help Center" color={COLORS.textTertiary} />
            <View style={s.settingDivider} />
            <SettingItem icon="information-outline" label="About Version" subLabel="v2.1.0" color={COLORS.textPrimary} />
          </View>
        </View>

        <TouchableOpacity style={s.deleteBtn}>
          <Text style={s.deleteBtnText}>Deactivate Account</Text>
        </TouchableOpacity>
      </ScrollView>

      
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },

  // ── Header ──
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

  // ── Profile Card ──
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
  avatarImage: { width: '100%', height: '100%', resizeMode: 'cover' },
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

  // ── Sections ──
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

  // ── Delete ──
  deleteBtn: {
    margin: 28, alignItems: 'center', padding: 16, borderRadius: RADIUS.lg,
    borderWidth: 1, borderColor: COLORS.dangerGhost,
    backgroundColor: COLORS.dangerGhost,
  },
  deleteBtnText: { color: COLORS.danger, fontWeight: '800', fontSize: 14 },

  // ── Bottom Nav ──
  bottomNav: {
    position: 'absolute', bottom: 24, left: 22, right: 22,
    height: 72, backgroundColor: 'rgba(255,255,255,0.97)',
    borderRadius: RADIUS.xxl, flexDirection: 'row',
    justifyContent: 'space-around', alignItems: 'center',
    ...SHADOWS.lg,
  },
  navItem: { alignItems: 'center', paddingHorizontal: 16 },
  navActiveBar: {
    position: 'absolute', top: -8,
    width: 22, height: 3, borderRadius: 2,
    backgroundColor: COLORS.primary,
  },
  navText: { fontSize: 10, fontWeight: '700', color: COLORS.textTertiary, marginTop: 3 },
  navTextActive: { color: COLORS.primary },

  // ── Modal ──
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
});