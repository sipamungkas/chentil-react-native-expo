import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Image,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowLeft, MapPin, Star } from 'lucide-react-native';
import { FadeInDown } from 'react-native-reanimated';
import { colors } from '@/theme/colors';
import { ItemCard } from '@/components/ItemCard';
import { useEffect, useState, useCallback } from 'react';
import { getDestinationsByIsland } from '@/src/api/services/contentApi';
import { ApiResponseSuccess, Content } from '@/src/types/api';

const PAGE_SIZE = 10;

export default function IslandDestinationsScreen() {
  const { island, title } = useLocalSearchParams();
  const [islandData, setIslandData] = useState<ApiResponseSuccess<Content[]>>({
    data: [],
    message: '',
    status: 'success',
    meta: undefined,
    links: undefined,
  });
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

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

  const fetchDestinations = useCallback(
    async (pageNum: number, isRefresh = false) => {
      if (loading && !isRefresh) return;
      if (isRefresh) setIsRefreshing(true);
      else setLoading(true);
      try {
        const destinations = await getDestinationsByIsland(
          Number(island),
          PAGE_SIZE,
          pageNum
        );
        if (pageNum === 1) {
          setIslandData(destinations);
        } else {
          setIslandData((prev) => ({
            ...destinations,
            data: [...(prev.data || []), ...(destinations.data || [])],
          }));
        }
        // Use meta from API to determine if there are more pages
        const currentPage = destinations.meta?.current_page || 1;
        const lastPage = destinations.meta?.last_page || 1;
        setHasMore(currentPage < lastPage);
      } catch (e) {
        setHasMore(false);
      } finally {
        if (isRefresh) setIsRefreshing(false);
        else setLoading(false);
      }
    },
    [island, loading]
  );

  useEffect(() => {
    setPage(1);
    setHasMore(true);
    fetchDestinations(1, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [island]);

  const handleLoadMore = () => {
    if (!loading && hasMore && !isRefreshing) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchDestinations(nextPage);
    }
  };

  const handleRefresh = () => {
    setPage(1);
    setHasMore(true);
    fetchDestinations(1, true);
  };

  const renderItem = ({ item, index }: { item: Content; index: number }) => (
    <ItemCard
      id={item.id}
      key={item.id}
      entering={FadeInDown.delay(index * 200)}
      name={item.title}
      description={item.description}
      image={item.image}
      onPress={() => onPress({ ...item })}
      location={item.province?.name}
    />
  );

  const ListFooterComponent = () =>
    loading && hasMore ? (
      <ActivityIndicator
        size="small"
        color={colors.chentil.cerise}
        style={{ marginVertical: 16 }}
      />
    ) : null;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <ArrowLeft size={24} color="#1A202C" />
        </Pressable>
        <Text style={styles.title}>Explore {title}</Text>
        <Text style={styles.subtitle}>Discover amazing destinations</Text>
      </View>
      <FlatList
        data={islandData.data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.content}
        ListEmptyComponent={
          !loading ? (
            <Text style={styles.noDestinations}>No destinations found</Text>
          ) : null
        }
        ListFooterComponent={ListFooterComponent}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        showsVerticalScrollIndicator={false}
        refreshing={isRefreshing}
        onRefresh={handleRefresh}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
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
  noDestinations: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 16,
    color: '#4A5568',
    marginTop: 16,
    textAlign: 'center',
  },
});
