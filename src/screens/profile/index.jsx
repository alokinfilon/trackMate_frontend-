import React from 'react';
import {
  View, Text, TouchableOpacity, ScrollView,
  StatusBar, Animated, Modal, Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import { useTheme } from '../../context/ThemeContext';

import { useProfileSettings } from './profile.hooks';
import { createStyles } from './profile.styles';
import {
  CircleUserRoundIcon,
  PaletteIcon,
  GlobeLockIcon,
  ContactIcon,
  StarIcon,
  MessageCircleQuestionIcon,
  InfoIcon,
  UserRoundPenIcon
} from '../../components/index';


export default function SettingsScreen() {
  const { isDarkMode, toggleTheme, colors, gradients, shadows, radius } = useTheme();
  
  const {
   
    themeModalVisible,
    setThemeModalVisible,
    handlePressIn,
    handlePressOut,
    handleLogout
  } = useProfileSettings();

  const s = React.useMemo(() => createStyles(colors, gradients, shadows, radius), [colors, gradients, shadows, radius]);

  const SettingItem = ({ icon, label, color = colors.textPrimary, onPress, subLabel, style }) => (
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
          <Ionicons name="chevron-forward" size={16} color={colors.textTertiary} />
        </View>
      </TouchableOpacity>
    </Animated.View>
  );

  return (
    <SafeAreaView style={s.container}>
      <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} translucent backgroundColor="transparent" />

      <ScrollView contentContainerStyle={{ paddingBottom: 120 }} showsVerticalScrollIndicator={false}>
        <View style={s.header}>
          <Text style={s.headerTitle}>Settings</Text>
          <TouchableOpacity style={s.logoutBtn} onPress={handleLogout}>
            <MaterialCommunityIcons name="logout" size={20} color={colors.danger} />
          </TouchableOpacity>
        </View>

        <View style={s.profileWrap}>
          <LinearGradient
            colors={gradients.primaryShift}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={s.profileCard}
          >
            <View style={s.profileDecoOrb} />
            <View style={s.profileInfo}>
              <View style={s.avatarContainer}>
                <View style={s.avatar}>
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
    <View style={[s.itemRow, { flexDirection: 'row', alignItems: 'center', padding: 16 }]}>
  <CircleUserRoundIcon stroke={colors.primary} />
  
  <Text style={[s.label, { marginLeft: 12, color: colors.textPrimary }]}>
    Account Setting
  </Text>
</View>
    <View style={s.settingDivider} />

    {/* Personalized using ContactIcon */}
 <TouchableOpacity style={s.customRow}>
          <ContactIcon stroke={colors.accent} />
          <Text style={[s.customLabel, { color: colors.textPrimary }]}>Personalized</Text>
        </TouchableOpacity>
        
        <View style={s.settingDivider} />

        {/* Theme */}
        <TouchableOpacity style={s.customRow} onPress={() => setThemeModalVisible(true)}>
          <PaletteIcon stroke="#52c9de" />
          <Text style={[s.customLabel, { color: colors.textPrimary }]}>Theme</Text>
        </TouchableOpacity>

  </View>
</View>


      <View style={s.section}>
      <Text style={s.sectionTitle}>App Preferences</Text>
      <View style={s.groupCard}>
        
        {/* Privacy & Security */}
        <TouchableOpacity style={s.customRow}>
          <GlobeLockIcon stroke={colors.success} />
          <Text style={[s.customLabel, { color: colors.textPrimary }]}>Privacy & Security</Text>
        </TouchableOpacity>
        
        <View style={s.settingDivider} />
        
         <TouchableOpacity style={s.customRow}>
          <UserRoundPenIcon stroke={colors.success} />
          <Text style={[s.customLabel, { color: colors.textPrimary }]}>invite friend</Text>
        </TouchableOpacity>
        
      </View>
    </View>


       <View style={s.section}>
          <Text style={s.sectionTitle}>Support</Text>
          <View style={s.groupCard}>
            <TouchableOpacity style={s.customRow}>
          <UserRoundPenIcon stroke={colors.textTertiary} />
          <Text style={[s.customLabel, { color: colors.textPrimary }]}>Rate Trackmate</Text>
        </TouchableOpacity>
            <View style={s.settingDivider} />
            
            <TouchableOpacity style={s.customRow}>
          <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1, justifyContent: 'space-between' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <InfoIcon stroke={colors.textPrimary} />
              <Text style={[s.customLabel, { color: colors.textPrimary }]}>Help Center</Text>
            </View>
            <Text style={{ color: colors.textTertiary, fontSize: 14 }}>v2.1.0</Text>
          </View>
        </TouchableOpacity>
            <View style={s.settingDivider} />
            
           <TouchableOpacity style={s.customRow}>
          <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1, justifyContent: 'space-between' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <MessageCircleQuestionIcon stroke={colors.textPrimary} />
              <Text style={[s.customLabel, { color: colors.textPrimary }]}>About Version</Text>
            </View>
            <Text style={{ color: colors.textTertiary, fontSize: 14 }}>v2.1.0</Text>
          </View>
        </TouchableOpacity>
          </View>
        </View>


       <TouchableOpacity 
  style={s.deleteBtn} 
  activeOpacity={0.8}
  onPress={handleLogout} 
>
  <Text style={s.deleteBtnText}>Deactivate Account</Text>
</TouchableOpacity>
      </ScrollView>

      <Modal visible={themeModalVisible} transparent animationType="fade">
        <Pressable style={s.modalOverlay} onPress={() => setThemeModalVisible(false)}>
          <View style={s.modalCard}>
            <Text style={s.modalTitle}>Choose Theme</Text>
            
            <TouchableOpacity 
              style={[s.ringtoneRow, !isDarkMode && s.ringtoneRowActive]}
              onPress={() => { toggleTheme('light'); setThemeModalVisible(false); }}
            >
              <Text style={[s.ringtoneText, !isDarkMode && s.ringtoneTextActive]}>Light Mode</Text>
              {!isDarkMode && <Ionicons name="checkmark-circle" size={20} color={colors.primary} />}
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[s.ringtoneRow, isDarkMode && s.ringtoneRowActive]}
              onPress={() => { toggleTheme('dark'); setThemeModalVisible(false); }}
            >
              <Text style={[s.ringtoneText, isDarkMode && s.ringtoneTextActive]}>Dark Mode</Text>
              {isDarkMode && <Ionicons name="checkmark-circle" size={20} color={colors.primary} />}
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
}