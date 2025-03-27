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
    date: '2024-03-15',
    description: "Embark on a journey through time at Borobudur Temple, the world's largest Buddhist temple complex and a UNESCO World Heritage site. Built in the 8th and 9th centuries during the Sailendra Dynasty, this architectural masterpiece stands as a testament to Indonesia's rich cultural heritage. The temple's nine stacked platforms, adorned with 2,672 relief panels and 504 Buddha statues, tell an epic story of Buddhist cosmology and teachings. At sunrise, witness the magical moment when the first light bathes the temple's stone surfaces, creating an ethereal atmosphere as mist rises from the surrounding Menoreh Hills. The temple's strategic location, encircled by four volcanoes - Merapi, Merbabu, Sumbing, and Sindoro - adds to its mystical allure. Recent archaeological studies have revealed new insights into the temple's construction techniques, where over 2 million stone blocks were precisely cut and assembled without mortar. The temple's restoration, completed in 1983, stands as one of the world's most ambitious archaeological projects, ensuring that future generations can experience this remarkable monument to human creativity and spiritual devotion.",
  },
  {
    id: '2',
    title: 'Beautiful Beaches of Bali',
    image:
      'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=1200',
    date: '2024-04-20',
    description: "Discover the enchanting coastline of Bali, where each beach tells its own unique story. From the dramatic cliffs of Uluwatu to the gentle shores of Nusa Dua, Bali's beaches offer an incredible diversity of experiences. The island's southern peninsula features pristine white-sand beaches with world-class surf breaks, while hidden coves along the eastern coast reveal black sand beaches formed by ancient volcanic activity. Explore the famous Kuta Beach, where spectacular sunsets paint the sky in brilliant hues every evening, or venture to the more secluded Bingin Beach, where traditional fishing boats dot the horizon at dawn. The beach culture here is deeply intertwined with local traditions, as evidenced by the daily offerings placed on the sand and the ancient temples that stand guard over the coastline. Modern beach clubs and traditional warungs coexist harmoniously, offering visitors both luxury and authentic experiences. The marine life is equally impressive, with vibrant coral reefs home to over 500 species of reef-building corals and countless tropical fish species. Recent conservation efforts have established marine protected areas, ensuring these coastal ecosystems remain pristine for future generations to enjoy.",
  },
  {
    id: '3',
    title: 'Raja Ampat Adventures',
    image:
      'https://images.unsplash.com/photo-1516690561799-46d8f74f9abf?auto=format&fit=crop&q=80&w=1200',
    date: '2024-05-10',
    description: "Venture into Raja Ampat, the crown jewel of marine biodiversity, where an underwater paradise awaits in the heart of the Coral Triangle. This archipelago of over 1,500 islands represents the pinnacle of marine biodiversity, hosting more than 1,300 fish species, 700 mollusk species, and 75% of the world's known coral species. The name Raja Ampat, meaning 'Four Kings,' derives from an ancient legend of four royal siblings who ruled these mystical waters. Above water, limestone karst islands create a dramatic landscape of hidden lagoons, pristine beaches, and dense jungle canopies where rare birds of paradise perform their elaborate courtship dances. The crystal-clear waters offer visibility up to 30 meters, revealing an underwater landscape of vast coral gardens, steep walls, and caves teeming with marine life. Local communities maintain traditional sustainable fishing practices, living in harmony with their environment as they have for generations. Recent scientific expeditions continue to discover new species in these waters, highlighting Raja Ampat's importance as a living laboratory for marine biodiversity. Conservation initiatives, supported by eco-tourism, help protect this unique ecosystem while providing sustainable livelihoods for local communities.",
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
    color: colors.chentil.ruby,
    route: '/favorites' as const,
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
