import { useLocalSearchParams } from 'expo-router';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  MapPin,
  Clock,
  Calendar,
  Utensils,
  Users,
  ArrowLeft,
} from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { colors } from '@/theme/colors';

const DESTINATIONS = {
  java: {
    '1': {
      id: '1',
      name: 'Borobudur Temple',
      location: 'Magelang, Central Java',
      description:
        "The world's largest Buddhist temple, Borobudur is a 9th-century Mahayana Buddhist temple featuring intricate relief panels and Buddha statues across its many levels.",
      image:
        'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?auto=format&fit=crop&q=80&w=1200',
      visitDuration: '3-4 hours',
      bestTime: 'Sunrise (4:30 AM - 6:30 AM)',
      entranceFee: 'Rp 350,000',
      culture: {
        title: 'Buddhist Heritage',
        description:
          'Built during the Sailendra Dynasty, Borobudur represents the blend of Indonesian indigenous ancestor worship and Buddhist concepts.',
        traditions: [
          'Morning offerings by local monks',
          'Waisak festival celebrations',
          'Traditional Javanese ceremonies',
        ],
      },
      localFood: [
        {
          name: 'Nasi Gudeg',
          description: 'Traditional Javanese dish made from young jackfruit',
          price: 'Rp 25,000 - 35,000',
          image:
            'https://images.unsplash.com/photo-1609519710989-3543e46f3f4f?auto=format&fit=crop&q=80&w=600',
        },
        {
          name: 'Bakpia',
          description: 'Sweet filled pastry, popular Yogyakarta snack',
          price: 'Rp 15,000 - 25,000',
          image:
            'https://images.unsplash.com/photo-1514517604298-cf80e0fb7f1e?auto=format&fit=crop&q=80&w=600',
        },
      ],
      activities: [
        {
          name: 'Sunrise Tour',
          description:
            'Watch the sunrise over Mount Merapi from the temple top',
          duration: '2 hours',
          price: 'Rp 100,000',
        },
        {
          name: 'Photography Session',
          description: 'Professional photo session among ancient ruins',
          duration: '1 hour',
          price: 'Rp 200,000',
        },
        {
          name: 'Cultural Workshop',
          description: 'Learn about temple history and Buddhist symbolism',
          duration: '1.5 hours',
          price: 'Rp 150,000',
        },
      ],
    },
    '2': {
      id: '2',
      name: 'Mount Bromo',
      location: 'East Java',
      description:
        'An active volcano offering spectacular sunrise views and lunar-like landscapes.',
      image:
        'https://images.unsplash.com/photo-1589395595558-690008363e88?auto=format&fit=crop&q=80&w=1200',
      visitDuration: '2-3 hours',
      bestTime: 'Sunrise (3:30 AM - 6:00 AM)',
      entranceFee: 'Rp 220,000',
      culture: {
        title: 'Tengger Culture',
        description:
          'Home to the Tengger people who maintain their unique Hindu traditions and perform the annual Kasada ceremony.',
        traditions: [
          'Kasada ceremony offerings',
          'Traditional Tengger dances',
          'Local spiritual rituals',
        ],
      },
      localFood: [
        {
          name: 'Tengger Soup',
          description: 'Traditional vegetable soup with local herbs',
          price: 'Rp 20,000 - 30,000',
          image:
            'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&q=80&w=600',
        },
      ],
      activities: [
        {
          name: 'Jeep Tour',
          description: 'Explore the Sea of Sand by jeep',
          duration: '3 hours',
          price: 'Rp 350,000',
        },
        {
          name: 'Hiking Tour',
          description: 'Trek to the volcano viewpoint',
          duration: '2 hours',
          price: 'Rp 150,000',
        },
      ],
    },
  },
  bali: {
    '1': {
      id: '1',
      name: 'Tanah Lot Temple',
      location: 'Tabanan, Bali',
      description:
        'Ancient Hindu temple perched on a rocky outcrop in the sea, famous for its stunning sunset views.',
      image:
        'https://images.unsplash.com/photo-1604999333679-b86d54738315?auto=format&fit=crop&q=80&w=1200',
      visitDuration: '2-3 hours',
      bestTime: 'Sunset (5:00 PM - 6:30 PM)',
      entranceFee: 'Rp 60,000',
      culture: {
        title: 'Balinese Hindu Heritage',
        description:
          "One of Bali's most important sea temples, built to honor the sea gods of Balinese Hinduism.",
        traditions: [
          'Daily temple ceremonies',
          'Traditional Kecak fire dance',
          'Blessing rituals',
        ],
      },
      localFood: [
        {
          name: 'Sambal Matah',
          description: 'Traditional Balinese raw spicy relish',
          price: 'Rp 15,000 - 25,000',
          image:
            'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&q=80&w=600',
        },
      ],
      activities: [
        {
          name: 'Sunset Photography',
          description: 'Capture the magical sunset views',
          duration: '2 hours',
          price: 'Rp 100,000',
        },
        {
          name: 'Cultural Tour',
          description: 'Learn about temple history and legends',
          duration: '1.5 hours',
          price: 'Rp 75,000',
        },
      ],
    },
  },
};

export default function DestinationDetail() {
  const { island, id } = useLocalSearchParams();
  const router = useRouter();

  const destination =
    DESTINATIONS[island as keyof typeof DESTINATIONS]?.[id as string];

  if (!destination) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Destination not found</Text>
          <Pressable style={styles.backButton} onPress={() => router.back()}>
            <ArrowLeft size={24} color="#1A202C" />
            <Text style={styles.backButtonText}>Go Back</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Image
            source={{ uri: destination.image }}
            style={styles.headerImage}
          />
          <Pressable style={styles.backButton} onPress={() => router.back()}>
            <ArrowLeft color="#fff" size={24} />
          </Pressable>
        </View>

        <View style={styles.content}>
          <Text style={styles.title}>{destination.name}</Text>
          <View style={styles.locationRow}>
            <MapPin size={16} color="#4A5568" />
            <Text style={styles.locationText}>{destination.location}</Text>
          </View>
          <Text style={styles.description}>{destination.description}</Text>

          <View style={styles.infoGrid}>
            <View style={styles.infoItem}>
              <Clock size={20} color="#FF6B6B" />
              <Text style={styles.infoLabel}>Duration</Text>
              <Text style={styles.infoValue}>{destination.visitDuration}</Text>
            </View>
            <View style={styles.infoItem}>
              <Calendar size={20} color="#FF6B6B" />
              <Text style={styles.infoLabel}>Best Time</Text>
              <Text style={styles.infoValue}>{destination.bestTime}</Text>
            </View>
            <View style={styles.infoItem}>
              <Users size={20} color="#FF6B6B" />
              <Text style={styles.infoLabel}>Entrance</Text>
              <Text style={styles.infoValue}>{destination.entranceFee}</Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Cultural Heritage</Text>
            <Text style={styles.culturalTitle}>
              {destination.culture.title}
            </Text>
            <Text style={styles.culturalDescription}>
              {destination.culture.description}
            </Text>
            <View style={styles.traditionsList}>
              {destination.culture.traditions.map((tradition, index) => (
                <View key={index} style={styles.traditionItem}>
                  <View style={styles.traditionDot} />
                  <Text style={styles.traditionText}>{tradition}</Text>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Local Cuisine</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.foodScroll}
            >
              {destination.localFood.map((food, index) => (
                <View key={index} style={styles.foodCard}>
                  <Image
                    source={{ uri: food.image }}
                    style={styles.foodImage}
                  />
                  <View style={styles.foodInfo}>
                    <Text style={styles.foodName}>{food.name}</Text>
                    <Text style={styles.foodDescription}>
                      {food.description}
                    </Text>
                    <Text style={styles.foodPrice}>{food.price}</Text>
                  </View>
                </View>
              ))}
            </ScrollView>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Activities</Text>
            {destination.activities.map((activity, index) => (
              <View key={index} style={styles.activityCard}>
                <View style={styles.activityHeader}>
                  <Text style={styles.activityName}>{activity.name}</Text>
                  <Text style={styles.activityPrice}>{activity.price}</Text>
                </View>
                <Text style={styles.activityDescription}>
                  {activity.description}
                </Text>
                <View style={styles.activityFooter}>
                  <Clock size={14} color="#4A5568" />
                  <Text style={styles.activityDuration}>
                    {activity.duration}
                  </Text>
                </View>
              </View>
            ))}
          </View>
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
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontFamily: 'PlusJakartaSans-SemiBold',
    fontSize: 18,
    color: '#1A202C',
    marginBottom: 16,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  backButtonText: {
    fontFamily: 'PlusJakartaSans-SemiBold',
    fontSize: 16,
    color: '#1A202C',
    marginLeft: 8,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    position: 'relative',
  },
  headerImage: {
    width: '100%',
    height: 300,
  },
  content: {
    padding: 20,
  },
  title: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 28,
    color: '#1A202C',
    marginBottom: 8,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  locationText: {
    fontFamily: 'PlusJakartaSans-Medium',
    fontSize: 14,
    color: '#4A5568',
    marginLeft: 4,
  },
  description: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 16,
    color: '#4A5568',
    lineHeight: 24,
    marginBottom: 24,
  },
  infoGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  infoItem: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
    backgroundColor: colors.background.tertiary,
    borderRadius: 12,
    marginHorizontal: 4,
  },
  infoLabel: {
    fontFamily: 'PlusJakartaSans-Medium',
    fontSize: 12,
    color: '#4A5568',
    marginTop: 8,
  },
  infoValue: {
    fontFamily: 'PlusJakartaSans-SemiBold',
    fontSize: 14,
    color: '#1A202C',
    marginTop: 4,
    textAlign: 'center',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 20,
    color: '#1A202C',
    marginBottom: 12,
  },
  culturalTitle: {
    fontFamily: 'PlusJakartaSans-SemiBold',
    fontSize: 16,
    color: '#1A202C',
    marginBottom: 8,
  },
  culturalDescription: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 14,
    color: '#4A5568',
    lineHeight: 22,
    marginBottom: 16,
  },
  traditionsList: {
    marginTop: 12,
  },
  traditionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  traditionDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#FF6B6B',
    marginRight: 8,
  },
  traditionText: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 14,
    color: '#4A5568',
  },
  foodScroll: {
    marginHorizontal: -20,
    paddingHorizontal: 20,
  },
  foodCard: {
    width: 240,
    marginRight: 16,
    backgroundColor: colors.background.primary,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  foodImage: {
    width: '100%',
    height: 160,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  foodInfo: {
    padding: 12,
  },
  foodName: {
    fontFamily: 'PlusJakartaSans-SemiBold',
    fontSize: 16,
    color: '#1A202C',
    marginBottom: 4,
  },
  foodDescription: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 12,
    color: '#4A5568',
    marginBottom: 8,
  },
  foodPrice: {
    fontFamily: 'PlusJakartaSans-Medium',
    fontSize: 14,
    color: '#FF6B6B',
  },
  activityCard: {
    backgroundColor: colors.background.primary,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  activityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  activityName: {
    fontFamily: 'PlusJakartaSans-SemiBold',
    fontSize: 16,
    color: '#1A202C',
  },
  activityPrice: {
    fontFamily: 'PlusJakartaSans-Medium',
    fontSize: 14,
    color: '#FF6B6B',
  },
  activityDescription: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 14,
    color: '#4A5568',
    marginBottom: 12,
  },
  activityFooter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  activityDuration: {
    fontFamily: 'PlusJakartaSans-Medium',
    fontSize: 12,
    color: '#4A5568',
    marginLeft: 4,
  },
});
