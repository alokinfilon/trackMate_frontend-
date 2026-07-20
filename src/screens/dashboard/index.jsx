import { 
ScrollView
} from 'react-native';

import KitPieChart from '../chart/KitPieChart';


import TripDashboardList from './TripDashboardList'; // 1. Import toggle list

export default function Dashboard() {
  return (
    <ScrollView>
      <KitPieChart />
      <TripDashboardList /> {/* 2. Render inside core layout */}
    </ScrollView>
  );
}
