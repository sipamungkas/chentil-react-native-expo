import { useEffect, useState, useCallback } from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  ActivityIndicator,
  ScrollView,
  Image,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowLeft, MapPin, Clock, Utensils } from 'lucide-react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { colors } from '@/theme/colors';
import { getFoodAndBeverages } from '@/src/api/services/contentApi';
import { ItemCard } from '@/components/ItemCard';
import type { Content } from '@/src/types/api';

const PAGE_SIZE = 10;

export default function ProvinceFoodScreen() {
  const { province, province_id, province_name } = useLocalSearchParams();
  const router = useRouter();
  const [foods, setFoods] = useState<Content[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchFoods = useCallback(
    async (pageNum = 1, isRefresh = false) => {
      if (loading && !isRefresh) return;
      if (isRefresh) setRefreshing(true);
      else setLoading(true);
      try {
        const res = await getFoodAndBeverages(PAGE_SIZE, pageNum, {
          province_id,
        });
        const newData = res.data || [];
        if (isRefresh) {
          setFoods(newData);
        } else {
          setFoods((prev) => [...prev, ...newData]);
        }
        setHasMore(newData.length === PAGE_SIZE);
        setPage(pageNum);
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [province_id, loading]
  );

  useEffect(() => {
    fetchFoods(1, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [province_id]);

  const handleLoadMore = () => {
    if (hasMore && !loading) {
      fetchFoods(page + 1);
    }
  };

  const handleRefresh = () => {
    fetchFoods(1, true);
  };

  const onPress = (params: any) => {
    router.push({
      pathname: '/detail',
      params,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <ArrowLeft size={24} color="#1A202C" />
        </Pressable>
        <Text style={styles.title}>
          {province_name || province} Food & Beverages
        </Text>
        <Text style={styles.subtitle}>Traditional foods and delicacies</Text>
      </View>

      <View style={styles.content}>
        <FlatList
          data={foods}
          renderItem={({ item, index }) => (
            <ItemCard
              entering={FadeInDown.delay(200 * index)}
              id={item.id}
              image={item.image}
              name={item.title}
              location={
                item.province?.name || item.regency?.name || item.district?.name
              }
              description={item.description}
              category={item.category}
              onPress={() => onPress(item)}
            />
          )}
          keyExtractor={(item) => item.id.toString()}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          refreshing={refreshing}
          onRefresh={handleRefresh}
          ListFooterComponent={
            loading && !refreshing ? (
              <ActivityIndicator size="small" color={colors.brand.primary} />
            ) : null
          }
          contentContainerStyle={styles.listContent}
        />
      </View>
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
    paddingBottom: 150,
  },
  listContent: {
    padding: 2,
  },
});
