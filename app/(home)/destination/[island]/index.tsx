import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowLeft, MapPin, Star } from 'lucide-react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { colors } from '@/theme/colors';
import { ItemCard } from '@/components/ItemCard';

const DESTINATIONS = {
  sumatra: {
    name: 'Sumatra',
    destinations: [
      {
        id: '1',
        name: 'Lake Toba',
        location: 'North Sumatra',
        description:
          "The world's largest volcanic lake, formed by a supervolcanic eruption.",
        image:
          'https://images.unsplash.com/photo-1596870230751-ebdfce98ec42?auto=format&fit=crop&q=80&w=800',
        rating: 4.8,
      },
      {
        id: '2',
        name: 'Mentawai Islands',
        location: 'West Sumatra',
        description:
          'World-class surfing destination with pristine beaches and unique tribal culture.',
        image:
          'https://images.unsplash.com/photo-1516690561799-46d8f74f9abf?auto=format&fit=crop&q=80&w=800',
        rating: 4.7,
      },
    ],
  },
  java: {
    name: 'Java',
    destinations: [
      {
        id: '1',
        name: 'Borobudur Temple',
        location: 'Central Java',
        description:
          "The world's largest Buddhist temple, an ancient wonder of intricate stone carvings.",
        image:
          'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?auto=format&fit=crop&q=80&w=800',
        rating: 4.9,
      },
      {
        id: '2',
        name: 'Mount Bromo',
        location: 'East Java',
        description:
          'An active volcano offering spectacular sunrise views and lunar-like landscapes.',
        image:
          'https://images.unsplash.com/photo-1589395595558-690008363e88?auto=format&fit=crop&q=80&w=800',
        rating: 4.8,
      },
    ],
  },
  // Add more islands and their destinations...
};

export default function IslandDestinationsScreen() {
  const { island } = useLocalSearchParams();
  const router = useRouter();
  const islandData = DESTINATIONS[island as keyof typeof DESTINATIONS];
  const onPress = (params) => {
    router.push({
      pathname: '/detail',
      params,
    });
  };

  if (!islandData) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Island not found</Text>
          <Pressable style={styles.backButton} onPress={() => router.back()}>
            <Text style={styles.backButtonText}>Back to Islands</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Pressable style={styles.backButton} onPress={() => router.back()}>
            <ArrowLeft size={24} color="#1A202C" />
          </Pressable>
          <Text style={styles.title}>Explore {islandData.name}</Text>
          <Text style={styles.subtitle}>Discover amazing destinations</Text>
        </View>

        <View style={styles.content}>
          {islandData.destinations.map((destination, index) => (
            <ItemCard
              id={destination.id}
              key={destination.id}
              entering={FadeInDown.delay(index * 200)}
              name={destination.name}
              description={destination.description}
              image={destination.image}
              onPress={() => onPress({ ...destination })}
              location={destination.location}
            />
          ))}
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
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    marginBottom: 16,
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
    padding: 20,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontFamily: 'PlusJakartaSans-SemiBold',
    fontSize: 18,
    color: '#1A202C',
    marginBottom: 16,
  },
  backButtonText: {
    fontFamily: 'PlusJakartaSans-SemiBold',
    fontSize: 16,
    color: '#48BB78',
  },
});
