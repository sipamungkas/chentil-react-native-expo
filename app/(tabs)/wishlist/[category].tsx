import { StyleSheet, View, Text, ScrollView, Image, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowLeft, MapPin, Star } from 'lucide-react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

const WISHLIST_ITEMS = {
  destination: [
    {
      id: '1',
      name: 'Borobudur Temple',
      location: 'Magelang, Central Java',
      image: 'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?auto=format&fit=crop&q=80&w=800',
      rating: 4.8,
    },
    {
      id: '2',
      name: 'Raja Ampat Islands',
      location: 'West Papua',
      image: 'https://images.unsplash.com/photo-1516690561799-46d8f74f9abf?auto=format&fit=crop&q=80&w=800',
      rating: 4.9,
    },
  ],
  outbound: [
    {
      id: '1',
      name: 'Mount Rinjani Trek',
      location: 'Lombok',
      image: 'https://images.unsplash.com/photo-1621769533938-13931cc09d92?auto=format&fit=crop&q=80&w=800',
      rating: 4.7,
    },
  ],
  food: [
    {
      id: '1',
      name: 'Rendang',
      location: 'West Sumatra',
      image: 'https://images.unsplash.com/photo-1628534795735-0a0b6720828f?auto=format&fit=crop&q=80&w=800',
      rating: 4.9,
    },
  ],
  culture: [
    {
      id: '1',
      name: 'Kecak Fire Dance',
      location: 'Uluwatu, Bali',
      image: 'https://images.unsplash.com/photo-1583309217394-d35d84b4c544?auto=format&fit=crop&q=80&w=800',
      rating: 4.8,
    },
  ],
};

const CATEGORY_NAMES = {
  destination: 'Destinations',
  outbound: 'Outbound Activities',
  food: 'Food & Beverage',
  culture: 'Cultural Experiences',
};

export default function WishlistCategoryScreen() {
  const { category } = useLocalSearchParams();
  const router = useRouter();
  const items = WISHLIST_ITEMS[category as keyof typeof WISHLIST_ITEMS] || [];
  const categoryName = CATEGORY_NAMES[category as keyof typeof CATEGORY_NAMES];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Pressable style={styles.backButton} onPress={() => router.back()}>
            <ArrowLeft size={24} color="#1A202C" />
          </Pressable>
          <Text style={styles.title}>{categoryName}</Text>
          <Text style={styles.subtitle}>{items.length} saved items</Text>
        </View>

        <View style={styles.content}>
          {items.map((item, index) => (
            <Animated.View
              key={item.id}
              entering={FadeInDown.delay(index * 100)}
            >
              <Pressable style={styles.itemCard}>
                <Image source={{ uri: item.image }} style={styles.itemImage} />
                <View style={styles.itemInfo}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <View style={styles.locationContainer}>
                    <MapPin size={14} color="#4A5568" />
                    <Text style={styles.locationText}>{item.location}</Text>
                  </View>
                  <View style={styles.ratingContainer}>
                    <Star size={14} color="#FFB800" fill="#FFB800" />
                    <Text style={styles.ratingText}>{item.rating}</Text>
                  </View>
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
  itemCard: {
    backgroundColor: '#fff',
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
    width: '100%',
    height: 200,
  },
  itemInfo: {
    padding: 16,
  },
  itemName: {
    fontFamily: 'PlusJakartaSans-SemiBold',
    fontSize: 18,
    color: '#1A202C',
    marginBottom: 8,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  locationText: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 14,
    color: '#4A5568',
    marginLeft: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontFamily: 'PlusJakartaSans-Medium',
    fontSize: 14,
    color: '#1A202C',
    marginLeft: 4,
  },
});