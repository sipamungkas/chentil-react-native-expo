import { StyleSheet, View, Text, Image, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MapPin, Utensils, Palette } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { colors } from '@/theme/colors';
import { useEffect, useState, useCallback } from 'react';
import { ActivityIndicator, FlatList } from 'react-native';
import { getRecommendations } from '@/src/api/services/recommendationApi';
import type { Content } from '@/src/types/api';

const PAGE_SIZE = 10;

export default function RecommendationsScreen() {
  const router = useRouter();
  const [recommendations, setRecommendations] = useState<Content[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchRecommendations = useCallback(
    async (pageNum = 1, isRefresh = false) => {
      if (loading && !isRefresh) return;
      if (isRefresh) setRefreshing(true);
      else setLoading(true);
      try {
        const res = await getRecommendations({
          per_page: PAGE_SIZE,
          page: pageNum,
        });
        const newData = res.data || [];
        if (isRefresh) {
          setRecommendations(newData);
        } else {
          setRecommendations((prev) => [...prev, ...newData]);
        }
        setHasMore(newData.length === PAGE_SIZE);
        setPage(pageNum);
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [loading]
  );

  useEffect(() => {
    fetchRecommendations(1, true);
  }, [fetchRecommendations]);

  const handleLoadMore = () => {
    if (!loading && hasMore && !refreshing) {
      const nextPage = page + 1;
      fetchRecommendations(nextPage);
    }
  };

  const handleRefresh = () => {
    fetchRecommendations(1, true);
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'destination':
        return <MapPin size={16} color={colors.chentil.rosePink} />;
      case 'food':
        return <Utensils size={16} color={colors.chentil.rosePink} />;
      case 'culture':
        return <Palette size={16} color={colors.chentil.rosePink} />;
      default:
        return null;
    }
  };

  const onPress = (params: Content) => {
    router.push({
      pathname: '/detail',
      params: {
        id: params.id.toString(),
        image: params.image,
        name: params.title,
        category: params.category,
        location:
          params.province?.name ||
          params.regency?.name ||
          params.district?.name,
        description: params.description,
      },
    });
  };

  const renderItem = ({ item, index }: { item: Content; index: number }) => (
    <Animated.View key={item.id} entering={FadeInDown.delay(index * 100)}>
      <Pressable
        style={styles.recommendationCard}
        onPress={() => onPress(item)}
      >
        <Image source={{ uri: item.image }} style={styles.itemImage} />
        <View style={styles.itemInfo}>
          <View style={styles.typeContainer}>
            {getIcon(item.category)}
            <Text style={styles.typeText}>
              {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
            </Text>
          </View>
          <Text style={styles.itemTitle}>{item.title}</Text>
          <Text style={styles.itemDescription} numberOfLines={2}>
            {item.description}
          </Text>
          <View style={styles.locationContainer}>
            <MapPin size={14} color={colors.chentil.rosePink} />
            <Text style={styles.locationText}>
              {item.province?.name || item.regency?.name || item.district?.name}
            </Text>
          </View>
        </View>
      </Pressable>
    </Animated.View>
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
        <Text style={styles.title}>Recommended for You</Text>
        <Text style={styles.subtitle}>
          Discover amazing places, food, and culture
        </Text>
      </View>
      <FlatList
        data={recommendations}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.content}
        ListEmptyComponent={
          !loading ? (
            <Text style={styles.noRecommendations}>
              No recommendations found
            </Text>
          ) : null
        }
        ListFooterComponent={ListFooterComponent}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        showsVerticalScrollIndicator={false}
        refreshing={refreshing}
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
  content: {
    padding: 20,
  },
  recommendationCard: {
    flexDirection: 'row',
    backgroundColor: colors.background.primary,
    borderRadius: 16,
    overflow: 'hidden',
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
  itemImage: {
    width: 120,
    height: 135,
  },
  itemInfo: {
    flex: 1,
    padding: 12,
  },
  typeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  typeText: {
    fontFamily: 'PlusJakartaSans-Medium',
    fontSize: 12,
    color: '#FF4D8D',
    marginLeft: 4,
  },
  itemTitle: {
    fontFamily: 'PlusJakartaSans-SemiBold',
    fontSize: 16,
    color: colors.brand.primary,
    marginBottom: 4,
  },
  itemDescription: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 12,
    color: '#4A5568',
    marginBottom: 8,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 12,
    color: colors.chentil.rosePink,
    marginLeft: 4,
  },
  noRecommendations: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 14,
    color: '#4A5568',
    textAlign: 'center',
    padding: 20,
  },
});
