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
import { FadeInDown } from 'react-native-reanimated';
import { colors } from '@/theme/colors';
import { ItemCard } from '@/components/ItemCard';
import { useEffect, useState } from 'react';
import { getDestinationsByIsland } from '@/src/api/services/contentApi';
import { Content } from '@/src/types/api';

export default function IslandDestinationsScreen() {
  const { island, title } = useLocalSearchParams();
  const [islandData, setIslandData] = useState<Content[]>([]);

  const router = useRouter();
  const onPress = (params: Content) => {
    router.push({
      pathname: '/detail',
      params: {
        id: params.id,
        title: params.title,
        description: params.description,
        image: params.image,
        category: params.category,
        province_id: params.province_id,
        regency_id: params.regency_id,
        district_id: params.district_id,
        since_century: params.since_century,
        established_year: params.established_year,
        latitude: params.latitude,
        longitude: params.longitude,
        order: params.order,
        created_at: params.created_at,
        updated_at: params.updated_at,
      },
    });
  };

  useEffect(() => {
    getDestinationsByIsland(Number(island)).then((destinations) => {
      setIslandData(destinations.data);
    });
  }, []);

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
          <Text style={styles.title}>Explore {title}</Text>
          <Text style={styles.subtitle}>Discover amazing destinations</Text>
        </View>

        <View style={styles.content}>
          {islandData.length === 0 && (
            <Text style={styles.noDestinations}>No destinations found</Text>
          )}
          {islandData.map((destination, index) => (
            <ItemCard
              id={destination.id}
              key={destination.id}
              entering={FadeInDown.delay(index * 200)}
              name={destination.title}
              description={destination.description}
              image={destination.image}
              onPress={() => onPress({ ...destination })}
              location={destination.province?.name}
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
  noDestinations: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 16,
    color: '#4A5568',
    marginTop: 16,
    textAlign: 'center',
  },
});
