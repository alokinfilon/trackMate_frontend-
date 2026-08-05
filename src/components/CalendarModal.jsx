import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Dimensions,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useTheme } from '../context';
import { AppModal } from './modal';
import ArrowLeftIcon from './svg/arrow';
import { Tokens } from '../theme/theme';

const { width } = Dimensions.get('window');
const maxCardWidth = 364;
const cardWidth = Math.min(width - 48, maxCardWidth);
const contentWidth = cardWidth - 48;
const cellWidth = contentWidth / 7;

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const WEEKDAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

export default function CalendarModal({ visible, onClose, onSelectDate, initialDate }) {
  const { colors, isDarkMode } = useTheme();

  // Parse initial date
  const parsedDate = useMemo(() => {
    if (!initialDate) return new Date();
    const d = new Date(initialDate);
    return isNaN(d.getTime()) ? new Date() : d;
  }, [initialDate]);

  const [currentYear, setCurrentYear] = useState(parsedDate.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(parsedDate.getMonth());

  const isDateBeforeToday = (day) => {
    if (!day) return true;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const cellDate = new Date(currentYear, currentMonth, day);
    cellDate.setHours(0, 0, 0, 0);
    return cellDate < today;
  };

  // Date selection calculations
  const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

  const dayCells = useMemo(() => {
    const firstDayIndex = getFirstDayOfMonth(currentYear, currentMonth);
    const daysCount = getDaysInMonth(currentYear, currentMonth);
    const cells = [];

    // Pads
    for (let i = 0; i < firstDayIndex; i++) {
      cells.push(null);
    }
    // Days
    for (let d = 1; d <= daysCount; d++) {
      cells.push(d);
    }
    return cells;
  }, [currentYear, currentMonth]);

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(y => y - 1);
    } else {
      setCurrentMonth(m => m - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(y => y + 1);
    } else {
      setCurrentMonth(m => m + 1);
    }
  };

  const handleDaySelect = (day) => {
    if (!day) return;
    if (isDateBeforeToday(day)) return;
    const formattedMonth = String(currentMonth + 1).padStart(2, '0');
    const formattedDay = String(day).padStart(2, '0');
    const selectedDateStr = `${currentYear}-${formattedMonth}-${formattedDay}`;
    onSelectDate(selectedDateStr);
    onClose();
  };

  // Styles defined dynamically to support dynamic dark/light mode switches
  const styles = StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    modalContainer: {
      width: width - 40,
      backgroundColor: isDarkMode ? '#1E1E1E' : '#FFFFFF',
      borderRadius: 24,
      padding: 20,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.15,
      shadowRadius: 10,
      elevation: 5,
    },
    headerRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 16,
    },
    headerTitle: {
      fontSize: 16,
      fontFamily: Tokens.typography.families.semiBold,
      color: colors.textPrimary,
    },
    navBtn: {
      padding: 8,
      borderRadius: 8,
      backgroundColor: isDarkMode ? '#2D3748' : '#F3F4F6',
    },
    weekdaysRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 10,
      borderBottomWidth: 1,
      borderBottomColor: isDarkMode ? '#2D3748' : '#F1F5F9',
      paddingBottom: 6,
    },
    weekdayCell: {
      width: cellWidth,
      textAlign: 'center',
      fontSize: 12,
      fontFamily: Tokens.typography.families.semiBold,
      color: '#9CA3AF',
    },
    gridContent: {
      justifyContent: 'center',
    },
    dayCell: {
      width: cellWidth,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
      marginVertical: 2,
    },
    dayText: {
      fontSize: 13,
      fontFamily: Tokens.typography.families.medium,
      color: colors.textPrimary,
    },
    selectedDayCell: {
      backgroundColor: '#FF6B35',
      borderRadius: 20,
    },
    selectedDayText: {
      color: '#FFFFFF',
      fontFamily: Tokens.typography.families.semiBold,
    },
    emptyCell: {
      width: cellWidth,
      height: 40,
    },
    closeBtn: {
      marginTop: 18,
      paddingVertical: 12,
      borderRadius: 16,
      backgroundColor: isDarkMode ? '#2D3748' : '#F3F4F6',
      alignItems: 'center',
    },
    closeBtnText: {
      fontFamily: Tokens.typography.families.semiBold,
      fontSize: 14,
      color: colors.textPrimary,
    }
  });

  return (
    <AppModal title="Select Date" visible={visible} onClose={onClose}>
      {/* Header */}
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={handlePrevMonth} style={styles.navBtn}>
          <ArrowLeftIcon size={16} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          {MONTH_NAMES[currentMonth]} {currentYear}
        </Text>
        <TouchableOpacity onPress={handleNextMonth} style={styles.navBtn}>
          <ArrowLeftIcon size={16} color={colors.textPrimary} style={{ transform: [{ rotate: '180deg' }] }} />
        </TouchableOpacity>
      </View>

      {/* Weekdays Row */}
      <View style={styles.weekdaysRow}>
        {WEEKDAYS.map((day) => (
          <Text key={day} style={styles.weekdayCell}>
            {day}
          </Text>
        ))}
      </View>

      {/* Days Grid */}
      <FlatList
        data={dayCells}
        numColumns={7}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.gridContent}
        renderItem={({ item }) => {
          if (item === null) {
            return <View style={styles.emptyCell} />;
          }

          // Check if selected
          const formattedMonth = String(currentMonth + 1).padStart(2, '0');
          const formattedDay = String(item).padStart(2, '0');
          const cellDateStr = `${currentYear}-${formattedMonth}-${formattedDay}`;
          const isSelected = initialDate === cellDateStr;
          const isDisabled = isDateBeforeToday(item);

          return (
            <TouchableOpacity
              onPress={() => !isDisabled && handleDaySelect(item)}
              activeOpacity={isDisabled ? 1 : 0.7}
              style={[
                styles.dayCell,
                isSelected && styles.selectedDayCell,
                isDisabled && { opacity: 0.25 }
              ]}
            >
              <Text
                style={[
                  styles.dayText,
                  isSelected && styles.selectedDayText,
                  isDisabled && { color: isDarkMode ? '#4A5568' : '#CBD5E0' }
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
    </AppModal>
  );
}
