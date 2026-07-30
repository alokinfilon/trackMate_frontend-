import React from 'react';
import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useTheme } from '../../../../context/ThemeContext';
import { useRateUs } from './rate-us.hooks';
import { createStyles } from './rate-us.styles';
import { strings } from './rate-us.strings';

export default function RateUsScreen({ navigation }) {
  const { colors, isDarkMode } = useTheme();
  const styles = React.useMemo(() => createStyles(colors, isDarkMode), [colors, isDarkMode]);

  const {
    rating,
    setRating,
    feedback,
    setFeedback,
    submitRating,
  } = useRateUs(navigation);

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

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={[styles.title, { color: colors.textPrimary }]}>{strings.title}</Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>{strings.subtitle}</Text>

        <View style={styles.starsContainer}>
          {[1, 2, 3, 4, 5].map((star) => {
            const isFilled = star <= rating;
            return (
              <TouchableOpacity
                key={star}
                onPress={() => setRating(star)}
                activeOpacity={0.7}
              >
                <Ionicons
                  name={isFilled ? 'star' : 'star-outline'}
                  size={42}
                  color={isFilled ? '#FFD60A' : colors.textTertiary}
                />
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={styles.feedbackCard}>
          <Text style={[styles.feedbackLabel, { color: colors.textSecondary }]}>{strings.feedbackLabel}</Text>
          <TextInput
            style={[styles.input, { borderColor: colors.divider, color: colors.textPrimary }]}
            multiline
            numberOfLines={4}
            value={feedback}
            onChangeText={setFeedback}
            placeholder={strings.feedbackPlaceholder}
            placeholderTextColor={colors.textTertiary}
          />
        </View>

        <TouchableOpacity
          style={[styles.submitButton, { backgroundColor: colors.primary }]}
          onPress={submitRating}
        >
          <Text style={styles.submitButtonText}>{strings.submitBtn}</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
