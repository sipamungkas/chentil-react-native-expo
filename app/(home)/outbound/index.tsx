import { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, Image, Pressable, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MapPin, Search } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import Animated, { FadeInDown } from 'react-native-reanimated';

const OUTBOUND_ACTIVITIES = [
  {
    id: '1',
    type: 'Hiking',
    location: 'Jayawijaya, Papua',
    image: 'https://images.unsplash.com/photo-1621769533938-13931cc09d92?auto=format&fit=crop&q=80&w=600',
    description: 'Experience the thrill of climbing Puncak Jaya, the highest peak between the Himalayas and the Andes.',
    difficulty: 'Expert',
    duration: '7-10 days',
    bestSeason: 'June to August',
  },
  {
    id: '2',
    type: 'Diving',
    location: 'Raja Ampat, West Papua',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=600',
    description: "Explore the world's most diverse marine ecosystem with over 1,500 species of fish and 500 species of coral.",
    difficulty: 'Intermediate',
    duration: '3-5 days',
    bestSeason: 'October to April',
  },
  {
    id: '3',
    type: 'Rock Climbing',
    location: 'Parang Mountain, Central Java',
    image: 'https://images.unsplash.com/photo-1522163182402-834f871fd851?auto=format&fit=crop&q=80&w=600',
    description: 'Challenge yourself on natural limestone cliffs with routes for all skill levels.',
    difficulty: 'Intermediate',
    duration: '1-2 days',
    bestSeason: 'May to September',
  },
  {
    id: '4',
    type: 'Surfing',
    location: 'Uluwatu, Bali',
    image: 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&q=80&w=600',
    description: "Ride world-class waves at one of Bali's most iconic surf spots.",
    difficulty: 'Advanced',
    duration: '1-3 days',
    bestSeason: 'April to October',
  },
  {
    id: '5',
    type: 'Rafting',
    location: 'Ayung River, Bali',
    image: 'https://images.unsplash.com/photo-1530866495561-507c9faab2ed?auto=format&fit=crop&q=80&w=600',
    description: 'Navigate through class II and III rapids while enjoying scenic rainforest views.',
    difficulty: 'Beginner',
    duration: '1 day',
    bestSeason: 'Year-round',
  },
  {
    id: '6',
    type: 'Camping',
    location: 'Mount Rinjani, Lombok',
    image: 'https://images.unsplash.com/photo-1504851149312-7a075b496cc7?auto=format&fit=crop&q=80&w=600',
    description: "Camp under the stars at Indonesia's second-highest volcano.",
    difficulty: 'Intermediate',
    duration: '3-4 days',
    bestSeason: 'April to November',
  },
];

const { width } = Dimensions.get('window');
const COLUMN_COUNT = 2;
const GRID_PADDING = 20;
const GRID_SPACING = 12;
const ITEM_WIDTH = (width - (GRID_PADDING * 2) - (GRID_SPACING * (COLUMN_COUNT - 1))) / COLUMN_COUNT;

export default function OutboundScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredActivities = OUTBOUND_ACTIVITIES.filter(activity =>
    activity.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
    activity.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Outbound Activities</Text>
        <Text style={styles.subtitle}>Discover exciting outdoor adventures</Text>
      </View>

      <Pressable style={styles.searchBar}>
        <Search size={20} color="#4A5568" />
        <Text style={styles.searchText}>Search activities or locations</Text>
      </Pressable>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.gridContainer}
        showsVerticalScrollIndicator={false}
      >
        {filteredActivities.map((activity, index) => (
          <Animated.View
            key={activity.id}
            entering={FadeInDown.delay(index * 100)}
            style={styles.gridItem}
          >
            <Pressable
              style={styles.activityCard}
              onPress={() => router.push(`/outbound/${activity.id}`)}
            >
              <Image source={{ uri: activity.image }} style={styles.activityImage} />
              <View style={styles.activityInfo}>
                <Text style={styles.activityType}>{activity.type}</Text>
                <View style={styles.locationContainer}>
                  <MapPin size={12} color="#4A5568" />
                  <Text style={styles.locationText}>{activity.location}</Text>
                </View>
              </View>
            </Pressable>
          </Animated.View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
    backgroundColor: '#F7FAFC',
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
  scrollView: {
    flex: 1,
  },
  gridContainer: {
    padding: GRID_PADDING,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: GRID_SPACING,
  },
  gridItem: {
    width: ITEM_WIDTH,
  },
  activityCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  activityImage: {
    width: '100%',
    height: ITEM_WIDTH,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  activityInfo: {
    padding: 8,
  },
  activityType: {
    fontFamily: 'PlusJakartaSans-SemiBold',
    fontSize: 14,
    color: '#1A202C',
    marginBottom: 4,
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