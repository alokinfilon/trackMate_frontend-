import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useTheme, useTranslation } from '../../../../context';
import { useChangePassword } from './change-password.hooks';
import { createStyles } from './change-password.styles';
import { Arrow } from '../../../../components';

export default function ChangePasswordScreen({ navigation }) {
  const { colors, isDarkMode } = useTheme();
  const styles = React.useMemo(() => createStyles(colors, isDarkMode), [colors, isDarkMode]);
  const { t } = useTranslation();

  const {
    currentPassword,
    setCurrentPassword,
    newPassword,
    setNewPassword,
    confirmPassword,
    setConfirmPassword,
    currentPasswordVisible,
    setCurrentPasswordVisible,
    newPasswordVisible,
    setNewPasswordVisible,
    confirmPasswordVisible,
    setConfirmPasswordVisible,
    saving,
    handleSave,
  } = useChangePassword(navigation);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDarkMode ? colors.bg : '#FFFFFF' }]} edges={['top']}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Arrow size={28} color={isDarkMode ? '#FFFFFF' : '#000000'} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.textPrimary }]}>{t('changePassword.title')}</Text>
        <View style={{ width: 40 }} />
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
          
          {/* Current Password Field */}
          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: colors.textSecondary }]}>{t('changePassword.current')}</Text>
            <View style={[styles.inputWrap, { backgroundColor: colors.surface, borderColor: colors.divider }]}>
              <TextInput
                style={[styles.input, { color: colors.textPrimary }]}
                value={currentPassword}
                onChangeText={setCurrentPassword}
                secureTextEntry={!currentPasswordVisible}
                placeholder={t('changePassword.enterCurrent')}
                placeholderTextColor={colors.textTertiary}
                autoCapitalize="none"
              />
              <TouchableOpacity
                style={styles.visibilityBtn}
                onPress={() => setCurrentPasswordVisible(!currentPasswordVisible)}
              >
                <Ionicons
                  name={currentPasswordVisible ? 'eye-outline' : 'eye-off-outline'}
                  size={20}
                  color={colors.textSecondary}
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* New Password Field */}
          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: colors.textSecondary }]}>{t('changePassword.new')}</Text>
            <View style={[styles.inputWrap, { backgroundColor: colors.surface, borderColor: colors.divider }]}>
              <TextInput
                style={[styles.input, { color: colors.textPrimary }]}
                value={newPassword}
                onChangeText={setNewPassword}
                secureTextEntry={!newPasswordVisible}
                placeholder={t('changePassword.enterNew')}
                placeholderTextColor={colors.textTertiary}
                autoCapitalize="none"
              />
              <TouchableOpacity
                style={styles.visibilityBtn}
                onPress={() => setNewPasswordVisible(!newPasswordVisible)}
              >
                <Ionicons
                  name={newPasswordVisible ? 'eye-outline' : 'eye-off-outline'}
                  size={20}
                  color={colors.textSecondary}
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Confirm New Password Field */}
          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: colors.textSecondary }]}>{t('changePassword.confirm')}</Text>
            <View style={[styles.inputWrap, { backgroundColor: colors.surface, borderColor: colors.divider }]}>
              <TextInput
                style={[styles.input, { color: colors.textPrimary }]}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={!confirmPasswordVisible}
                placeholder={t('changePassword.confirmNew')}
                placeholderTextColor={colors.textTertiary}
                autoCapitalize="none"
              />
              <TouchableOpacity
                style={styles.visibilityBtn}
                onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
              >
                <Ionicons
                  name={confirmPasswordVisible ? 'eye-outline' : 'eye-off-outline'}
                  size={20}
                  color={colors.textSecondary}
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Submit Button */}
          <TouchableOpacity
            style={[styles.saveButton, { backgroundColor: '#FF6B35' }]}
            onPress={handleSave}
            disabled={saving}
          >
            {saving ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={styles.saveButtonText}>{t('changePassword.saveBtn')}</Text>
            )}
          </TouchableOpacity>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
