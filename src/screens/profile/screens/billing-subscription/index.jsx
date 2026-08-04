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
import LinearGradient from 'react-native-linear-gradient';
import { useTheme } from '../../../../context';
import { createStyles } from './billing-subscription.styles';
import { strings, INVOICES } from './billing-subscription.strings';

import { Arrow } from '../../../../components';

export default function BillingSubscriptionScreen({ navigation }) {
  const { colors, isDarkMode, gradients } = useTheme();
  const styles = React.useMemo(() => createStyles(colors, isDarkMode), [colors, isDarkMode]);

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

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Premium Membership Card */}
        <LinearGradient
          colors={gradients.primaryShift}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.card}
        >
          <View style={styles.cardHeader}>
            <Text style={styles.cardLabel}>{strings.cardLabel}</Text>
            <Ionicons name="crown" size={24} color="#FFD60A" />
          </View>
          <View style={styles.cardBody}>
            <Text style={styles.cardTitle}>{strings.cardTitle}</Text>
            <Text style={styles.cardText}>{strings.cardText}</Text>
          </View>
        </LinearGradient>

        {/* Billing Details */}
        <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>{strings.billingSecTitle}</Text>
        <View style={[styles.groupCard, { backgroundColor: colors.surface }]}>
          <View style={[styles.row, { borderBottomWidth: 1, borderBottomColor: colors.divider }]}>
            <Text style={[styles.rowLabel, { color: colors.textPrimary }]}>{strings.billingCycle}</Text>
            <Text style={[styles.rowValue, { color: colors.textSecondary }]}>{strings.billingCycleVal}</Text>
          </View>
          <View style={styles.row}>
            <Text style={[styles.rowLabel, { color: colors.textPrimary }]}>{strings.paymentMethod}</Text>
            <Text style={[styles.rowValue, { color: colors.textSecondary }]}>{strings.paymentMethodVal}</Text>
          </View>
        </View>

        {/* Invoice History */}
        <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>{strings.invoiceSecTitle}</Text>
        <View style={[styles.groupCard, { backgroundColor: colors.surface }]}>
          {INVOICES.map((inv, idx) => {
            const isLast = idx === INVOICES.length - 1;
            return (
              <View
                key={inv.id}
                style={[styles.row, !isLast && { borderBottomWidth: 1, borderBottomColor: colors.divider }]}
              >
                <View>
                  <Text style={[styles.invoiceDate, { color: colors.textPrimary }]}>{inv.date}</Text>
                  <Text style={[styles.invoiceId, { color: colors.textTertiary }]}>{inv.id}</Text>
                </View>
                <Text style={[styles.invoiceAmount, { color: colors.textPrimary }]}>{inv.amount}</Text>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
