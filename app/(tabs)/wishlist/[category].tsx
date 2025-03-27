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

const WISHLIST_ITEMS = {
  destination: [
    {
      id: '1',
      name: 'Borobudur Temple',
      location: 'Magelang, Central Java',
      image:
        'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?auto=format&fit=crop&q=80&w=800',
      rating: 4.8,
      description:
        "Borobudur Temple, an architectural marvel dating back to the 8th and 9th centuries, represents the pinnacle of classical Indonesian Buddhist architecture. This UNESCO World Heritage site consists of nine stacked platforms, six square and three circular, topped by a central dome, creating a mesmerizing stepped pyramid structure. The temple's design symbolizes Buddhist cosmology, with each level representing a different plane of consciousness on the path to enlightenment. Over 2,672 relief panels and 504 Buddha statues adorn its walls, telling ancient stories through intricate stone carvings that span more than 6 kilometers when laid end to end. The temple's strategic location, surrounded by the verdant Menoreh hills and four majestic volcanoes, creates a mystical atmosphere that enhances its spiritual significance. The massive structure, built without using any mortar, comprises over 2 million stone blocks that were precisely cut and stacked using an ingenious interlocking system. The temple's restoration, completed in 1983, stands as one of the world's most ambitious archaeological projects, involving the careful dismantling and rebuilding of much of the structure. Visitors today can follow the ancient pilgrim's path, circumambulating each level while witnessing the changing views of the surrounding landscape. The best time to visit is during sunrise, when the morning mist creates an ethereal atmosphere and the first light gradually illuminates the Buddha statues, creating an unforgettable spiritual experience.",
    },
    {
      id: '2',
      name: 'Raja Ampat Islands',
      location: 'West Papua',
      image:
        'https://images.unsplash.com/photo-1516690561799-46d8f74f9abf?auto=format&fit=crop&q=80&w=800',
      rating: 4.9,
      description:
        "Raja Ampat, an archipelago comprising over 1,500 small islands in Indonesia's West Papua province, represents the epitome of marine biodiversity and pristine natural beauty. Known as the 'Crown Jewel' of the Coral Triangle, these islands harbor more than 1,300 fish species, 700 mollusk species, and 537 coral species, representing 75% of all known coral species in the world. The name Raja Ampat, meaning 'Four Kings,' comes from a local mythology about four kings who once ruled over these islands. The underwater landscape features vast coral reefs, steep walls, and caves, creating a paradise for divers and snorkelers. The crystal-clear waters offer visibility up to 30 meters, allowing visitors to witness the incredible marine life in its full glory. Above water, the islands present a stunning landscape of jungle-covered karst formations, hidden lagoons, and pristine white-sand beaches. Indigenous communities still maintain their traditional way of life, practicing sustainable fishing methods passed down through generations. The region's isolation has helped preserve both its natural wonders and cultural heritage, though carefully managed tourism now allows visitors to experience this extraordinary ecosystem while supporting local conservation efforts. The archipelago experiences two main seasons, with October to April being the best time for diving due to calmer seas and better visibility. Each island offers unique experiences, from watching Birds of Paradise in their natural habitat to exploring ancient rock art sites that date back thousands of years.",
    },
  ],
  outbound: [
    {
      id: '1',
      name: 'Mount Rinjani Trek',
      location: 'Lombok',
      image:
        'https://images.unsplash.com/photo-1621769533938-13931cc09d92?auto=format&fit=crop&q=80&w=800',
      rating: 4.7,
      description:
        "Mount Rinjani, Indonesia's second-highest volcano, offers one of Southeast Asia's most challenging and rewarding trekking experiences. Rising 3,726 meters above sea level, this active volcano dominates Lombok's landscape and holds deep spiritual significance for the local Sasak and Hindu people. The trek to its summit takes hikers through multiple ecosystems, from lush tropical forests at the base to alpine meadows near the peak. The mountain's crater houses the stunning Lake Segara Anak, a sacred crater lake whose turquoise waters reflect the surrounding cliffs like a mirror. Hot springs near the lake provide natural therapy for weary trekkers, while the lake itself is home to a unique ecosystem including endemic fish species. The traditional route typically takes 3-4 days, allowing trekkers to witness spectacular sunrises and sunsets from various vantage points. During clear weather, views extend across to Bali's Mount Agung and the Gili Islands. The volcano's geological activity creates fascinating phenomena, including regular small eruptions from the active cone of Gunung Baru within the crater. Wildlife encounters might include long-tailed macaques, rare black ebony leaf monkeys, and numerous bird species. The trek's difficulty varies with seasons, with April to November being the most favorable period. Local guides share fascinating stories about the mountain's mythology and its role in traditional ceremonies, adding cultural depth to the physical challenge of the ascent.",
    },
  ],
  food: [
    {
      id: '1',
      name: 'Rendang',
      location: 'West Sumatra',
      image:
        'https://images.unsplash.com/photo-1628534795735-0a0b6720828f?auto=format&fit=crop&q=80&w=800',
      rating: 4.9,
      description:
        "Rendang, crowned as the 'World's Most Delicious Food' by CNN in multiple surveys, represents the pinnacle of Minangkabau culinary artistry from West Sumatra. This iconic dish involves a complex cooking process where beef is slowly simmered in coconut milk and a rich blend of spices for several hours until the liquid completely evaporates, leaving the meat tender inside and caramelized outside. The traditional recipe includes an intricate mixture of over 20 ingredients, including ginger, galangal, turmeric leaves, lemongrass, garlic, shallots, and various native chilies. Each ingredient serves both culinary and medicinal purposes, following ancient Minangkabau wisdom. The cooking process, which can take up to 8 hours, requires constant attention and stirring, making it a true labor of love. The dish's preservation technique, developed centuries ago, allows it to last for up to four weeks at room temperature, making it an ideal provision for the traditionally nomadic Minangkabau people. Rendang plays a crucial role in numerous cultural ceremonies and celebrations, symbolizing the community's prosperity and patience. The dish's preparation often becomes a communal activity, with recipes passed down through generations, each family maintaining their unique variations while preserving the core techniques. Modern variations might include different meat choices or cooking methods, but the traditional beef rendang remains the most revered version, especially during significant cultural events and festivals.",
    },
  ],
  culture: [
    {
      id: '1',
      name: 'Kecak Fire Dance',
      location: 'Uluwatu, Bali',
      image:
        'https://images.unsplash.com/photo-1583309217394-d35d84b4c544?auto=format&fit=crop&q=80&w=800',
      rating: 4.8,
      description:
        "The Kecak Fire Dance, performed at Bali's majestic Uluwatu Temple, represents one of Indonesia's most mesmerizing cultural performances. This unique art form combines elements of Balinese Hindu culture, ancient ritual, and dramatic storytelling. The performance typically begins at sunset, with the ancient cliff-top temple and the Indian Ocean as its backdrop, creating an atmosphere of otherworldly beauty. The dance involves up to 100 male performers sitting in concentric circles, who create an intricate vocal chorus chanting 'cak' in complex interlocking patterns, serving as both music and atmosphere for the performance. The story enacted is typically drawn from the Ramayana epic, focusing on Prince Rama's battle to rescue his wife Sita from the demon king Ravana. The performance incorporates elaborate costumes, dramatic expressions, and precise choreography, culminating in the spectacular fire dance where a performer kicks burning coconut husks in a state of trance. The dance's origins trace back to the 1930s when German artist Walter Spies collaborated with Balinese dancers to transform the ancient Sanghyang trance ritual into a dramatic performance. Despite its relatively recent adaptation for tourism, the Kecak maintains deep spiritual significance, with performers often preparing through meditation and prayer. The performance's timing coincides with sunset at Uluwatu, one of Bali's most sacred temples, adding to its mystical atmosphere. The complex rhythms created by the male chorus demonstrate an extraordinary level of coordination and musical sophistication, while the fire dance element showcases the performers' physical prowess and spiritual connection.",
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

  const onPress = (params: any) => {
    router.push({
      pathname: '/detail',
      params,
    });
  };

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
          <Text style={styles.title}>{categoryName}</Text>
          <Text style={styles.subtitle}>{items.length} saved items</Text>
        </View>

        <View style={styles.content}>
          {items.map((item, index) => (
            <ItemCard
              key={item.id}
              id={item.id}
              name={item.name}
              entering={FadeInDown.delay(200 * index)}
              image={item.image}
              description={item.description}
              location={item.location}
              onPress={() => onPress(item)}
            />
          ))}

          {/* {items.map((item, index) => (
            <Animated.View
              key={item.id}
              entering={FadeInDown.delay(index * 100)}
            >
              <Pressable style={styles.itemCard}>
                <Image source={{ uri: item.image }} style={styles.itemImage} />
                <View style={styles.itemInfo}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <View style={styles.locationContainer}>
                    <MapPin size={14} color={colors.chentil.rosePink} />
                    <Text style={styles.locationText}>{item.location}</Text>
                  </View>
                  <View style={styles.ratingContainer}>
                    <Star size={14} color="#FFB800" fill="#FFB800" />
                    <Text style={styles.ratingText}>{item.rating}</Text>
                  </View>
                </View>
              </Pressable>
            </Animated.View> */}
          {/* ))} */}
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
  itemCard: {
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
