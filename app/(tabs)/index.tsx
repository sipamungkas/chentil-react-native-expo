import { View, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useState } from 'react';
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
import { colors } from '@/theme/colors';

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
    color: colors.brand.primary,
    route: '/destination' as const,
  },
  {
    icon: Plane,
    label: 'Outbound',
    color: colors.brand.primary,
    route: '/outbound' as const,
  },
  {
    icon: Palette,
    label: 'Culture',
    color: colors.brand.primary,
    route: '/culture' as const,
  },
  {
    icon: Utensils,
    label: 'Food & Beverage',
    color: colors.brand.primary,
    route: '/food-and-beverage' as const,
  },
  {
    icon: Star,
    label: 'Recommendations',
    color: colors.brand.primary,
    route: '/recommendations' as const,
  },
  {
    icon: Heart,
    label: 'Favorites',
    color: colors.brand.primary,
    route: null,
  },
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
  const [searchText, setSearchText] = useState('');

  const handleMenuPress = (route: string | null) => {
    if (route) {
      router.push(route as any);
    }
  };

  const handlePlacePress = (id: string) => {
    const route = `/destination/${id}` as const;
    router.push(route);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <NewsSlider slides={NEWS_SLIDES} />
        <View style={styles.searchContainer}>
          <SearchBar
            value={searchText}
            onChangeText={setSearchText}
            placeholder="Search destinations..."
          />
        </View>
        <MenuGrid items={MENU_ITEMS} onItemPress={handleMenuPress} />
        <MapSection />
        <TopPicks places={TOP_PICKS} onPlacePress={handlePlacePress} />
      </ScrollView>
      <FloatingActionButton onPress={() => router.push('/calendar' as const)} />
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
  searchContainer: {
    padding: 16,
    backgroundColor: colors.background.secondary,
    marginHorizontal: 16,
    marginVertical: 16,
    borderRadius: 12,
  },
});
