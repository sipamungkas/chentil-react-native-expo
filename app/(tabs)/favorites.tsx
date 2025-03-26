import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { colors } from '@/theme/colors';
import { PlaceCard } from '@/components/PlaceCard';
import { ScreenHeader } from '@/components/ScreenHeader';

// Example favorite items (in a real app, this would come from a state management system)
const FAVORITE_ITEMS = {
  destinations: [
    {
      id: '1',
      name: 'Borobudur Temple',
      location: 'Magelang, Central Java',
      image: 'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?auto=format&fit=crop&q=80&w=600',
      rating: 4.8,
    },
  ],
  outbound: [
    {
      id: '2',
      name: 'Raja Ampat Islands',
      location: 'West Papua',
      image: 'https://images.unsplash.com/photo-1516690561799-46d8f74f9abf?auto=format&fit=crop&q=80&w=600',
      rating: 4.9,
    },
  ],
  culture: [
    {
      id: '3',
      name: 'Ramayana Ballet',
      location: 'Prambanan, Yogyakarta',
      image: 'https://images.unsplash.com/photo-1601959334795-2b7c04021807?auto=format&fit=crop&q=80&w=600',
      rating: 4.7,
    },
    {
      id: '4',
      name: 'Batik Workshop',
      location: 'Solo, Central Java',
      image: 'https://images.unsplash.com/photo-1580916954804-2a85797cf50f?auto=format&fit=crop&q=80&w=600',
      rating: 4.6,
    }
  ],
  foodAndBeverage: [
    {
      id: '5',
      name: 'Nasi Goreng Kambing',
      location: 'Kebon Sirih, Jakarta',
      image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&q=80&w=600',
      rating: 4.8,
    },
    {
      id: '6',
      name: 'Sate Lilit',
      location: 'Sanur, Bali',
      image: 'https://images.unsplash.com/photo-1555126634-323283e090fa?auto=format&fit=crop&q=80&w=600',
      rating: 4.7,
    },
    {
      id: '7',
      name: 'Rendang House',
      location: 'Padang, West Sumatra',
      image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?auto=format&fit=crop&q=80&w=600',
      rating: 4.9,
    }
  ],
};

export default function FavoritesScreen() {
  const router = useRouter();

  const handlePlacePress = (id: string) => {
    router.push(`/destination/${id}` as const);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <ScreenHeader 
          title="Favorites" 
          subtitle="Your saved places and experiences" 
        />

        {/* Destinations Section */}
        {FAVORITE_ITEMS.destinations.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Destinations</Text>
            {FAVORITE_ITEMS.destinations.map((item) => (
              <PlaceCard
                key={item.id}
                place={item}
                onPress={handlePlacePress}
              />
            ))}
          </View>
        )}

        {/* Outbound Section */}
        {FAVORITE_ITEMS.outbound.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Outbound</Text>
            {FAVORITE_ITEMS.outbound.map((item) => (
              <PlaceCard
                key={item.id}
                place={item}
                onPress={handlePlacePress}
              />
            ))}
          </View>
        )}

        {/* Culture Section */}
        {FAVORITE_ITEMS.culture.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Culture</Text>
            {FAVORITE_ITEMS.culture.map((item) => (
              <PlaceCard
                key={item.id}
                place={item}
                onPress={handlePlacePress}
              />
            ))}
          </View>
        )}

        {/* Food & Beverage Section */}
        {FAVORITE_ITEMS.foodAndBeverage.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Food & Beverage</Text>
            {FAVORITE_ITEMS.foodAndBeverage.map((item) => (
              <PlaceCard
                key={item.id}
                place={item}
                onPress={handlePlacePress}
              />
            ))}
          </View>
        )}

        {/* Empty State */}
        {Object.values(FAVORITE_ITEMS).every(arr => arr.length === 0) && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>
              You haven't added any favorites yet.
            </Text>
            <Text style={styles.emptyStateSubtext}>
              Start exploring and save your favorite places!
            </Text>
          </View>
        )}
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
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: 16,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
    marginTop: 60,
  },
  emptyStateText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text.primary,
    textAlign: 'center',
    marginBottom: 8,
  },
  emptyStateSubtext: {
    fontSize: 16,
    color: colors.text.secondary,
    textAlign: 'center',
  },
}); 