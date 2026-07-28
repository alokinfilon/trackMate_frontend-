import React, { useMemo } from 'react';
import { ScrollView, StatusBar, View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import KitPieChart from '../chart/KitPieChart';
import TripDashboardList from './TripDashboardList'; 
import { useTheme } from '../../context/ThemeContext';
import { createDashboardStyles } from './dashboard.styles';

export default function Dashboard() {
  const { colors, isDarkMode } = useTheme();
  
  const styles = useMemo(() => createDashboardStyles(colors), [colors]);

  return (
    <View style={styles.screenContainer}>
      <StatusBar 
        barStyle={isDarkMode ? "light-content" : "dark-content"} 
        backgroundColor={colors.bg} 
        translucent={false}
      />
      
      <SafeAreaView
        style={styles.mainContainer}
        edges={['top', 'left', 'right']}
      >
        <ScrollView 
          style={styles.container}
          showsVerticalScrollIndicator={false}  
        >
          {/* Greeting Header */}
          <View style={styles.greetingContainer}>
            <Text style={styles.greetingText}>Dashboard 📊</Text>
            <Text style={styles.greetingSubText}>Your trip analytics at a glance</Text>
          </View>
          
          <KitPieChart />
          <TripDashboardList />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
