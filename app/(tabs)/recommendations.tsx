import { StyleSheet, View, Text, ScrollView, Image, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MapPin, Utensils, Palette } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import Animated, { FadeInDown } from 'react-native-reanimated';

const RECOMMENDATIONS = [
  {
    id: '1',
    type: 'destination',
    title: 'Karimun Jawa',
    description: 'A pristine archipelago featuring crystal clear waters, vibrant coral reefs, and white sandy beaches.',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=800',
    location: 'Central Java',
    route: '/destination/java/karimunjawa',
  },
  {
    id: '2',
    type: 'food',
    title: 'Sate Padang',
    description: 'Traditional Minangkabau satay served with thick, spicy yellow sauce made from rice flour, turmeric, ginger, and various spices.',
    image: 'https://images.unsplash.com/photo-1625938144755-652e08e08f79?auto=format&fit=crop&q=80&w=800',
    location: 'West Sumatra',
    route: '/food-and-beverage/west-sumatra/sate-padang',
  },
  {
    id: '3',
    type: 'culture',
    title: 'Kecak Fire Dance',
    description: 'A mesmerizing Balinese dance and music drama developed in the 1930s, known for its unique vocal chanting.',
    image: 'https://images.unsplash.com/photo-1583309217394-d35d84b4c544?auto=format&fit=crop&q=80&w=800',
    location: 'Bali',
    route: '/culture/bali/kecak',
  },
  {
    id: '4',
    type: 'destination',
    title: 'Raja Ampat',
    description: 'A stunning archipelago comprising over 1,500 small islands, known for the richest marine biodiversity on Earth.',
    image: 'https://images.unsplash.com/photo-1516690561799-46d8f74f9abf?auto=format&fit=crop&q=80&w=800',
    location: 'West Papua',
    route: '/destination/papua/raja-ampat',
  },
  {
    id: '5',
    type: 'food',
    title: 'Rendang',
    description: 'A rich and tender coconut beef stew that\'s considered one of the world\'s most delicious foods.',
    image: 'https://images.unsplash.com/photo-1628534795735-0a0b6720828f?auto=format&fit=crop&q=80&w=800',
    location: 'West Sumatra',
    route: '/food-and-beverage/west-sumatra/rendang',
  },
];

export default function RecommendationsScreen() {
  const router = useRouter();

  const getIcon = (type: string) => {
    switch (type) {
      case 'destination':
        return <MapPin size={16} color="#FF4D8D" />;
      case 'food':
        return <Utensils size={16} color="#FF4D8D" />;
      case 'culture':
        return <Palette size={16} color="#FF4D8D" />;
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Recommended for You</Text>
          <Text style={styles.subtitle}>Discover amazing places, food, and culture</Text>
        </View>

        <View style={styles.content}>
          {RECOMMENDATIONS.map((item, index) => (
            <Animated.View
              key={item.id}
              entering={FadeInDown.delay(index * 100)}
            >
              <Pressable
                style={styles.recommendationCard}
                onPress={() => router.push(item.route)}
              >
                <Image source={{ uri: item.image }} style={styles.itemImage} />
                <View style={styles.itemInfo}>
                  <View style={styles.typeContainer}>
                    {getIcon(item.type)}
                    <Text style={styles.typeText}>
                      {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                    </Text>
                  </View>
                  <Text style={styles.itemTitle}>{item.title}</Text>
                  <Text style={styles.itemDescription} numberOfLines={2}>
                    {item.description}
                  </Text>
                  <View style={styles.locationContainer}>
                    <MapPin size={14} color="#4A5568" />
                    <Text style={styles.locationText}>{item.location}</Text>
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
    width: 120,
    height: 120,
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
    color: '#1A202C',
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
    color: '#4A5568',
    marginLeft: 4,
  },
});