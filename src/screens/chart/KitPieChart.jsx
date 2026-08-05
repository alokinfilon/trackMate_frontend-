import React, { useEffect, useState } from 'react';
import { View, Dimensions, Text, ActivityIndicator } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { authService, httpService } from '../../services';
import { useTheme } from '../../context';
import { createStyles } from './KitPieChart.styles';

const screenWidth = Dimensions.get('window').width;

export default function KitPieChart() {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { colors, isDarkMode } = useTheme();
  const styles = React.useMemo(() => createStyles(colors, isDarkMode), [colors, isDarkMode]);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const token = await authService.getAccessToken();

        if (!token) {
          setError("Session expired. Please log in again.");
          setLoading(false);
          return;
        }

        const response = await httpService.trips.getAnalytics();

        const rawText = await response.text();

        if (rawText.trim().startsWith('<')) {
          setError("Server is warming up. Please pull to refresh.");
          setLoading(false);
          return;
        }

        const json = JSON.parse(rawText);

        if (json.success && json.chartData) {
          const rawData = json.chartData;

          const statusColors = {
            'upcoming': '#6C63FF',
            'partially completed': '#ED8936',
            'completed': '#38B2AC',
            'cancelled': '#E53E3E',
          };

          const formattedData = Object.keys(rawData)
            .filter((key) => rawData[key] > 0)
            .map((key) => ({
              name: key.charAt(0).toUpperCase() + key.slice(1),
              population: rawData[key],
              color: statusColors[key] || colors.textTertiary,
              legendFontColor: colors.textSecondary,
              legendFontSize: 13,
            }));

          setChartData(formattedData);
        } else {
          setError(json.error || 'Failed to process chart data.');
        }
      } catch (err) {
        console.error("Network Error: ", err);
        setError('Network connection error.');
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" color="#6C63FF" />
        <Text style={styles.loadingText}>Compiling Trip Metrics...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.container, styles.center]}>
        <Text style={styles.errorText}>⚠️ {error}</Text>
      </View>
    );
  }

  if (chartData.length === 0) {
    return (
      <View style={[styles.container, styles.center]}>
        <Text style={styles.title}>Trip Overview</Text>
        <Text style={styles.noDataText}>No trip details logged yet.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerRow}>
        <Text style={{ fontSize: 20 }}>📊</Text>
        <Text style={styles.title}>Trip Overview</Text>
      </View>
      <Text style={styles.subtitle}>Status distribution across all trips</Text>

      {/* Chart — no default legend */}
      <PieChart
        data={chartData}
        width={screenWidth - 72}
        height={200}
        chartConfig={{
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        }}
        accessor={"population"}
        backgroundColor={"transparent"}
        paddingLeft={"15"}
        hasLegend={false}
        absolute
      />

      {/* Custom Neumorphic Legend */}
      <View style={styles.legendContainer}>
        {chartData.map((item, index) => (
          <View key={index} style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: item.color }]} />
            <Text style={styles.legendText}>{item.name}</Text>
            <Text style={styles.legendCount}>{item.population}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}
