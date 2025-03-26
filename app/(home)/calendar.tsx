import { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Calendar as CalendarIcon, Clock, MapPin } from 'lucide-react-native';
import { Calendar } from 'react-native-calendars';
import { useRouter } from 'expo-router';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { colors } from '@/theme/colors';

const EVENTS = {
  '2024-03-15': [
    {
      id: '1',
      title: 'Borobudur Sunrise Tour',
      time: '04:30 AM - 07:00 AM',
      location: 'Magelang, Central Java',
      type: 'tour',
    },
  ],
  '2024-03-20': [
    {
      id: '2',
      title: 'Bali Arts Festival',
      time: '10:00 AM - 08:00 PM',
      location: 'Denpasar, Bali',
      type: 'festival',
    },
  ],
  '2024-04-01': [
    {
      id: '3',
      title: 'Traditional Dance Workshop',
      time: '02:00 PM - 04:00 PM',
      location: 'Yogyakarta',
      type: 'workshop',
    },
  ],
};

export default function CalendarScreen() {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState('');

  // Create marked dates object with proper structure
  const markedDates = Object.keys(EVENTS).reduce((acc, date) => {
    acc[date] = {
      marked: true,
      dotColor: '#FF4D8D',
      selected: date === selectedDate,
      selectedColor: date === selectedDate ? '#FF4D8D' : undefined,
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

  const selectedEvents = EVENTS[selectedDate] || [];
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
            backgroundColor: '#ffffff',
            calendarBackground: '#ffffff',
            textSectionTitleColor: '#1A202C',
            selectedDayBackgroundColor: '#FF4D8D',
            selectedDayTextColor: '#ffffff',
            todayTextColor: '#FF4D8D',
            dayTextColor: '#1A202C',
            textDisabledColor: '#A0AEC0',
            dotColor: '#FF4D8D',
            selectedDotColor: '#ffffff',
            arrowColor: '#FF4D8D',
            monthTextColor: '#1A202C',
            textDayFontFamily: 'PlusJakartaSans-Medium',
            textMonthFontFamily: 'PlusJakartaSans-Bold',
            textDayHeaderFontFamily: 'PlusJakartaSans-Medium',
          }}
          markedDates={markedDates}
          onDayPress={(day) => setSelectedDate(day.dateString)}
          enableSwipeMonths={true}
        />

        <View style={styles.eventsSection}>
          <Text style={styles.eventsTitle}>
            {selectedDate ? `Events on ${formattedDate}` : 'Upcoming Events'}
          </Text>

          {selectedEvents.length > 0 ? (
            selectedEvents.map((event) => (
              <Animated.View
                key={event.id}
                entering={FadeInDown.duration(400)}
                style={styles.eventCard}
              >
                <View style={styles.eventHeader}>
                  <CalendarIcon size={20} color="#FF4D8D" />
                  <Text style={styles.eventTitle}>{event.title}</Text>
                </View>

                <View style={styles.eventDetails}>
                  <View style={styles.eventDetail}>
                    <Clock size={16} color={colors.chentil.rosePink} />
                    <Text style={styles.eventDetailText}>{event.time}</Text>
                  </View>

                  <View style={styles.eventDetail}>
                    <MapPin size={16} color={colors.chentil.rosePink} />
                    <Text style={styles.eventDetailText}>{event.location}</Text>
                  </View>
                </View>
              </Animated.View>
            ))
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
    borderBottomColor: '#E2E8F0',
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
