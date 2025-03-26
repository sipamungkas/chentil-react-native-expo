import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { Star } from 'lucide-react-native';
import { colors } from '../theme/colors';

interface Place {
  id: string;
  name: string;
  location: string;
  image: string;
  rating: number;
}

interface TopPicksProps {
  places: Place[];
  onPlacePress: (id: string) => void;
}

export function TopPicks({ places, onPlacePress }: TopPicksProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Top Picks</Text>
      {places.map((place) => (
        <TouchableOpacity
          key={place.id}
          style={styles.card}
          onPress={() => onPlacePress(place.id)}
        >
          <Image source={{ uri: place.image }} style={styles.image} contentFit="cover" />
          <View style={styles.content}>
            <Text style={styles.name}>{place.name}</Text>
            <Text style={styles.location}>{place.location}</Text>
            <View style={styles.ratingContainer}>
              <Star size={16} color={colors.chentil.watermelon} fill={colors.chentil.watermelon} />
              <Text style={styles.rating}>{place.rating}</Text>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: 16,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: colors.background.secondary,
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
  },
  image: {
    width: 120,
    height: 120,
  },
  content: {
    flex: 1,
    padding: 12,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: 4,
  },
  location: {
    fontSize: 14,
    color: colors.text.secondary,
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 14,
    color: colors.text.primary,
    marginLeft: 4,
  },
}); 