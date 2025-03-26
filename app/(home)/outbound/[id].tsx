import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import {
  ArrowLeft,
  MapPin,
  Clock,
  Calendar,
  TriangleAlert as AlertTriangle,
  Users,
} from 'lucide-react-native';
import { colors } from '@/theme/colors';

const OUTBOUND_ACTIVITIES = [
  {
    id: '1',
    type: 'Hiking',
    location: 'Jayawijaya, Papua',
    image:
      'https://images.unsplash.com/photo-1621769533938-13931cc09d92?auto=format&fit=crop&q=80&w=600',
    description:
      'Experience the thrill of climbing Puncak Jaya, the highest peak between the Himalayas and the Andes.',
    difficulty: 'Expert',
    duration: '7-10 days',
    bestSeason: 'June to August',
    details: {
      elevation: '4,884 m',
      terrain: 'Alpine, Rock, Snow/Ice',
      groupSize: '4-8 people',
      requirements: [
        'Previous high-altitude experience',
        'Technical climbing skills',
        'Excellent physical condition',
        'Proper equipment and gear',
      ],
      included: [
        'Professional mountain guides',
        'Camping equipment',
        'Meals during trek',
        'Safety equipment',
        'Permits and fees',
      ],
    },
  },
  {
    id: '2',
    type: 'Diving',
    location: 'Raja Ampat, West Papua',
    image:
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=600',
    description:
      "Explore the world's most diverse marine ecosystem with over 1,500 species of fish and 500 species of coral.",
    difficulty: 'Intermediate',
    duration: '3-5 days',
    bestSeason: 'October to April',
    details: {
      elevation: 'Sea level',
      terrain: 'Coral Reef, Open Water',
      groupSize: '4-6 people',
      requirements: [
        'PADI Open Water certification',
        'Basic diving experience',
        'Swimming proficiency',
        'Medical clearance',
      ],
      included: [
        'Professional dive guides',
        'Diving equipment',
        'Boat transfers',
        'Accommodation',
        'Meals',
      ],
    },
  },
  {
    id: '3',
    type: 'Rock Climbing',
    location: 'Parang Mountain, Central Java',
    image:
      'https://images.unsplash.com/photo-1522163182402-834f871fd851?auto=format&fit=crop&q=80&w=600',
    description:
      'Challenge yourself on natural limestone cliffs with routes for all skill levels.',
    difficulty: 'Intermediate',
    duration: '1-2 days',
    bestSeason: 'May to September',
    details: {
      elevation: '300-600 m',
      terrain: 'Limestone Cliffs',
      groupSize: '2-4 people',
      requirements: [
        'Basic climbing experience',
        'Good physical fitness',
        'No fear of heights',
        'Basic safety knowledge',
      ],
      included: [
        'Climbing instructor',
        'Safety equipment',
        'Harness and ropes',
        'Basic training',
        'First aid support',
      ],
    },
  },
  {
    id: '4',
    type: 'Surfing',
    location: 'Uluwatu, Bali',
    image:
      'https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&q=80&w=600',
    description:
      "Ride world-class waves at one of Bali's most iconic surf spots.",
    difficulty: 'Advanced',
    duration: '1-3 days',
    bestSeason: 'April to October',
    details: {
      elevation: 'Sea level',
      terrain: 'Reef Break',
      groupSize: '1-4 people',
      requirements: [
        'Advanced surfing skills',
        'Strong swimming ability',
        'Experience with reef breaks',
        'Own surfboard recommended',
      ],
      included: [
        'Local surf guide',
        'Transport to spots',
        'Safety briefing',
        'Spot analysis',
        'Emergency support',
      ],
    },
  },
  {
    id: '5',
    type: 'Rafting',
    location: 'Ayung River, Bali',
    image:
      'https://images.unsplash.com/photo-1530866495561-507c9faab2ed?auto=format&fit=crop&q=80&w=600',
    description:
      'Navigate through class II and III rapids while enjoying scenic rainforest views.',
    difficulty: 'Beginner',
    duration: '1 day',
    bestSeason: 'Year-round',
    details: {
      elevation: '100-300 m',
      terrain: 'River Rapids',
      groupSize: '4-6 people',
      requirements: [
        'Basic swimming ability',
        'Minimum age 12',
        'Good health condition',
        'Willingness to follow instructions',
      ],
      included: [
        'Professional river guide',
        'Rafting equipment',
        'Safety gear',
        'Lunch',
        'Insurance',
      ],
    },
  },
  {
    id: '6',
    type: 'Camping',
    location: 'Mount Rinjani, Lombok',
    image:
      'https://images.unsplash.com/photo-1504851149312-7a075b496cc7?auto=format&fit=crop&q=80&w=600',
    description: "Camp under the stars at Indonesia's second-highest volcano.",
    difficulty: 'Intermediate',
    duration: '3-4 days',
    bestSeason: 'April to November',
    details: {
      elevation: '3,726 m',
      terrain: 'Volcanic, Forest',
      groupSize: '4-8 people',
      requirements: [
        'Good physical fitness',
        'Basic hiking experience',
        'Proper hiking gear',
        'Altitude tolerance',
      ],
      included: [
        'Camping equipment',
        'Professional guide',
        'Porter service',
        'Meals',
        'Permits',
      ],
    },
  },
];

export default function OutboundDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const activity = OUTBOUND_ACTIVITIES.find((a) => a.id === id);

  if (!activity) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Activity not found</Text>
          <Pressable
            style={styles.backToListButton}
            onPress={() => router.back()}
          >
            <Text style={styles.backToListText}>Back to Activities</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Image source={{ uri: activity.image }} style={styles.headerImage} />
          <Pressable style={styles.backButton} onPress={() => router.back()}>
            <ArrowLeft color="#fff" size={24} />
          </Pressable>
        </View>

        <View style={styles.content}>
          <Text style={styles.title}>{activity.type}</Text>
          <View style={styles.locationRow}>
            <MapPin size={16} color="#4A5568" />
            <Text style={styles.locationText}>{activity.location}</Text>
          </View>

          <View style={styles.infoGrid}>
            <View style={styles.infoItem}>
              <AlertTriangle size={20} color="#FF6B6B" />
              <Text style={styles.infoLabel}>Difficulty</Text>
              <Text style={styles.infoValue}>{activity.difficulty}</Text>
            </View>
            <View style={styles.infoItem}>
              <Clock size={20} color="#FF6B6B" />
              <Text style={styles.infoLabel}>Duration</Text>
              <Text style={styles.infoValue}>{activity.duration}</Text>
            </View>
            <View style={styles.infoItem}>
              <Calendar size={20} color="#FF6B6B" />
              <Text style={styles.infoLabel}>Best Season</Text>
              <Text style={styles.infoValue}>{activity.bestSeason}</Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>About</Text>
            <Text style={styles.description}>{activity.description}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Details</Text>
            <View style={styles.detailsGrid}>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Elevation</Text>
                <Text style={styles.detailValue}>
                  {activity.details.elevation}
                </Text>
              </View>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Terrain</Text>
                <Text style={styles.detailValue}>
                  {activity.details.terrain}
                </Text>
              </View>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Group Size</Text>
                <Text style={styles.detailValue}>
                  {activity.details.groupSize}
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Requirements</Text>
            {activity.details.requirements.map((req, index) => (
              <View key={index} style={styles.listItem}>
                <View style={styles.bullet} />
                <Text style={styles.listText}>{req}</Text>
              </View>
            ))}
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>What's Included</Text>
            {activity.details.included.map((item, index) => (
              <View key={index} style={styles.listItem}>
                <View style={styles.bullet} />
                <Text style={styles.listText}>{item}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* <View style={styles.footer}>
        <Pressable style={styles.bookButton}>
          <Text style={styles.bookButtonText}>Book Now</Text>
        </Pressable>
      </View> */}
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
  backToListButton: {
    backgroundColor: '#FF6B6B',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  backToListText: {
    fontFamily: 'PlusJakartaSans-SemiBold',
    fontSize: 16,
    color: '#fff',
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
  backButton: {
    position: 'absolute',
    top: 16,
    left: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
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
    marginBottom: 24,
  },
  locationText: {
    fontFamily: 'PlusJakartaSans-Medium',
    fontSize: 14,
    color: '#4A5568',
    marginLeft: 4,
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
  description: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 16,
    color: '#4A5568',
    lineHeight: 24,
  },
  detailsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -8,
  },
  detailItem: {
    width: '50%',
    padding: 8,
  },
  detailLabel: {
    fontFamily: 'PlusJakartaSans-Medium',
    fontSize: 14,
    color: '#4A5568',
    marginBottom: 4,
  },
  detailValue: {
    fontFamily: 'PlusJakartaSans-SemiBold',
    fontSize: 16,
    color: '#1A202C',
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  bullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#FF6B6B',
    marginRight: 8,
  },
  listText: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 14,
    color: '#4A5568',
    flex: 1,
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
  },
  bookButton: {
    backgroundColor: '#FF6B6B',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  bookButtonText: {
    fontFamily: 'PlusJakartaSans-SemiBold',
    fontSize: 16,
    color: '#fff',
  },
});
