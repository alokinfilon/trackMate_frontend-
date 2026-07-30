import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  Switch,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useTheme } from '../../../../context/ThemeContext';
import { useAccountSecurity } from './account-security.hooks';
import { createStyles } from './account-security.styles';
import { useAlertModal } from '../../../../components/index';
import { useTranslation } from '../../../../context/LanguageContext';

export default function AccountSecurityScreen({ navigation }) {
  const { colors, isDarkMode } = useTheme();
  const styles = React.useMemo(() => createStyles(colors, isDarkMode), [colors, isDarkMode]);
  const { showModal } = useAlertModal();
  const { t } = useTranslation();

  const {
    rememberMe,
    setRememberMe,
    biometrics,
    setBiometrics,
    faceId,
    setFaceId,
    smsAuth,
    setSmsAuth,
    googleAuth,
    setGoogleAuth,
  } = useAccountSecurity();

  const handleDeviceMgmt = () => {
    showModal({
      title: t('accountSecurity.sessions'),
      message: '• iPhone 15 Pro (Current)\n  Active now • New York, USA\n\n• Chrome on Windows\n  Active 2 hours ago • New York, USA\n\n• iPad Pro\n  Active 3 days ago • San Francisco, USA',
      variant: 'info',
      confirmText: 'Dismiss',
      onConfirm: () => {},
    });
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDarkMode ? colors.bg : '#FFFFFF' }]} edges={['top']}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#FF6B35" />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.textPrimary }]}>{t('accountSecurity.title')}</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>{t('accountSecurity.title')}</Text>

        <View style={[styles.groupCard, { backgroundColor: colors.surface }]}>
          {/* Change Password Link */}
          <TouchableOpacity 
            style={[styles.row, { borderBottomWidth: 1, borderBottomColor: colors.divider }]}
            onPress={() => navigation.navigate('ChangePassword')}
            activeOpacity={0.7}
          >
            <View style={styles.rowLeft}>
              <Ionicons name="key-outline" size={22} color="#FF6B35" style={styles.icon} />
              <Text style={[styles.rowLabel, { color: colors.textPrimary }]}>{t('accountSecurity.changePassword')}</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={colors.textTertiary} />
          </TouchableOpacity>

          {/* Remember Me Toggle */}
          <View style={[styles.rowSwitch, { borderBottomWidth: 1, borderBottomColor: colors.divider }]}>
            <View style={styles.rowLeft}>
              <Ionicons name="bookmark-outline" size={22} color="#FF6B35" style={styles.icon} />
              <View style={{ flex: 1 }}>
                <Text style={[styles.rowLabel, { color: colors.textPrimary }]}>{t('accountSecurity.rememberMe')}</Text>
                <Text style={[styles.rowSubLabel, { color: colors.textSecondary }]}>{t('accountSecurity.rememberMeDesc')}</Text>
              </View>
            </View>
            <Switch
              value={rememberMe}
              onValueChange={setRememberMe}
              trackColor={{ false: '#767577', true: '#FF6B35' }}
              thumbColor={Platform.OS === 'android' ? '#f4f3f4' : undefined}
            />
          </View>

          {/* Biometrics Toggle */}
          <View style={[styles.rowSwitch, { borderBottomWidth: 1, borderBottomColor: colors.divider }]}>
            <View style={styles.rowLeft}>
              <Ionicons name="finger-print-outline" size={22} color="#FF6B35" style={styles.icon} />
              <View style={{ flex: 1 }}>
                <Text style={[styles.rowLabel, { color: colors.textPrimary }]}>{t('accountSecurity.biometrics')}</Text>
                <Text style={[styles.rowSubLabel, { color: colors.textSecondary }]}>{t('accountSecurity.biometricsDesc')}</Text>
              </View>
            </View>
            <Switch
              value={biometrics}
              onValueChange={setBiometrics}
              trackColor={{ false: '#767577', true: '#FF6B35' }}
              thumbColor={Platform.OS === 'android' ? '#f4f3f4' : undefined}
            />
          </View>

          {/* Face ID Toggle */}
          <View style={[styles.rowSwitch, { borderBottomWidth: 1, borderBottomColor: colors.divider }]}>
            <View style={styles.rowLeft}>
              <Ionicons name="scan-outline" size={22} color="#FF6B35" style={styles.icon} />
              <View style={{ flex: 1 }}>
                <Text style={[styles.rowLabel, { color: colors.textPrimary }]}>{t('accountSecurity.faceId')}</Text>
                <Text style={[styles.rowSubLabel, { color: colors.textSecondary }]}>{t('accountSecurity.faceIdDesc')}</Text>
              </View>
            </View>
            <Switch
              value={faceId}
              onValueChange={setFaceId}
              trackColor={{ false: '#767577', true: '#FF6B35' }}
              thumbColor={Platform.OS === 'android' ? '#f4f3f4' : undefined}
            />
          </View>

          {/* SMS Authenticator Toggle */}
          <View style={[styles.rowSwitch, { borderBottomWidth: 1, borderBottomColor: colors.divider }]}>
            <View style={styles.rowLeft}>
              <Ionicons name="chatbox-ellipses-outline" size={22} color="#FF6B35" style={styles.icon} />
              <View style={{ flex: 1 }}>
                <Text style={[styles.rowLabel, { color: colors.textPrimary }]}>{t('accountSecurity.smsAuth')}</Text>
                <Text style={[styles.rowSubLabel, { color: colors.textSecondary }]}>{t('accountSecurity.smsAuthDesc')}</Text>
              </View>
            </View>
            <Switch
              value={smsAuth}
              onValueChange={setSmsAuth}
              trackColor={{ false: '#767577', true: '#FF6B35' }}
              thumbColor={Platform.OS === 'android' ? '#f4f3f4' : undefined}
            />
          </View>

          {/* Google Authenticator Toggle */}
          <View style={styles.rowSwitch}>
            <View style={styles.rowLeft}>
              <Ionicons name="phone-portrait-outline" size={22} color="#FF6B35" style={styles.icon} />
              <View style={{ flex: 1 }}>
                <Text style={[styles.rowLabel, { color: colors.textPrimary }]}>{t('accountSecurity.googleAuth')}</Text>
                <Text style={[styles.rowSubLabel, { color: colors.textSecondary }]}>{t('accountSecurity.googleAuthDesc')}</Text>
              </View>
            </View>
            <Switch
              value={googleAuth}
              onValueChange={setGoogleAuth}
              trackColor={{ false: '#767577', true: '#FF6B35' }}
              thumbColor={Platform.OS === 'android' ? '#f4f3f4' : undefined}
            />
          </View>
        </View>

        <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>{t('accountSecurity.sessions')}</Text>
        <View style={[styles.groupCard, { backgroundColor: colors.surface }]}>
          {/* Device Management Row */}
          <TouchableOpacity style={styles.row} onPress={handleDeviceMgmt} activeOpacity={0.7}>
            <View style={styles.rowLeft}>
              <Ionicons name="hardware-chip-outline" size={22} color="#FF6B35" style={styles.icon} />
              <View style={{ flex: 1 }}>
                <Text style={[styles.rowLabel, { color: colors.textPrimary }]}>{t('accountSecurity.deviceMgmt')}</Text>
                <Text style={[styles.rowSubLabel, { color: colors.textSecondary }]}>{t('accountSecurity.deviceMgmtDesc')}</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={18} color={colors.textTertiary} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
