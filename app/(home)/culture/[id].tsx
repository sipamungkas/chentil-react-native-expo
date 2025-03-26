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
import { ArrowLeft, Calendar, MapPin, Info } from 'lucide-react-native';
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
    details: {
      performers: 'Dalang (puppet master)',
      duration: '6-8 hours',
      instruments: 'Gamelan ensemble',
      occasions: [
        'Religious ceremonies',
        'Cultural festivals',
        'Royal court performances',
        'Community gatherings',
      ],
      characteristics: [
        'Intricate puppet designs',
        'Complex storytelling',
        'Live musical accompaniment',
        'Philosophical teachings',
      ],
    },
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
    details: {
      techniques: 'Wax-resist dyeing',
      materials: 'Cotton or silk fabric, wax, natural dyes',
      patterns: [
        'Geometric designs',
        'Floral motifs',
        'Animal figures',
        'Abstract patterns',
      ],
      symbolism: [
        'Royal heritage',
        'Social status',
        'Local traditions',
        'Natural elements',
      ],
    },
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
    details: {
      instruments: ['Metallophones', 'Xylophones', 'Drums', 'Gongs'],
      occasions: [
        'Temple ceremonies',
        'Royal events',
        'Shadow puppet shows',
        'Dance performances',
      ],
      characteristics: [
        'Complex rhythmic patterns',
        'Collective performance',
        'Cyclical structure',
        'Spiritual significance',
      ],
    },
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
    details: {
      elements: [
        'Physical training',
        'Mental discipline',
        'Spiritual development',
        'Cultural preservation',
      ],
      techniques: [
        'Strikes and kicks',
        'Joint manipulation',
        'Weapon handling',
        'Ground fighting',
      ],
      principles: [
        'Balance and harmony',
        'Respect for tradition',
        'Mind-body connection',
        'Cultural identity',
      ],
    },
  },
];

export default function CultureDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const culture = CULTURAL_ITEMS.find((c) => c.id === id);

  if (!culture) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Cultural item not found</Text>
          <Pressable style={styles.backButton} onPress={() => router.back()}>
            <Text style={styles.backButtonText}>Back to Culture</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Image source={{ uri: culture.image }} style={styles.headerImage} />
          <Pressable style={styles.backButton} onPress={() => router.back()}>
            <ArrowLeft color="#fff" size={24} />
          </Pressable>
        </View>

        <View style={styles.content}>
          <Text style={styles.title}>{culture.name}</Text>

          <View style={styles.infoGrid}>
            <View style={styles.infoItem}>
              <Calendar size={20} color="#48BB78" />
              <Text style={styles.infoLabel}>Since</Text>
              <Text style={styles.infoValue}>{culture.since}</Text>
            </View>
            <View style={styles.infoItem}>
              <MapPin size={20} color="#48BB78" />
              <Text style={styles.infoLabel}>Origin</Text>
              <Text style={styles.infoValue}>{culture.origin}</Text>
            </View>
            <View style={styles.infoItem}>
              <Info size={20} color="#48BB78" />
              <Text style={styles.infoLabel}>UNESCO</Text>
              <Text style={styles.infoValue}>Protected</Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.description}>{culture.description}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Significance</Text>
            <Text style={styles.description}>{culture.significance}</Text>
          </View>

          {Object.entries(culture.details).map(([key, value]) => (
            <View key={key} style={styles.section}>
              <Text style={styles.sectionTitle}>
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </Text>
              {Array.isArray(value) ? (
                value.map((item, index) => (
                  <View key={index} style={styles.listItem}>
                    <View style={styles.bullet} />
                    <Text style={styles.listText}>{item}</Text>
                  </View>
                ))
              ) : (
                <Text style={styles.description}>{value}</Text>
              )}
            </View>
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
  backButtonText: {
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
  content: {
    padding: 20,
  },
  title: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 28,
    color: '#1A202C',
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
  description: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 16,
    color: '#4A5568',
    lineHeight: 24,
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
    backgroundColor: '#48BB78',
    marginRight: 8,
  },
  listText: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 14,
    color: '#4A5568',
    flex: 1,
  },
});
