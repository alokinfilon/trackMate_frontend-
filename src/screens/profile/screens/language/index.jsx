import React from 'react';
import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useTheme, useTranslation } from '../../../../context';
import { useLanguage } from './language.hooks';
import { createStyles } from './language.styles';
import { LANGUAGES } from './language.strings';

import { Arrow } from '../../../../components';

export default function LanguageScreen({ navigation }) {
  const { colors, isDarkMode } = useTheme();
  const styles = React.useMemo(() => createStyles(colors, isDarkMode), [colors, isDarkMode]);

  const { selectedLang, setSelectedLang } = useLanguage();
  const { t } = useTranslation();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDarkMode ? colors.bg : '#FFFFFF' }]} edges={['top']}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Arrow size={28} color={isDarkMode ? '#FFFFFF' : '#000000'} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.textPrimary }]}>{t('language.title')}</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>{t('language.sub')}</Text>

        <View style={[styles.groupCard, { backgroundColor: colors.surface }]}>
          {LANGUAGES.map((lang, index) => {
            const isSelected = selectedLang === lang.code;
            const isLast = index === LANGUAGES.length - 1;
            return (
              <TouchableOpacity
                key={lang.code}
                style={[
                  styles.row,
                  !isLast && { borderBottomWidth: 1, borderBottomColor: colors.divider },
                ]}
                onPress={() => setSelectedLang(lang.code)}
              >
                <Text style={[styles.rowLabel, { color: colors.textPrimary }]}>{lang.label}</Text>
                {isSelected && <Ionicons name="checkmark" size={20} color="#FF6B35" />}
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
