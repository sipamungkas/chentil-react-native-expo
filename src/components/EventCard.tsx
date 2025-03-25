import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';

interface Event {
  id: string;
  name: string;
  date: string;
  location: string;
  image: string;
  attendees: number;
  category: string;
}

interface EventCardProps {
  event: Event;
  onJoin: (id: string) => void;
}

export function EventCard({ event, onJoin }: EventCardProps) {
  return (
    <Pressable style={styles.card} onPress={() => onJoin(event.id)}>
      <Image source={{ uri: event.image }} style={styles.image} />
      <View style={styles.content}>
        <View style={styles.header}>
          <View>
            <Text style={styles.category}>{event.category}</Text>
            <Text style={styles.name}>{event.name}</Text>
            <Text style={styles.location}>{event.location}</Text>
          </View>
          <View style={styles.attendeesContainer}>
            <Text style={styles.attendees}>{event.attendees} attendees</Text>
          </View>
        </View>
        <Text style={styles.date}>{event.date}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.background.secondary,
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: colors.text.primary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  content: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  category: {
    fontSize: 12,
    color: colors.brand.primary,
    marginBottom: 4,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 4,
  },
  location: {
    fontSize: 14,
    color: colors.text.secondary,
  },
  attendeesContainer: {
    backgroundColor: colors.background.tertiary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  attendees: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text.primary,
  },
  date: {
    fontSize: 14,
    color: colors.text.secondary,
    marginTop: 12,
  },
}); 