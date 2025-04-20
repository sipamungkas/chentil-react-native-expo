import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { colors } from '@/theme/colors';
import { ItemCard } from '@/components/ItemCard';
import { FadeInDown } from 'react-native-reanimated';
import { ArrowLeft } from 'lucide-react-native';
import { useEffect, useState, useCallback } from 'react';
import { getFavorites } from '@/src/api/services/favoriteApi';
import type { ApiResponseSuccess, Content } from '@/src/types/api';

const PAGE_SIZE = 10;

export default function FavoritesScreen() {
  const router = useRouter();
  const [favoritesData, setFavoritesData] = useState<
    ApiResponseSuccess<Content[]>
  >({
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

  const fetchFavorites = useCallback(
    async (pageNum: number, isRefresh = false) => {
      if (loading && !isRefresh) return;
      if (isRefresh) setIsRefreshing(true);
      else setLoading(true);
      try {
        const favorites = await getFavorites(pageNum, PAGE_SIZE);
        if (pageNum === 1) {
          setFavoritesData(favorites);
        } else {
          setFavoritesData((prev) => ({
            ...favorites,
            data: [...(prev.data || []), ...(favorites.data || [])],
          }));
        }
        const currentPage = favorites.meta?.current_page || 1;
        const lastPage = favorites.meta?.last_page || 1;
        setHasMore(currentPage < lastPage);
      } catch (e) {
        setHasMore(false);
      } finally {
        if (isRefresh) setIsRefreshing(false);
        else setLoading(false);
      }
    },
    [loading]
  );

  useEffect(() => {
    setPage(1);
    setHasMore(true);
    fetchFavorites(1, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLoadMore = () => {
    if (!loading && hasMore && !isRefreshing) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchFavorites(nextPage);
    }
  };

  const handleRefresh = () => {
    setPage(1);
    setHasMore(true);
    fetchFavorites(1, true);
  };

  const renderItem = ({ item, index }: { item: Content; index: number }) => (
    <ItemCard
      id={item.id}
      key={item.id}
      name={item.title}
      location={
        item.province?.name || item.regency?.name || item.district?.name
      }
      description={item.description}
      entering={FadeInDown.delay(200 * index)}
      onPress={() => onPress(item)}
      image={item.image}
    />
  );

  const ListFooterComponent = () =>
    loading && hasMore ? (
      <ActivityIndicator
        size="small"
        color={colors.chentil?.cerise || colors.text.primary}
        style={{ marginVertical: 16 }}
      />
    ) : null;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <ArrowLeft size={24} color="#1A202C" />
        </Pressable>
        <Text style={styles.title}>Favorites</Text>
        <Text style={styles.subtitle}>Your saved places and experiences</Text>
      </View>
      <FlatList
        data={favoritesData.data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.section}
        ListEmptyComponent={
          !loading ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateText}>No favorites yet</Text>
              <Text style={styles.emptyStateSubtext}>
                Start saving your favorite places and experiences!
              </Text>
            </View>
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
