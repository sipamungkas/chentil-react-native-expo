import { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, MapPin } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { colors } from '@/theme/colors';

const PROVINCES = [
  {
    id: 'aceh',
    name: 'Aceh',
    region: 'Sumatra',
    image:
      'https://images.unsplash.com/photo-1596870230751-ebdfce98ec42?auto=format&fit=crop&q=80&w=800',
    description:
      'Known for its rich, spicy cuisine influenced by Indian and Middle Eastern flavors.',
  },
  {
    id: 'north-sumatra',
    name: 'North Sumatra',
    region: 'Sumatra',
    image:
      'https://images.unsplash.com/photo-1622644989768-7a2cfd464756?auto=format&fit=crop&q=80&w=800',
    description:
      'Home to the famous Batak cuisine, known for its bold and spicy flavors.',
  },
  {
    id: 'west-java',
    name: 'West Java',
    region: 'Java',
    image:
      'https://images.unsplash.com/photo-1505993597083-3bd19fb75e57?auto=format&fit=crop&q=80&w=800',
    description:
      'Sundanese cuisine is known for its fresh vegetables and sambal.',
  },
  {
    id: 'central-java',
    name: 'Central Java',
    region: 'Java',
    image:
      'https://images.unsplash.com/photo-1583335026414-89cf12f83cb7?auto=format&fit=crop&q=80&w=800',
    description: 'Features royal Javanese cuisine and sweet dishes.',
  },
  {
    id: 'yogyakarta',
    name: 'Yogyakarta',
    region: 'Java',
    image:
      'https://images.unsplash.com/photo-1584093091778-e7f4e76e8063?auto=format&fit=crop&q=80&w=800',
    description: 'Known for its Gudeg and traditional royal cuisine.',
  },
  {
    id: 'east-java',
    name: 'East Java',
    region: 'Java',
    image:
      'https://images.unsplash.com/photo-1531706411987-55c5a91b6a9a?auto=format&fit=crop&q=80&w=800',
    description: 'Famous for its sweet and spicy flavors.',
  },
  {
    id: 'bali',
    name: 'Bali',
    region: 'Lesser Sunda Islands',
    image:
      'https://images.unsplash.com/photo-1517861018043-ae1a7ff62c72?auto=format&fit=crop&q=80&w=800',
    description:
      'Rich in herbs and spices, featuring unique ceremonial dishes.',
  },
  {
    id: 'south-sulawesi',
    name: 'South Sulawesi',
    region: 'Sulawesi',
    image:
      'https://images.unsplash.com/photo-1626160938797-2549a8e5f4cb?auto=format&fit=crop&q=80&w=800',
    description: 'Known for its seafood and Makassar cuisine.',
  },
  {
    id: 'papua',
    name: 'Papua',
    region: 'Papua',
    image:
      'https://images.unsplash.com/photo-1617194663454-aa9d11b77d8e?auto=format&fit=crop&q=80&w=800',
    description: 'Features unique dishes using sago and local ingredients.',
  },
];

export default function FoodAndBeverageScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const groupedProvinces = PROVINCES.reduce((acc, province) => {
    if (!acc[province.region]) {
      acc[province.region] = [];
    }
    acc[province.region].push(province);
    return acc;
  }, {} as Record<string, typeof PROVINCES>);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Indonesian Cuisine</Text>
          <Text style={styles.subtitle}>
            Explore traditional foods by region
          </Text>
        </View>

        <Pressable style={styles.searchBar}>
          <Search size={20} color="#4A5568" />
          <Text style={styles.searchText}>Search provinces or regions</Text>
        </Pressable>

        <View style={styles.content}>
          {Object.entries(groupedProvinces).map(
            ([region, provinces], regionIndex) => (
              <Animated.View
                key={region}
                entering={FadeInDown.delay(regionIndex * 100)}
              >
                <Text style={styles.regionTitle}>{region}</Text>
                {provinces.map((province, provinceIndex) => (
                  <Animated.View
                    key={province.id}
                    entering={FadeInDown.delay(
                      regionIndex * 100 + provinceIndex * 50
                    )}
                    style={styles.provinceCard}
                  >
                    <Pressable
                      onPress={() =>
                        router.push(`/food-and-beverage/${province.id}`)
                      }
                    >
                      <Image
                        source={{ uri: province.image }}
                        style={styles.provinceImage}
                      />
                      <View style={styles.provinceInfo}>
                        <View style={styles.provinceHeader}>
                          <Text style={styles.provinceName}>
                            {province.name}
                          </Text>
                          <View style={styles.regionTag}>
                            <MapPin size={12} color="#ED8936" />
                            <Text style={styles.regionTagText}>
                              {province.region}
                            </Text>
                          </View>
                        </View>
                        <Text
                          style={styles.provinceDescription}
                          numberOfLines={2}
                        >
                          {province.description}
                        </Text>
                      </View>
                    </Pressable>
                  </Animated.View>
                ))}
              </Animated.View>
            )
          )}
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
  regionTitle: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 20,
    color: '#1A202C',
    marginBottom: 16,
    marginTop: 8,
  },
  provinceCard: {
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
  provinceImage: {
    width: '100%',
    height: 160,
  },
  provinceInfo: {
    padding: 16,
  },
  provinceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  provinceName: {
    fontFamily: 'PlusJakartaSans-SemiBold',
    fontSize: 18,
    color: '#1A202C',
  },
  regionTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEEBC8',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  regionTagText: {
    fontFamily: 'PlusJakartaSans-Medium',
    fontSize: 12,
    color: '#C05621',
    marginLeft: 4,
  },
  provinceDescription: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 14,
    color: '#4A5568',
    lineHeight: 20,
  },
});
