import React, { useEffect, useState } from 'react';
import { View, Dimensions, Text, ActivityIndicator } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import authService from '../../services/authService';
import { useTheme } from '../../context/ThemeContext';
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

        const response = await fetch('https://trackmate-x7ue.onrender.com/api/trips/analytics/chart-stats', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

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
            'upcoming': '#4D96FF',
            'partially completed': '#FFD93D',
            'completed': '#6BCB77',
            'cancelled': '#FF6B6B',
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
  }, []);

  if (loading) {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" color={colors.primary} />
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
        <Text style={styles.title}>Trip Overview Status</Text>
        <Text style={styles.noDataText}>No trip details logged yet.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Trip Overview Status</Text>
      <PieChart
        data={chartData}
        width={screenWidth - 40}
        height={220}
        chartConfig={{
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        }}
        accessor={"population"}
        backgroundColor={"transparent"}
        paddingLeft={"15"}
        absolute
      />
    </View>
  );
}
