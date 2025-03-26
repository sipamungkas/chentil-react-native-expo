import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import { MapPin, Star } from 'lucide-react-native';

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
    <Pressable
      style={styles.placeCard}
      onPress={() => onPress(place.id)}
    >
      <Image source={{ uri: place.image }} style={styles.placeImage} />
      <View style={styles.placeInfo}>
        <Text style={styles.placeName}>{place.name}</Text>
        <View style={styles.placeLocation}>
          <MapPin size={14} color="#4A5568" />
          <Text style={styles.locationText}>{place.location}</Text>
        </View>
        <View style={styles.rating}>
          <Star size={14} color="#FFB800" fill="#FFB800" />
          <Text style={styles.ratingText}>{place.rating}</Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  placeCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  placeImage: {
    width: '100%',
    height: 160,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  placeInfo: {
    padding: 16,
  },
  placeName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1A202C',
    marginBottom: 8,
  },
  placeLocation: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  locationText: {
    marginLeft: 4,
    fontSize: 14,
    color: '#4A5568',
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    marginLeft: 4,
    fontSize: 14,
    color: '#4A5568',
    fontWeight: '500',
  },
}); 