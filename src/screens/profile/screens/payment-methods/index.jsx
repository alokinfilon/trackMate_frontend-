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
import { useTheme } from '../../../../context/ThemeContext';
import { usePaymentMethods } from './payment-methods.hooks';
import { createStyles } from './payment-methods.styles';
import { strings, SAVED_CARDS } from './payment-methods.strings';

export default function PaymentMethodsScreen({ navigation }) {
  const { colors, isDarkMode } = useTheme();
  const styles = React.useMemo(() => createStyles(colors, isDarkMode), [colors, isDarkMode]);

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
        <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>{strings.savedTitle}</Text>

        {SAVED_CARDS.map((card) => (
          <View key={card.id} style={[styles.cardContainer, { backgroundColor: colors.surface, borderColor: colors.divider }]}>
            <View style={styles.cardHeader}>
              <View style={styles.cardHeaderLeft}>
                <Ionicons
                  name={card.id === 'visa' ? 'card' : 'card-outline'}
                  size={24}
                  color={card.default ? colors.primary : colors.textSecondary}
                />
                <Text style={[styles.cardName, { color: colors.textPrimary }]}>{card.label}</Text>
              </View>
              <TouchableOpacity style={styles.removeBtn}>
                <Text style={[styles.removeBtnText, { color: colors.danger }]}>Remove</Text>
              </TouchableOpacity>
            </View>
            <Text style={[styles.cardNumber, { color: colors.textPrimary }]}>{card.number}</Text>
            <View style={styles.cardFooter}>
              <Text style={[styles.cardExpiry, { color: colors.textSecondary }]}>Expiry: {card.expiry}</Text>
              {card.default && (
                <View style={styles.defaultBadge}>
                  <Text style={styles.defaultText}>Default</Text>
                </View>
              )}
            </View>
          </View>
        ))}

        <TouchableOpacity style={[styles.addButton, { borderColor: colors.primary }]}>
          <Ionicons name="add" size={20} color={colors.primary} />
          <Text style={[styles.addButtonText, { color: colors.primary }]}>{strings.addBtn}</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
