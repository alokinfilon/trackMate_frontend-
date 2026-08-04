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
import { useTheme } from '../../../../context';
import { useFaq } from './faq.hooks';
import { createStyles } from './faq.styles';
import { strings } from './faq.strings';

import { Arrow } from '../../../../components';

export default function FaqScreen({ navigation }) {
  const { colors, isDarkMode } = useTheme();
  const styles = React.useMemo(() => createStyles(colors, isDarkMode), [colors, isDarkMode]);

  const {
    faqs,
    loading,
    expandedIndex,
    toggleExpand,
    searchQuery,
    setSearchQuery,
  } = useFaq();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDarkMode ? colors.bg : '#FFFFFF' }]} edges={['top']}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Arrow size={28} color={isDarkMode ? '#FFFFFF' : '#000000'} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.textPrimary }]}>{strings.headerTitle}</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={[styles.searchBox, { backgroundColor: colors.surface, borderColor: colors.divider }]}>
          <Ionicons name="search-outline" size={18} color={colors.textSecondary} />
          <TextInput
            style={[styles.searchInput, { color: colors.textPrimary }]}
            placeholder={strings.searchPlaceholder}
            placeholderTextColor={colors.textTertiary}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery ? (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={18} color={colors.textSecondary} />
            </TouchableOpacity>
          ) : null}
        </View>

        {loading ? (
          <ActivityIndicator size="small" color={colors.primary} style={{ marginVertical: 12 }} />
        ) : (
          <View style={styles.faqList}>
            {faqs.length > 0 ? (
              faqs.map((faq, index) => {
                const isExpanded = expandedIndex === index;
                return (
                  <View key={index} style={[styles.faqItem, { backgroundColor: colors.surface, borderColor: colors.divider }]}>
                    <TouchableOpacity
                      style={styles.faqHeader}
                      onPress={() => toggleExpand(index)}
                      activeOpacity={0.7}
                    >
                      <Text style={[styles.faqQuestion, { color: colors.textPrimary }]}>{faq.question}</Text>
                      <Ionicons
                        name={isExpanded ? 'chevron-up' : 'chevron-down'}
                        size={18}
                        color={colors.textSecondary}
                      />
                    </TouchableOpacity>
                    {isExpanded && (
                      <View style={[styles.faqBody, { borderTopWidth: 1, borderTopColor: colors.divider }]}>
                        <Text style={[styles.faqAnswer, { color: colors.textSecondary }]}>{faq.answer}</Text>
                      </View>
                    )}
                  </View>
                );
              })
            ) : (
              <Text style={[styles.emptyText, { color: colors.textTertiary }]}>{strings.emptyText}</Text>
            )}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
