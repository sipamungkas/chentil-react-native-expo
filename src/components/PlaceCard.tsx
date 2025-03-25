import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';

interface Place {
  id: string;
  name: string;
  location: string;
  image: string;
  rating: number;
}

interface PlaceCardProps {
  place: Place;
  onPress: (id: string) => void;
}

export function PlaceCard({ place, onPress }: PlaceCardProps) {
  return (
    <Pressable style={styles.card} onPress={() => onPress(place.id)}>
      <Image source={{ uri: place.image }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.name}>{place.name}</Text>
        <Text style={styles.location}>{place.location}</Text>
        <View style={styles.ratingContainer}>
          <Text style={styles.rating}>{place.rating}</Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 200,
    marginRight: 16,
    backgroundColor: colors.background.secondary,
    borderRadius: 16,
    overflow: 'hidden',
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
    height: 120,
  },
  content: {
    padding: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 4,
  },
  location: {
    fontSize: 14,
    color: colors.text.secondary,
    marginBottom: 8,
  },
  ratingContainer: {
    backgroundColor: colors.background.tertiary,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  rating: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.text.primary,
  },
}); 