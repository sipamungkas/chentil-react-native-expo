import { View, ScrollView, StyleSheet } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { colors } from '../theme/colors';

import { ScreenHeader } from '../../components/ScreenHeader';
import { SearchBar } from '../../components/SearchBar';
import { EventCard } from '../../components/EventCard';

const UPCOMING_EVENTS = [
  {
    id: '1',
    name: 'Borobudur Sunrise Tour',
    date: 'Oct 15 - Oct 16, 2024',
    location: 'Magelang, Central Java',
    image: 'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?auto=format&fit=crop&q=80&w=600',
    attendees: 45,
    category: 'Cultural Tour',
  },
  {
    id: '2',
    name: 'Bali Arts Festival',
    date: 'Oct 20 - Oct 25, 2024',
    location: 'Denpasar, Bali',
    image: 'https://images.unsplash.com/photo-1583309217394-d35d84b4c544?auto=format&fit=crop&q=80&w=600',
    attendees: 120,
    category: 'Festival',
  },
  {
    id: '3',
    name: 'Jakarta Food Festival',
    date: 'Nov 1 - Nov 3, 2024',
    location: 'Central Jakarta',
    image: 'https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?auto=format&fit=crop&q=80&w=600',
    attendees: 250,
    category: 'Food & Culture',
  },
];

export default function EventsScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const handleJoinEvent = (id: string) => {
    // Handle event join
    console.log('Event joined:', id);
  };

  return (
    <View style={styles.container}>
      <ScreenHeader
        greeting="What's happening?"
        title="Upcoming Events"
      />
      <ScrollView style={styles.content}>
        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search events"
        />
        <View style={styles.section}>
          {UPCOMING_EVENTS.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              onJoin={handleJoinEvent}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
});