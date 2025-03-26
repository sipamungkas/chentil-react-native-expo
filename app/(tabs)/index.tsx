import { View, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import {
  Compass,
  Plane,
  Palette,
  Utensils,
  Star,
  Heart,
} from 'lucide-react-native';

import { NewsSlider } from '@/components/NewsSlider';
import { SearchBar } from '@/components/SearchBar';
import { MenuGrid } from '@/components/MenuGrid';
import { MapSection } from '@/components/MapSection';
import { TopPicks } from '@/components/TopPicks';
import { FloatingActionButton } from '@/components/FloatingActionButton';

const NEWS_SLIDES = [
  {
    id: '1',
    title: 'Explore Borobudur Temple',
    image:
      'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?auto=format&fit=crop&q=80&w=1200',
  },
  {
    id: '2',
    title: 'Beautiful Beaches of Bali',
    image:
      'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=1200',
  },
  {
    id: '3',
    title: 'Raja Ampat Adventures',
    image:
      'https://images.unsplash.com/photo-1516690561799-46d8f74f9abf?auto=format&fit=crop&q=80&w=1200',
  },
];

const MENU_ITEMS = [
  {
    icon: Compass,
    label: 'Destinations',
    color: '#FF4D8D',
    route: '/destination',
  },
  { icon: Plane, label: 'Outbound', color: '#4299E1', route: '/outbound' },
  { icon: Palette, label: 'Culture', color: '#48BB78', route: '/culture' },
  {
    icon: Utensils,
    label: 'Food & Beverage',
    color: '#ED8936',
    route: '/food-and-beverage',
  },
  {
    icon: Star,
    label: 'Recommendations',
    color: '#9F7AEA',
    route: 'recommendations',
  },
  { icon: Heart, label: 'Favorites', color: '#F56565', route: null },
];

const TOP_PICKS = [
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
];

export default function HomeScreen() {
  const router = useRouter();

  const handleMenuPress = (route: string | null) => {
    if (route) {
      router.push(route);
    }
  };

  const handlePlacePress = (id: string) => {
    router.push(`/destination/${id}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <NewsSlider slides={NEWS_SLIDES} />
        <SearchBar onPress={() => router.push('/search')} />
        <MenuGrid items={MENU_ITEMS} onItemPress={handleMenuPress} />
        <MapSection
          imageUrl="https://images.unsplash.com/photo-1599739291060-4578e77dac5d?auto=format&fit=crop&q=80&w=1200"
          title="Explore Indonesia"
          subtitle="From Sabang to Merauke"
        />
        <TopPicks places={TOP_PICKS} onPlacePress={handlePlacePress} />
      </ScrollView>
      <FloatingActionButton onPress={() => router.push('/calendar')} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
  },
});
