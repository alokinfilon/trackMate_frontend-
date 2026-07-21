import React, { useMemo } from 'react';
import { ScrollView, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';

import KitPieChart from '../chart/KitPieChart';
import TripDashboardList from './TripDashboardList'; 
import { useTheme } from '../../context/ThemeContext';
import { createDashboardStyles } from './dashboard.styles';

export default function Dashboard() {
  const { colors, isDarkMode, gradients } = useTheme();
  
  const styles = useMemo(() => createDashboardStyles(colors), [colors]);

  return (
    <LinearGradient
      colors={[isDarkMode ? '#1E293B' : '#ace9fd', colors.bg]}
      start={{ x: 1, y: 0 }}
      end={{ x: 0, y: 0.98 }}
      style={styles.screenContainer}
    >
      <StatusBar 
        barStyle={isDarkMode ? "light-content" : "dark-content"} 
        backgroundColor="transparent" 
        translucent 
      />
      
      <SafeAreaView
        style={styles.mainContainer}
        edges={['top', 'left', 'right']}
      >
        <ScrollView 
          style={styles.container}
          showsVerticalScrollIndicator={false}  
        >
          <KitPieChart />
          <TripDashboardList />
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}
