import React from 'react';
import {
  View, Text, TouchableOpacity, ScrollView,
  StatusBar, Image, ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import { useTheme, useTranslation } from '../../context';

import { useProfileSettings } from './profile.hooks';
import { createStyles } from './profile.styles';
import {
  Arrow,
  AccountIcon,
  ShieldCheckIcon,
  BellIcon,
  MoonStarsIcon,
  GlobeIcon,
  LuggageIcon,
  VerifiedBadgeIcon,
  CreditCardBackIcon,
  JournalCheckIcon,
  StarIconComponent,
  LogoutIcon,
  SettingsIcon
} from '../../components/index';

export default function SettingsScreen({ navigation }) {
  const { isDarkMode, colors, gradients, shadows, radius } = useTheme();
  const { t } = useTranslation();
  
  const {
    profile,
    loading,
    fetchProfile,
    handleLogout
  } = useProfileSettings();

  const s = React.useMemo(() => createStyles(colors, gradients, shadows, radius), [colors, gradients, shadows, radius]);

  useFocusEffect(
    React.useCallback(() => {
      fetchProfile();
    }, [fetchProfile])
  );

  const SettingItem = ({ IconComponent, label, onPress }) => (
    <TouchableOpacity
      activeOpacity={0.7}
      style={s.settingItem}
      onPress={onPress}
    >
      <IconComponent size={22} color={colors.textPrimary} style={s.settingIcon} />
      <Text style={s.settingLabel}>{label}</Text>
      <View style={{ marginLeft: 'auto' }}>
        <Arrow size={16} color={colors.textTertiary} style={{ transform: [{ rotate: '180deg' }] }} />
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={s.container} edges={['top', 'left', 'right']}>
      <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} translucent backgroundColor="transparent" />

      {/* Header with Centered Title & Left Back Arrow */}
      <View style={s.header}>
        <TouchableOpacity 
          style={s.backButton} 
          onPress={() => navigation.canGoBack() ? navigation.goBack() : navigation.navigate('HomeTab')}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <Arrow size={28} color={isDarkMode ? '#FFFFFF' : '#000000'} />
        </TouchableOpacity>
        <Text style={s.headerTitle}>{t('profile.title')}</Text>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 60 }} showsVerticalScrollIndicator={false}>
        {/* Profile Info Section (horizontal row directly on main background) */}
        <View style={s.profileWrap}>
          <View style={s.avatar}>
            {loading && !profile ? (
              <ActivityIndicator size="small" color="#FF6B35" />
            ) : profile?.user_image ? (
              <Image source={{ uri: profile.user_image }} style={{ width: '100%', height: '100%' }} />
            ) : (
              <Text style={s.avatarInitial}>
                {(profile?.full_name || 'Traveler').charAt(0).toUpperCase()}
              </Text>
            )}
          </View>
          <View style={s.userMeta}>
            <Text style={s.userName}>{profile?.full_name || 'Traveler'}</Text>
            <Text style={s.userEmail}>{profile?.email || 'guest@trackmate.com'}</Text>
          </View>
        </View>

        {/* Settings List using custom SVG icons in brand orange color */}
        <SettingItem
          IconComponent={AccountIcon}
          label={t('profile.personalInfo')}
          onPress={() => navigation.navigate('PersonalInfo')}
        />
        <SettingItem
          IconComponent={ShieldCheckIcon}
          label={t('profile.accountSecurity')}
          onPress={() => navigation.navigate('AccountSecurity')}
        />
        <SettingItem
          IconComponent={LuggageIcon}
          label={t('profile.travelPreferences')}
          onPress={() => navigation.navigate('TravelPreference')}
        />
        <SettingItem
          IconComponent={BellIcon}
          label={t('profile.notifications')}
          onPress={() => navigation.navigate('Notification')}
        />
        <SettingItem
          IconComponent={MoonStarsIcon}
          label={t('profile.appearance')}
          onPress={() => navigation.navigate('Appearance')}
        />
        <SettingItem
          IconComponent={GlobeIcon}
          label={t('profile.language')}
          onPress={() => navigation.navigate('Language')}
        />
        <SettingItem
          IconComponent={VerifiedBadgeIcon}
          label={t('profile.billingSubscription')}
          onPress={() => navigation.navigate('BillingSubscription')}
        />
        <SettingItem
          IconComponent={CreditCardBackIcon}
          label={t('profile.paymentMethods')}
          onPress={() => navigation.navigate('PaymentMethods')}
        />
        <SettingItem
          IconComponent={JournalCheckIcon}
          label={t('profile.helpSupport')}
          onPress={() => navigation.navigate('HelpSupport')}
        />
        <SettingItem
          IconComponent={StarIconComponent}
          label={t('profile.rateUs')}
          onPress={() => navigation.navigate('RateUs')}
        />
        <SettingItem
          IconComponent={SettingsIcon}
          label={t('profile.settings')}
          onPress={() => navigation.navigate('AccountSecurity')}
        />
        <SettingItem
          IconComponent={LogoutIcon}
          label={t('profile.logout')}
          onPress={handleLogout}
        />
      </ScrollView>
    </SafeAreaView>
  );
}