import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { FadeInDown } from 'react-native-reanimated';
import { colors } from '@/theme/colors';
import { ItemCard } from '@/components/ItemCard';
import { useEffect, useState, useCallback } from 'react';
import { getCultures } from '@/src/api/services/contentApi';
import type { ApiResponseSuccess, Content } from '@/src/types/api';

const PAGE_SIZE = 10;

export default function CultureScreen() {
  const router = useRouter();
  const [culturesData, setCulturesData] = useState<
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
        name: params.title,
        description: params.description,
        image: params.image,
        since: params.since_century || params.established_year,
      },
    });
  };

  const fetchCultures = useCallback(
    async (pageNum: number, isRefresh = false) => {
      if (loading && !isRefresh) return;
      if (isRefresh) setIsRefreshing(true);
      else setLoading(true);
      try {
        const result = await getCultures(PAGE_SIZE, pageNum);
        if (pageNum === 1) {
          setCulturesData(result);
        } else {
          setCulturesData((prev) => ({
            ...result,
            data: [...(prev.data || []), ...(result.data || [])],
          }));
        }
        const currentPage = result.meta?.current_page || 1;
        const lastPage = result.meta?.last_page || 1;
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
    fetchCultures(1, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLoadMore = () => {
    if (!loading && hasMore && !isRefreshing) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchCultures(nextPage);
    }
  };

  const handleRefresh = () => {
    setPage(1);
    setHasMore(true);
    fetchCultures(1, true);
  };

  const renderItem = ({ item, index }: { item: Content; index: number }) => (
    <ItemCard
      id={item.id}
      key={item.id}
      entering={FadeInDown.delay(index * 100)}
      name={item.title}
      description={item.description}
      image={item.image}
      since={item.since_century?.toString()}
      category={item.category}
      onPress={() => onPress(item)}
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
        <Text style={styles.title}>Cultural Heritage</Text>
        <Text style={styles.subtitle}>
          Discover Indonesia's rich traditions
        </Text>
      </View>
      {/* <Pressable style={styles.searchBar}>
        <Search size={20} color="#4A5568" />
        <Text style={styles.searchText}>Search cultural traditions</Text>
      </Pressable> */}
      <FlatList
        data={culturesData.data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.content}
        ListEmptyComponent={
          !loading ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateText}>No cultural items found</Text>
              <Text style={styles.emptyStateSubtext}>
                Try searching for another tradition or check back later.
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
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background.tertiary,
    marginHorizontal: 20,
    padding: 12,
    borderRadius: 12,
    marginBottom: 20,
  },
  searchText: {
    marginLeft: 8,
    fontFamily: 'PlusJakartaSans-Regular',
    color: '#4A5568',
  },
  content: {
    padding: 20,
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
