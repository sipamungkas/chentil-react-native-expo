import { StyleSheet, View, Text, ScrollView, Pressable, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Compass, Plane, Utensils, Palette } from 'lucide-react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

const { width } = Dimensions.get('window');
const GRID_SPACING = 16;
const CARD_WIDTH = (width - (GRID_SPACING * 3)) / 2;

const CATEGORIES = [
  {
    id: 'destination',
    name: 'Destinations',
    icon: Compass,
    color: '#FF4D8D',
    backgroundColor: '#FFF5F7',
    description: 'Your favorite places to visit',
    count: 12,
  },
  {
    id: 'outbound',
    name: 'Outbound',
    icon: Plane,
    color: '#4299E1',
    backgroundColor: '#EBF8FF',
    description: 'Saved outdoor activities',
    count: 5,
  },
  {
    id: 'food',
    name: 'Food & Beverage',
    icon: Utensils,
    color: '#ED8936',
    backgroundColor: '#FFFAF0',
    description: 'Culinary discoveries',
    count: 8,
  },
  {
    id: 'culture',
    name: 'Culture',
    icon: Palette,
    color: '#48BB78',
    backgroundColor: '#F0FFF4',
    description: 'Cultural experiences',
    count: 3,
  },
];

export default function WishlistScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Wishlist</Text>
          <Text style={styles.subtitle}>Your saved items by category</Text>
        </View>

        <View style={styles.grid}>
          {CATEGORIES.map((category, index) => (
            <Animated.View
              key={category.id}
              entering={FadeInDown.delay(index * 100)}
              style={styles.gridItem}
            >
              <Pressable
                style={[
                  styles.categoryCard,
                  { backgroundColor: category.backgroundColor }
                ]}
                onPress={() => router.push(`/wishlist/${category.id}`)}
              >
                <category.icon size={32} color={category.color} />
                <Text style={styles.categoryName}>{category.name}</Text>
                <Text style={styles.categoryDescription}>{category.description}</Text>
                <View style={[styles.countBadge, { backgroundColor: category.color }]}>
                  <Text style={styles.countText}>{category.count}</Text>
                </View>
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
    backgroundColor: '#fff',
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
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: GRID_SPACING,
  },
  gridItem: {
    width: CARD_WIDTH,
    margin: GRID_SPACING / 2,
  },
  categoryCard: {
    padding: 20,
    borderRadius: 16,
    height: 180,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  categoryName: {
    fontFamily: 'PlusJakartaSans-SemiBold',
    fontSize: 16,
    color: '#1A202C',
    marginTop: 12,
    marginBottom: 4,
  },
  categoryDescription: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 12,
    color: '#4A5568',
    marginBottom: 12,
  },
  countBadge: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  countText: {
    fontFamily: 'PlusJakartaSans-SemiBold',
    fontSize: 12,
    color: '#fff',
  },
});