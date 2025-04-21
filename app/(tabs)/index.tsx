import { useState, useEffect } from 'react';
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
import { colors } from '@/theme/colors';
import { getNews } from '@/api/services/newsApi';
import { getTopFavorites } from '@/src/api/services/contentApi';
import { News } from '@/src/types/api';
import type { Content } from '@/src/types/api';

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
    color: colors.chentil.ruby,
    route: '/favorites' as const,
  },
];

export default function HomeScreen() {
  const [news, setNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [topPicks, setTopPicks] = useState<Content[]>([]);
  const router = useRouter();

  useEffect(() => {
    setLoading(true);
    getNews()
      .then((data) => setNews(data.data))
      .catch((err) => {
        console.error('Failed to fetch news:', err);
        setNews([]);
      })
      .finally(() => setLoading(false));
    // Fetch top picks
    getTopFavorites(5, 1)
      .then((data) => setTopPicks(data.data))
      .catch((err) => {
        console.error('Failed to fetch top picks:', err);
        setTopPicks([]);
      });
  }, []);

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
        <NewsSlider news={news} loading={loading} />
        {/* <View style={styles.searchContainer}>
          <SearchBar
            value={searchText}
            onChangeText={setSearchText}
            placeholder="Search destinations..."
          />
        </View> */}
        <View style={{ marginVertical: 16 }} />
        <MenuGrid items={MENU_ITEMS} onItemPress={handleMenuPress} />
        <MapSection />
        <TopPicks contents={topPicks} onPlacePress={handlePlacePress} />
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
