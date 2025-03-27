import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { colors } from '@/theme/colors';
import { PlaceCard } from '@/components/PlaceCard';
import { ScreenHeader } from '@/components/ScreenHeader';
import { ItemCard } from '@/components/ItemCard';
import { FadeInDown } from 'react-native-reanimated';

// Example favorite items (in a real app, this would come from a state management system)
const favorites = [
  {
    id: '1',
    name: 'Borobudur Temple',
    location: 'Magelang, Central Java',
    image:
      'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?auto=format&fit=crop&q=80&w=600',
    rating: 4.8,
  },
  {
    id: '2',
    name: 'Raja Ampat Islands',
    location: 'West Papua',
    image:
      'https://images.unsplash.com/photo-1516690561799-46d8f74f9abf?auto=format&fit=crop&q=80&w=600',
    rating: 4.9,
  },
  {
    id: '3',
    name: 'Ramayana Ballet',
    location: 'Prambanan, Yogyakarta',
    image:
      'https://images.unsplash.com/photo-1601959334795-2b7c04021807?auto=format&fit=crop&q=80&w=600',
    rating: 4.7,
  },
  {
    id: '4',
    name: 'Batik Workshop',
    location: 'Solo, Central Java',
    image:
      'https://images.unsplash.com/photo-1580916954804-2a85797cf50f?auto=format&fit=crop&q=80&w=600',
    rating: 4.6,
  },
  {
    id: '5',
    name: 'Nasi Goreng Kambing',
    location: 'Kebon Sirih, Jakarta',
    image:
      'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&q=80&w=600',
    rating: 4.8,
  },
  {
    id: '6',
    name: 'Sate Lilit',
    location: 'Sanur, Bali',
    image:
      'https://images.unsplash.com/photo-1555126634-323283e090fa?auto=format&fit=crop&q=80&w=600',
    rating: 4.7,
  },
  {
    id: '7',
    name: 'Rendang House',
    location: 'Padang, West Sumatra',
    image:
      'https://images.unsplash.com/photo-1606491956689-2ea866880c84?auto=format&fit=crop&q=80&w=600',
    rating: 4.9,
  },
];

export default function FavoritesScreen() {
  const router = useRouter();

  const onPress = (params: any) => {
    router.push({
      pathname: '/detail',
      params,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <ScreenHeader
          title="Favorites"
          subtitle="Your saved places and experiences"
        />
        <View style={styles.section}>
          {/* Destinations Section */}

          {favorites.map((item, index) => (
            <ItemCard
              id={item.id}
              key={item.id}
              name={item.name}
              location={item.location}
              entering={FadeInDown.delay(200 * index)}
              onPress={() => onPress(item)}
              image={item.image}
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
