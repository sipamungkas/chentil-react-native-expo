import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, Calendar } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { colors } from '@/theme/colors';

const CULTURAL_ITEMS = [
  {
    id: '1',
    name: 'Wayang Kulit',
    since: '8th Century',
    image:
      'https://images.unsplash.com/photo-1601959334721-760c1c2c4bf1?auto=format&fit=crop&q=80&w=800',
    description:
      'Traditional Javanese shadow puppet theatre, recognized by UNESCO as a Masterpiece of Oral and Intangible Heritage of Humanity.',
    origin: 'Java',
    significance:
      'Tells stories from the Ramayana and Mahabharata epics, preserving ancient Hindu-Javanese culture.',
  },
  {
    id: '2',
    name: 'Batik',
    since: '4th Century',
    image:
      'https://images.unsplash.com/photo-1584184924103-e310d9dc82fc?auto=format&fit=crop&q=80&w=800',
    description:
      'Ancient textile art using wax-resist dyeing, recognized by UNESCO as Intangible Cultural Heritage.',
    origin: 'Java',
    significance:
      'Each pattern holds deep symbolic meaning, reflecting Indonesian philosophy and cultural values.',
  },
  {
    id: '3',
    name: 'Gamelan',
    since: '9th Century',
    image:
      'https://images.unsplash.com/photo-1599796504338-161b9d3e1c40?auto=format&fit=crop&q=80&w=800',
    description:
      'Traditional ensemble music featuring predominantly percussive instruments.',
    origin: 'Java and Bali',
    significance:
      'Essential to ritual, ceremony, dance, and drama throughout Indonesian culture.',
  },
  {
    id: '4',
    name: 'Pencak Silat',
    since: '6th Century',
    image:
      'https://images.unsplash.com/photo-1599796508495-fea30f30ad55?auto=format&fit=crop&q=80&w=800',
    description:
      'Traditional martial art incorporating strikes, grappling, and weapons.',
    origin: 'Indonesian Archipelago',
    significance:
      'Combines self-defense, art, sport, and spiritual development.',
  },
];

export default function CultureScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Cultural Heritage</Text>
          <Text style={styles.subtitle}>
            Discover Indonesia's rich traditions
          </Text>
        </View>

        <Pressable style={styles.searchBar}>
          <Search size={20} color="#4A5568" />
          <Text style={styles.searchText}>Search cultural traditions</Text>
        </Pressable>

        <View style={styles.content}>
          {CULTURAL_ITEMS.map((item, index) => (
            <Animated.View
              key={item.id}
              entering={FadeInDown.delay(index * 100)}
              style={styles.card}
            >
              <Image source={{ uri: item.image }} style={styles.image} />
              <View style={styles.cardContent}>
                <View style={styles.cardHeader}>
                  <Text style={styles.cultureName}>{item.name}</Text>
                  <View style={styles.sinceContainer}>
                    <Calendar size={14} color="#4A5568" />
                    <Text style={styles.sinceText}>Since {item.since}</Text>
                  </View>
                </View>
                <Text style={styles.description} numberOfLines={2}>
                  {item.description}
                </Text>
                <Pressable
                  style={styles.learnMoreButton}
                  onPress={() => router.push(`/culture/${item.id}`)}
                >
                  <Text style={styles.learnMoreText}>Learn More</Text>
                </Pressable>
              </View>
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
  card: {
    backgroundColor: colors.background.primary,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 200,
  },
  cardContent: {
    padding: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  cultureName: {
    fontFamily: 'PlusJakartaSans-SemiBold',
    fontSize: 18,
    color: '#1A202C',
  },
  sinceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background.tertiary,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  sinceText: {
    fontFamily: 'PlusJakartaSans-Medium',
    fontSize: 12,
    color: '#4A5568',
    marginLeft: 4,
  },
  description: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 14,
    color: '#4A5568',
    lineHeight: 20,
    marginBottom: 12,
  },
  learnMoreButton: {
    backgroundColor: '#48BB78',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  learnMoreText: {
    fontFamily: 'PlusJakartaSans-SemiBold',
    fontSize: 14,
    color: '#fff',
  },
});
