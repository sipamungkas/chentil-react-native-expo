import { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { colors } from '@/theme/colors';
import { getProvinces } from '@/src/api/services/contentApi';
import type { Province } from '@/src/types/api';
import { ArrowLeft } from 'lucide-react-native';
import { FadeInDown } from 'react-native-reanimated';

export default function FoodAndBeverageScreen() {
  const router = useRouter();
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [loading, setLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    fetchProvinces();
  }, []);

  const fetchProvinces = async () => {
    setLoading(true);
    try {
      const data = await getProvinces();
      setProvinces(data);
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  const handleProvincePress = (province: Province) => {
    router.push({
      pathname: '/food-and-beverage/[province]',
      params: {
        province: province.id,
        province_id: province.id,
        province_name: province.name,
      },
    });
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    fetchProvinces();
  };

  const renderItem = ({ item, index }: { item: Province; index: number }) => (
    <Pressable
      style={styles.provinceCard}
      onPress={() => handleProvincePress(item)}
    >
      <Text style={styles.provinceName}>{item.name}</Text>
      {item.description ? (
        <Text style={styles.provinceDescription} numberOfLines={2}>
          {item.description}
        </Text>
      ) : null}
    </Pressable>
  );

  const ListFooterComponent = () =>
    loading ? (
      <ActivityIndicator size="small" color={colors.brand.primary} style={{ marginVertical: 16 }} />
    ) : null;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <ArrowLeft size={24} color="#1A202C" />
        </Pressable>
        <Text style={styles.title}>Indonesian Provinces</Text>
        <Text style={styles.subtitle}>Explore traditional foods by region</Text>
      </View>
      <FlatList
        data={provinces}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.content}
        ListEmptyComponent={
          !loading ? (
            <Text style={styles.noProvinces}>No provinces found</Text>
          ) : null
        }
        ListFooterComponent={ListFooterComponent}
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
  provinceCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    padding: 16,
  },
  provinceName: {
    fontFamily: 'PlusJakartaSans-SemiBold',
    fontSize: 18,
    color: '#1A202C',
  },
  provinceDescription: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 14,
    color: '#4A5568',
    marginTop: 4,
  },
  noProvinces: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 16,
    color: '#4A5568',
    marginTop: 16,
    textAlign: 'center',
  },
});
