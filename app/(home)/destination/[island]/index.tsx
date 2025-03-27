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
import { ArrowLeft, MapPin, Star } from 'lucide-react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { colors } from '@/theme/colors';
import { ItemCard } from '@/components/ItemCard';

const DESTINATIONS = {
  sumatra: {
    name: 'Sumatra',
    destinations: [
      {
        id: '1',
        name: 'Lake Toba',
        location: 'North Sumatra',
        description:
          "Lake Toba, the world's largest volcanic lake, stands as a testament to one of Earth's most dramatic geological events. Formed approximately 74,000 years ago by a supervolcanic eruption, this natural wonder spans an impressive 100 kilometers in length and 30 kilometers in width, making it one of Indonesia's most spectacular natural landmarks. At its heart lies Samosir Island, a massive island within the lake that's roughly the size of Singapore, showcasing the true scale of this magnificent body of water. The lake's crystal-clear waters, reaching depths of up to 505 meters, reflect the surrounding lush mountains and create a mesmerizing panorama that changes with the day's light. The region around Lake Toba is home to the Batak people, whose rich cultural heritage adds another fascinating dimension to the area. Visitors can explore traditional Batak villages with their distinctive architectural style, characterized by boat-shaped roofs and intricate wood carvings. The cool climate, typically 15-25°C, provides a refreshing escape from Indonesia's tropical heat. The lake offers numerous activities for tourists, from swimming and kayaking to hiking the surrounding mountains. Local hot springs dot the area, providing natural spa experiences. The soil around Lake Toba is incredibly fertile due to the volcanic history, supporting diverse agriculture including coffee plantations that produce some of Sumatra's finest beans. The lake's ecosystem supports various species of fish, including the endemic Batak fish, while the surrounding forests are home to numerous bird species and wildlife. Recent developments have improved accessibility while preserving the area's natural charm, making it an increasingly popular destination for both domestic and international tourists seeking to experience one of Southeast Asia's most remarkable natural wonders.",
        image:
          'https://images.unsplash.com/photo-1596870230751-ebdfce98ec42?auto=format&fit=crop&q=80&w=800',
        rating: 4.8,
      },
      {
        id: '2',
        name: 'Mentawai Islands',
        location: 'West Sumatra',
        description:
          "The Mentawai Islands, an archipelago of about seventy islands and islets off Sumatra's western coast, represent one of the world's most pristine and culturally rich destinations. Renowned globally as a premier surfing paradise, the islands boast over 400 world-class surf spots, including the legendary waves of Lance's Right, Macaronis, and Telescopes. These perfect barrels and long peeling waves attract professional surfers and enthusiasts year-round, with the peak season between March and October when the southern swells create optimal conditions. Beyond the spectacular surfing, the Mentawai Islands harbor an extraordinary cultural heritage through their indigenous inhabitants, the Mentawai people, who have maintained their traditional way of life for thousands of years. Their unique culture includes distinctive tattoo art, traditional medicine practices, and a deep spiritual connection to the forest through their belief system known as Arat Sabulungan. The archipelago's natural environment is equally impressive, featuring pristine rainforests that cover approximately 60% of the islands, home to several endemic species including the Mentawai macaque, gibbon, and langur. The crystal-clear waters surrounding the islands support vibrant coral reefs teeming with marine life, from colorful tropical fish to sea turtles and occasional manta rays. The beaches remain largely untouched, with powdery white sand and swaying palm trees creating postcard-perfect scenes. Traditional villages, or uma, dot the islands, where visitors can witness authentic cultural practices, including traditional dances, ceremonial gatherings, and the crafting of traditional weapons and tools. The islands' isolation has helped preserve both their natural environment and cultural heritage, though recent years have seen the careful development of eco-resorts and homestays that provide comfortable accommodations while maintaining environmental sustainability principles. The local cuisine offers unique flavors, featuring fresh seafood, sago-based dishes, and traditional cooking methods that have been passed down through generations.",
        image:
          'https://images.unsplash.com/photo-1516690561799-46d8f74f9abf?auto=format&fit=crop&q=80&w=800',
        rating: 4.7,
      },
    ],
  },
  java: {
    name: 'Java',
    destinations: [
      {
        id: '1',
        name: 'Borobudur Temple',
        location: 'Central Java',
        description:
          "Borobudur Temple, the world's largest Buddhist temple, stands as an architectural masterpiece and a testament to Java's rich cultural heritage. Built in the 8th and 9th centuries during the reign of the Sailendra Dynasty, this UNESCO World Heritage site encompasses more than 2,000 relief panels and 504 Buddha statues, telling the story of Buddhist cosmology and teachings through intricate stone carvings. The temple's design represents Buddhist cosmology, with three realms of existence: Kamadhatu (the world of desire), Rupadhatu (the world of forms), and Arupadhatu (the world of formlessness). The structure rises in nine levels, creating a pyramid-like shape that symbolizes the path to enlightenment. Each level features detailed relief panels that span a total length of 6 kilometers, depicting Buddhist scriptures, everyday life in ancient Java, and the story of Prince Siddhartha's journey to becoming Buddha. The temple's location amidst a lush valley surrounded by four volcanoes - Merapi, Merbabu, Sumbing, and Sindoro - creates a mystical atmosphere that enhances its spiritual significance. The massive stone blocks used in construction, numbering over 2 million, were cut to perfection and assembled without mortar using sophisticated interlocking techniques. The temple's restoration, completed in 1983, involved the careful dismantling and rebuilding of much of the structure, marking one of the world's largest archaeological projects. Visitors today can climb the temple's nine levels, following the ancient path of pilgrimage, while witnessing the changing views of the surrounding landscape. The best time to visit is at sunrise when the morning mist creates an ethereal atmosphere and the first light illuminates the Buddha statues. The temple complex includes a museum housing artifacts found during restoration and educational displays about the temple's history and significance in Buddhist architecture and Indonesian culture.",
        image:
          'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?auto=format&fit=crop&q=80&w=800',
        rating: 4.9,
      },
      {
        id: '2',
        name: 'Mount Bromo',
        location: 'East Java',
        description:
          "Mount Bromo, an active volcano rising 2,329 meters above sea level, stands as one of Indonesia's most spectacular natural wonders within the vast Tengger massif. Part of the Bromo Tengger Semeru National Park, this iconic volcano offers visitors an otherworldly landscape that seems plucked from a science fiction film. The volcano sits within the massive Tengger caldera, a vast crater spanning 10 kilometers, surrounded by a sea of fine volcanic sand known as the Tengger Sand Sea. The dramatic landscape includes the cone of Mount Bromo itself, which continuously emits white sulfurous smoke, alongside several other volcanic peaks including Mount Batok and the highest peak in Java, Mount Semeru. The area holds deep cultural significance for the Hindu Tengger people, who have inhabited this region for centuries. Each year, they perform the Kasada ceremony, throwing offerings into the crater of Mount Bromo to honor their ancestors and deities. The most popular way to experience Bromo is through a pre-dawn excursion to Mount Penanjakan's viewpoint, where visitors witness one of the world's most spectacular sunrises. As the first light breaks, it gradually illuminates the volcanic landscape, creating an unforgettable panorama of Mount Bromo and its neighboring peaks emerging from the morning mist and clouds. After sunrise, visitors can cross the Sea of Sand on horseback or foot to climb the 253 concrete steps to Bromo's crater rim. The lunar-like landscape of the caldera floor, covered in volcanic ash and often shrouded in mist, creates an eerie and beautiful atmosphere. The surrounding area supports unique flora adapted to the volcanic environment, including hardy grasses and the famous edelweiss flowers that grow at high altitudes. The national park also harbors diverse wildlife, including the rare Java hawk-eagle and various species of deer and monkeys. The region experiences a unique microclimate due to its altitude, with temperatures ranging from near freezing before dawn to pleasantly cool during the day, making it a refreshing escape from Java's tropical heat.",
        image:
          'https://images.unsplash.com/photo-1589395595558-690008363e88?auto=format&fit=crop&q=80&w=800',
        rating: 4.8,
      },
    ],
  },
  // Add more islands and their destinations...
};

export default function IslandDestinationsScreen() {
  const { island } = useLocalSearchParams();
  const router = useRouter();
  const islandData = DESTINATIONS[island as keyof typeof DESTINATIONS];
  const onPress = (params: any) => {
    router.push({
      pathname: '/detail',
      params,
    });
  };

  if (!islandData) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Island not found</Text>
          <Pressable style={styles.backButton} onPress={() => router.back()}>
            <Text style={styles.backButtonText}>Back to Islands</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Pressable style={styles.backButton} onPress={() => router.back()}>
            <ArrowLeft size={24} color="#1A202C" />
          </Pressable>
          <Text style={styles.title}>Explore {islandData.name}</Text>
          <Text style={styles.subtitle}>Discover amazing destinations</Text>
        </View>

        <View style={styles.content}>
          {islandData.destinations.map((destination, index) => (
            <ItemCard
              id={destination.id}
              key={destination.id}
              entering={FadeInDown.delay(index * 200)}
              name={destination.name}
              description={destination.description}
              image={destination.image}
              onPress={() => onPress({ ...destination })}
              location={destination.location}
            />
          ))}
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
  backButtonText: {
    fontFamily: 'PlusJakartaSans-SemiBold',
    fontSize: 16,
    color: '#48BB78',
  },
});
