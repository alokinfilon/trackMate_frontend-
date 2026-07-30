import React from 'react';
import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useTheme } from '../../../../context/ThemeContext';
import { useHelpSupport } from './help-support.hooks';
import { createStyles } from './help-support.styles';
import { strings } from './help-support.strings';

export default function HelpSupportScreen({ navigation }) {
  const { colors, isDarkMode } = useTheme();
  const styles = React.useMemo(() => createStyles(colors, isDarkMode), [colors, isDarkMode]);

  const {
    message,
    setMessage,
    sending,
    showContactForm,
    setShowContactForm,
    handleSendMessage,
  } = useHelpSupport();

  const OptionRow = ({ icon, label, onPress }) => (
    <TouchableOpacity
      style={[styles.row, { borderBottomWidth: 1, borderBottomColor: colors.divider }]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.rowLeft}>
        <Ionicons name={icon} size={20} color={colors.primary} />
        <Text style={[styles.label, { color: colors.textPrimary }]}>{label}</Text>
      </View>
      <Ionicons name="chevron-forward" size={16} color={colors.textTertiary} />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDarkMode ? colors.bg : '#FFFFFF' }]} edges={['top']}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.textPrimary }]}>{strings.headerTitle}</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>{strings.sectionTitle}</Text>
        
        <View style={[styles.card, { backgroundColor: colors.surface }]}>
          <OptionRow
            icon="help-circle-outline"
            label={strings.optFaqs}
            onPress={() => navigation.navigate('Faq')}
          />

          <OptionRow
            icon="document-text-outline"
            label={strings.optTerms}
            onPress={() => navigation.navigate('PrivacyTerms', { type: 'terms' })}
          />

          <OptionRow
            icon="document-lock-outline"
            label={strings.optPrivacy}
            onPress={() => navigation.navigate('PrivacyTerms', { type: 'privacy-policy' })}
          />

          <TouchableOpacity
            style={styles.row}
            onPress={() => setShowContactForm(!showContactForm)}
            activeOpacity={0.7}
          >
            <View style={styles.rowLeft}>
              <Ionicons name="mail-outline" size={20} color={colors.primary} />
              <Text style={[styles.label, { color: colors.textPrimary }]}>{strings.optContact}</Text>
            </View>
            <Ionicons
              name={showContactForm ? 'chevron-up' : 'chevron-down'}
              size={16}
              color={colors.textTertiary}
            />
          </TouchableOpacity>
        </View>

        {showContactForm && (
          <View style={styles.contactFormContainer}>
            <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>{strings.contactSecTitle}</Text>
            <View style={[styles.contactCard, { backgroundColor: colors.surface }]}>
              <TextInput
                style={[styles.input, { borderColor: colors.divider, color: colors.textPrimary }]}
                multiline
                numberOfLines={4}
                value={message}
                onChangeText={setMessage}
                placeholder={strings.contactPlaceholder}
                placeholderTextColor={colors.textTertiary}
              />
              <TouchableOpacity
                style={[styles.sendButton, { backgroundColor: colors.primary }]}
                onPress={handleSendMessage}
                disabled={sending}
              >
                {sending ? (
                  <ActivityIndicator color="#FFFFFF" />
                ) : (
                  <Text style={styles.sendButtonText}>{strings.sendBtn}</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
