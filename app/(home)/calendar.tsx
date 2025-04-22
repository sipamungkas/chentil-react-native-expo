import { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Calendar as CalendarIcon, Clock, MapPin } from 'lucide-react-native';
import { Calendar } from 'react-native-calendars';
import { useRouter } from 'expo-router';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { colors } from '@/theme/colors';
import {
  fetchEventCalendar,
  EventCalendarResponse,
} from '@/api/services/eventApi';

export default function CalendarScreen() {
  const [selectedDate, setSelectedDate] = useState('');
  const [calendarEvents, setCalendarEvents] = useState<
    EventCalendarResponse['data']
  >({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEventCalendar()
      .then((res) => setCalendarEvents(res.data))
      .catch((err) => console.error('Failed to fetch events', err))
      .finally(() => setLoading(false));
  }, []);

  // Create marked dates object with proper structure
  const markedDates = Object.keys(calendarEvents).reduce((acc, date) => {
    acc[date] = {
      marked: calendarEvents[date].marked,
      dotColor: calendarEvents[date].selectedColor,
      selected: date === selectedDate,
      selectedColor:
        date === selectedDate ? calendarEvents[date].selectedColor : undefined,
    };
    return acc;
  }, {} as Record<string, any>);

  // If selected date doesn't have events, still mark it as selected
  if (selectedDate && !markedDates[selectedDate]) {
    markedDates[selectedDate] = {
      selected: true,
      selectedColor: '#FF4D8D',
    };
  }

  const selectedEvent = calendarEvents[selectedDate];
  const formattedDate = selectedDate
    ? new Date(selectedDate).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })
    : '';

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Calendar</Text>
        <Text style={styles.subtitle}>Your upcoming events and activities</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Calendar
          style={styles.calendar}
          theme={{
            backgroundColor: '#fff',
            calendarBackground: '#fff',
            textSectionTitleColor: colors.brand.secondary,
            selectedDayBackgroundColor: '#FF4D8D',
            selectedDayTextColor: '#ffffff',
            todayTextColor: '#FF4D8D',
            dayTextColor: '#1A202C',
            textDisabledColor: '#A0AEC0',
            dotColor: '#FF4D8D',
            selectedDotColor: '#ffffff',
            arrowColor: '#FF4D8D',
            monthTextColor: colors.brand.primary,
            textDayFontFamily: 'PlusJakartaSans-Medium',
            textMonthFontFamily: 'PlusJakartaSans-Bold',
            textDayHeaderFontFamily: 'PlusJakartaSans-Medium',
          }}
          markedDates={markedDates}
          onDayPress={(day: any) => setSelectedDate(day.dateString)}
          enableSwipeMonths={true}
        />

        <View style={styles.eventsSection}>
          <Text style={styles.eventsTitle}>
            {selectedDate ? `Events on ${formattedDate}` : 'Upcoming Events'}
          </Text>

          {loading ? (
            <Text style={styles.noEvents}>Loading events...</Text>
          ) : selectedEvent ? (
            <Animated.View
              key={selectedDate}
              entering={FadeInDown.duration(400)}
              style={styles.eventCard}
            >
              <View style={styles.eventHeader}>
                <CalendarIcon
                  size={20}
                  color={selectedEvent.selectedColor || '#FF4D8D'}
                />
                <Text style={styles.eventTitle}>{selectedEvent.event}</Text>
              </View>

              <View style={styles.eventDetails}>
                {/* <View style={styles.eventDetail}>
                  <Clock size={16} color={colors.chentil.rosePink} />
                  <Text style={styles.eventDetailText}>
                    {selectedEvent.time}
                  </Text>
                </View>

                <View style={styles.eventDetail}>
                  <MapPin size={16} color={colors.chentil.rosePink} />
                  <Text style={styles.eventDetailText}>
                    {selectedEvent.description}
                  </Text>
                </View> */}
                <Text>{selectedEvent.description}</Text>
              </View>
            </Animated.View>
          ) : (
            <Text style={styles.noEvents}>
              {selectedDate
                ? 'No events on this date'
                : 'Select a date to view events'}
            </Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  header: {
    padding: 20,
  },
  title: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 24,
    color: '#1A202C',
  },
  subtitle: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 14,
    color: '#4A5568',
    marginTop: 4,
  },
  content: {
    flex: 1,
  },
  calendar: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.medium,
  },
  eventsSection: {
    padding: 20,
  },
  eventsTitle: {
    fontFamily: 'PlusJakartaSans-SemiBold',
    fontSize: 18,
    color: '#1A202C',
    marginBottom: 16,
  },
  eventCard: {
    backgroundColor: colors.background.primary,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#FF4D8D',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  eventHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  eventTitle: {
    fontFamily: 'PlusJakartaSans-SemiBold',
    fontSize: 16,
    color: '#1A202C',
    marginLeft: 12,
  },
  eventDetails: {
    marginLeft: 32,
  },
  eventDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  eventDetailText: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 14,
    color: '#4A5568',
    marginLeft: 8,
  },
  noEvents: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 16,
    color: '#A0AEC0',
    textAlign: 'center',
    marginTop: 20,
  },
});
