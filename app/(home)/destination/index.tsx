import { StyleSheet, View, Text, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ChevronRight } from 'lucide-react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { colors } from '@/theme/colors';
import { useEffect, useState } from 'react';
import { Island } from '@/src/types/api';
import { getIslands } from '@/src/api/services/islandApi';

const ISLANDS = [
  {
    id: 'sumatra',
    name: 'Sumatra',
    description:
      'The largest island entirely in Indonesia, known for its diverse wildlife, rainforests, and volcanic landscapes.',
    provinces: [
      'Aceh',
      'North Sumatra',
      'West Sumatra',
      'Riau',
      'Jambi',
      'Bengkulu',
      'South Sumatra',
      'Lampung',
    ],
  },
  {
    id: 'java',
    name: 'Java',
    description:
      'The economic and political center of Indonesia, featuring ancient temples, vibrant cities, and volcanic peaks.',
    provinces: [
      'Jakarta',
      'West Java',
      'Central Java',
      'East Java',
      'Yogyakarta',
      'Banten',
    ],
  },
  {
    id: 'bali',
    name: 'Bali',
    description:
      'The famous Island of the Gods, renowned for its beaches, temples, terraced rice fields, and cultural heritage.',
    provinces: ['Bali'],
  },
  {
    id: 'nusa-tenggara',
    name: 'Nusa Tenggara',
    description:
      'A chain of islands featuring unique cultures, pristine beaches, and the famous Komodo dragons.',
    provinces: ['West Nusa Tenggara', 'East Nusa Tenggara'],
  },
  {
    id: 'kalimantan',
    name: 'Kalimantan',
    description:
      'The Indonesian portion of Borneo, home to ancient rainforests, diverse wildlife, and indigenous cultures.',
    provinces: [
      'West Kalimantan',
      'Central Kalimantan',
      'South Kalimantan',
      'East Kalimantan',
      'North Kalimantan',
    ],
  },
  {
    id: 'sulawesi',
    name: 'Sulawesi',
    description:
      'A uniquely shaped island known for its diverse marine life, traditional cultures, and mountainous landscapes.',
    provinces: [
      'North Sulawesi',
      'Central Sulawesi',
      'South Sulawesi',
      'Southeast Sulawesi',
      'Gorontalo',
      'West Sulawesi',
    ],
  },
  {
    id: 'maluku',
    name: 'Maluku Islands',
    description:
      'The original Spice Islands, featuring pristine beaches, rich marine life, and historical spice trade sites.',
    provinces: ['Maluku', 'North Maluku'],
  },
  {
    id: 'papua',
    name: 'Papua',
    description:
      'The eastern frontier of Indonesia, home to diverse indigenous cultures, unique wildlife, and the highest peaks in Oceania.',
    provinces: [
      'Papua',
      'West Papua',
      'Highland Papua',
      'South Papua',
      'Central Papua',
      'Southwest Papua',
    ],
  },
];

export default function DestinationScreen() {
  const router = useRouter();
  const [islands, setIslands] = useState<Island[]>([]);

  useEffect(() => {
    const fetchIslands = async () => {
      try {
        const islands = await getIslands();
        setIslands(islands);
      } catch (error) {
        console.error('Failed to fetch islands:', error);
      }
    };
    fetchIslands();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Indonesian Archipelago</Text>
          <Text style={styles.subtitle}>Explore the islands of Indonesia</Text>
        </View>

        <View style={styles.content}>
          {islands.map((island, index) => (
            <Animated.View
              key={island.id}
              entering={FadeInDown.delay(index * 100)}
            >
              <Pressable
                style={styles.islandCard}
                onPress={() =>
                  router.push({
                    pathname: '/destination/[island]',
                    params: {
                      island: island.id,
                      title: island.name,
                    },
                  })
                }
              >
                <View style={styles.islandInfo}>
                  <Text style={styles.islandName}>{island.name}</Text>
                  <Text style={styles.provinceCount}>
                    {island.provinces_count}{' '}
                    {island.provinces_count === 1 ? 'Province' : 'Provinces'}
                  </Text>
                  <Text style={styles.islandDescription} numberOfLines={2}>
                    {island.description}
                  </Text>
                </View>
                <ChevronRight size={20} color="#4A5568" />
              </Pressable>
            </Animated.View>
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
  islandCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background.primary,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  islandInfo: {
    flex: 1,
    marginRight: 16,
  },
  islandName: {
    fontFamily: 'PlusJakartaSans-SemiBold',
    fontSize: 18,
    color: colors.brand.primary,
    marginBottom: 4,
  },
  provinceCount: {
    fontFamily: 'PlusJakartaSans-Medium',
    fontSize: 12,
    color: colors.brand.secondary,
    marginBottom: 8,
  },
  islandDescription: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 14,
    color: '#4A5568',
    lineHeight: 20,
  },
});
