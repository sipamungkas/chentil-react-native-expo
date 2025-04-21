import {
  StyleSheet,
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowLeft, MapPin, Star } from 'lucide-react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { colors } from '@/theme/colors';
import { ItemCard } from '@/components/ItemCard';
import { useEffect, useState, useCallback } from 'react';
import { Content } from '@/src/types/api';
import {
  wishlistCounts,
  getWishlists,
  getWishlistsByCategory,
} from '@/src/api/services/wishlistApi';
import { ApiResponseSuccess } from '@/src/types/api';

const PAGE_SIZE = 10;
const CATEGORY_ENDPOINTS = {
  destination: 'destinations',
  outbound: 'outbound',
  fnb: 'fnb',
  culture: 'culture',
};

const CATEGORY_NAMES = {
  destination: 'Destinations',
  outbound: 'Outbound Activities',
  fnb: 'Food & Beverage',
  culture: 'Cultural Experiences',
};

export default function WishlistCategoryScreen() {
  const { category } = useLocalSearchParams();
  const router = useRouter();
  const [items, setItems] = useState<Content[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const categoryName = CATEGORY_NAMES[category as keyof typeof CATEGORY_NAMES];

  const fetchWishlist = useCallback(
    async (pageNum = 1, isRefresh = false) => {
      if (loading && !isRefresh) return;
      if (isRefresh) setRefreshing(true);
      else setLoading(true);
      try {
        // Dynamic endpoint per category
        const res = await getWishlistsByCategory(
          category as keyof typeof CATEGORY_ENDPOINTS,
          pageNum,
          PAGE_SIZE
        );
        const newData = res.data || [];
        if (isRefresh || pageNum === 1) {
          setItems(newData);
        } else {
          setItems((prev) => [...prev, ...newData]);
        }
        setHasMore(newData.length === PAGE_SIZE);
        setPage(pageNum);
      } catch (e) {
        if (isRefresh) setItems([]);
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [category, loading]
  );

  useEffect(() => {
    fetchWishlist(1, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

  const onRefresh = () => fetchWishlist(1, true);
  const onEndReached = () => {
    if (!loading && hasMore) fetchWishlist(page + 1);
  };

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

  const renderItem = ({ item, index }: { item: Content; index: number }) => (
    <ItemCard
      key={item.id}
      id={item.id}
      name={item.title}
      entering={FadeInDown.delay(200 * index)}
      image={item.image}
      description={item.description}
      location={
        item.province?.name || item.regency?.name || item.district?.name || ''
      }
      onPress={() => onPress(item)}
    />
  );

  const ListFooterComponent = () =>
    loading && !refreshing ? (
      <ActivityIndicator
        size="small"
        color={colors.brand.primary}
        style={{ marginVertical: 16 }}
      />
    ) : null;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <ArrowLeft size={24} color="#1A202C" />
        </Pressable>
        <Text style={styles.title}>{categoryName}</Text>
        <Text style={styles.subtitle}>{items.length} saved items</Text>
      </View>
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.content}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.5}
        refreshing={refreshing}
        onRefresh={onRefresh}
        ListFooterComponent={ListFooterComponent}
        showsVerticalScrollIndicator={false}
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
});
