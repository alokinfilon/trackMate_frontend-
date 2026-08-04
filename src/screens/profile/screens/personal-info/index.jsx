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
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme, useTranslation } from '../../../../context';
import { usePersonalInfo } from './personal-info.hooks';
import { createStyles } from './personal-info.styles';
import { EditPenIcon, Arrow } from '../../../../components';

export default function PersonalInfoScreen({ navigation }) {
  const { colors, isDarkMode } = useTheme();
  const styles = React.useMemo(() => createStyles(colors, isDarkMode), [colors, isDarkMode]);
  const { t } = useTranslation();

  const {
    loading,
    saving,
    name,
    setName,
    email,
    phone,
    location,
    setLocation,
    userImage,
    selectedPhoto,
    selectImage,
    handleSave,
  } = usePersonalInfo(navigation);

  if (loading) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: isDarkMode ? colors.bg : '#FFFFFF' }]} edges={['top']}>
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      </SafeAreaView>
    );
  }

  const avatarUri = selectedPhoto ? selectedPhoto.uri : userImage;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDarkMode ? colors.bg : '#FFFFFF' }]} edges={['top']}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Arrow size={28} color={isDarkMode ? '#FFFFFF' : '#000000'} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.textPrimary }]}>{t('personalInfo.title')}</Text>
        <View style={{ width: 40 }} />
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Avatar Container */}
          <View style={styles.avatarWrap}>
            <View style={[styles.avatar, { backgroundColor: isDarkMode ? '#2D3748' : '#E2E8F0' }]}>
              {avatarUri ? (
                <Image source={{ uri: avatarUri }} style={{ width: '100%', height: '100%' }} />
              ) : (
                <Text style={[styles.avatarInitial, { color: colors.textPrimary }]}>
                  {(name || 'U').charAt(0).toUpperCase()}
                </Text>
              )}
            </View>
            <TouchableOpacity style={styles.editAvatarBtn} onPress={selectImage}>
              <EditPenIcon size={16} color="#FF6B35" />
            </TouchableOpacity>
          </View>

          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: colors.textSecondary }]}>{t('personalInfo.fullName')}</Text>
            <TextInput
              style={[styles.input, { backgroundColor: colors.surface, color: colors.textPrimary, borderColor: colors.divider }]}
              value={name}
              onChangeText={setName}
              placeholder={t('personalInfo.fullName')}
              placeholderTextColor={colors.textTertiary}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: colors.textSecondary }]}>{t('personalInfo.email')}</Text>
            <TextInput
              style={[styles.input, { backgroundColor: colors.surface, color: colors.textTertiary, borderColor: colors.divider }]}
              value={email}
              editable={false}
              keyboardType="email-address"
              autoCapitalize="none"
              placeholder={t('personalInfo.email')}
              placeholderTextColor={colors.textTertiary}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: colors.textSecondary }]}>{t('personalInfo.phone')}</Text>
            <TextInput
              style={[styles.input, { backgroundColor: colors.surface, color: colors.textTertiary, borderColor: colors.divider }]}
              value={phone || 'None'}
              editable={false}
              keyboardType="phone-pad"
              placeholder={t('personalInfo.phone')}
              placeholderTextColor={colors.textTertiary}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: colors.textSecondary }]}>{t('personalInfo.location')}</Text>
            <TextInput
              style={[styles.input, { backgroundColor: colors.surface, color: colors.textPrimary, borderColor: colors.divider }]}
              value={location}
              onChangeText={setLocation}
              placeholder={t('personalInfo.location')}
              placeholderTextColor={colors.textTertiary}
            />
          </View>

          <TouchableOpacity
            style={[styles.saveButton, { backgroundColor: '#FF6B35' }]}
            onPress={handleSave}
            disabled={saving}
          >
            {saving ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={styles.saveButtonText}>{t('personalInfo.saveBtn')}</Text>
            )}
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
