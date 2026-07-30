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
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useTheme } from '../../../../context/ThemeContext';
import { useTravelPreference } from './travel-preference.hooks';
import { createStyles } from './travel-preference.styles';
import { useTranslation } from '../../../../context/LanguageContext';

export default function TravelPreferenceScreen({ navigation }) {
  const { colors, isDarkMode } = useTheme();
  const styles = React.useMemo(() => createStyles(colors, isDarkMode), [colors, isDarkMode]);
  const { t } = useTranslation();

  const {
    currentStep,
    categories,
    activeCategory,
    selections,
    loading,
    submitting,
    toggleOption,
    handleNext,
    handleBack
  } = useTravelPreference(navigation);

  if (loading) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: isDarkMode ? colors.bg : '#FFFFFF' }]} edges={['top']}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#FF6B35" />
        </View>
      </SafeAreaView>
    );
  }

  const stepProgress = categories.length > 0 ? (currentStep + 1) / categories.length : 0;
  const currentSelections = selections[activeCategory.category] || [];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDarkMode ? colors.bg : '#FFFFFF' }]} edges={['top']}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#FF6B35" />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.textPrimary }]}>{t('travelPreference.title')}</Text>
        <View style={{ width: 40 }} />
      </View>

      {/* Progress Bar & Indicators */}
      <View style={styles.progressWrap}>
        <Text style={[styles.stepText, { color: colors.textSecondary }]}>
          Step {currentStep + 1} of {categories.length}
        </Text>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${stepProgress * 100}%` }]} />
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={[styles.title, { color: colors.textPrimary }]}>
          {t(`travelPreference.title_${activeCategory.category}`) || activeCategory.title}
        </Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          {t(`travelPreference.subtitle_${activeCategory.category}`) || activeCategory.subtitle}
        </Text>

        {/* Circular Selection Grid */}
        <View style={styles.grid}>
          {activeCategory.options?.map((opt) => {
            const isSelected = currentSelections.includes(opt.label);
            return (
              <TouchableOpacity
                key={opt.id}
                onPress={() => toggleOption(opt.label)}
                style={styles.gridItem}
                activeOpacity={0.8}
              >
                <View
                  style={[
                    styles.circleWrap,
                    {
                      borderColor: isSelected ? '#FF6B35' : isDarkMode ? '#4A5568' : '#CBD5E0',
                      borderWidth: isSelected ? 2.5 : 1.5,
                    },
                  ]}
                >
                  <Text style={styles.circleEmoji}>{opt.emoji}</Text>
                  
                  {/* Selected checkmark overlay */}
                  {isSelected && (
                    <View style={styles.checkmarkWrap}>
                      <Ionicons name="checkmark-circle" size={26} color="#FF6B35" />
                    </View>
                  )}
                </View>
                <Text style={[styles.circleLabel, { color: colors.textPrimary }]}>{opt.label}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Action Button */}
        <TouchableOpacity
          style={[styles.saveButton, { backgroundColor: '#FF6B35' }]}
          onPress={handleNext}
          disabled={submitting}
        >
          {submitting ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.saveButtonText}>
              {currentStep === categories.length - 1 ? t('common.finish') : t('common.next')}
            </Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
