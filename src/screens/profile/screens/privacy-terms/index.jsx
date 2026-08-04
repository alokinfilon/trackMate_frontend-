import React from 'react';
import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../../../context';
import { usePrivacyTerms } from './privacy-terms.hooks';
import { createStyles } from './privacy-terms.styles';
import { strings } from './privacy-terms.strings';

import { Arrow } from '../../../../components';

export default function PrivacyTermsScreen({ route, navigation }) {
  const { type } = route.params;
  const { colors, isDarkMode } = useTheme();
  const styles = React.useMemo(() => createStyles(colors, isDarkMode), [colors, isDarkMode]);

  const title = type === 'privacy-policy' ? strings.privacyTitle : strings.termsTitle;
  const { content, loading } = usePrivacyTerms(type, title);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDarkMode ? colors.bg : '#FFFFFF' }]} edges={['top']}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Arrow size={28} color={isDarkMode ? '#FFFFFF' : '#000000'} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.textPrimary }]}>{title}</Text>
        <View style={{ width: 40 }} />
      </View>

      {loading ? (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Text style={[styles.bodyText, { color: colors.textPrimary }]}>{content}</Text>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}
