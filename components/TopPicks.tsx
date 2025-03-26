import { View, Text, StyleSheet } from 'react-native';
import { PlaceCard } from './PlaceCard';

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
    <View style={styles.topPicks}>
      <Text style={styles.sectionTitle}>Top Picks</Text>
      {places.map((place) => (
        <PlaceCard
          key={place.id}
          place={place}
          onPress={onPlacePress}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  topPicks: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1A202C',
    marginBottom: 16,
  },
}); 