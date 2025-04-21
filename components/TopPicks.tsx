import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { Star, MapPin, Utensils, Palette } from 'lucide-react-native';
import { colors } from '../theme/colors';
import { Content } from '@/src/types/api';

interface TopPicksProps {
  contents: Content[];
  onPlacePress: (id: string) => void;
}

export function TopPicks({ contents, onPlacePress }: TopPicksProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Top Picks</Text>
      {contents.map((content) => (
        <TouchableOpacity
          key={content.id}
          style={styles.card}
          onPress={() => onPlacePress(content.id.toString())}
        >
          <Image
            source={{ uri: content.image }}
            style={styles.image}
            contentFit="cover"
          />
          <View style={styles.content}>
            <Text style={styles.name}>{content.title}</Text>
            <Text style={styles.location}>
              {content.province?.name ||
                content.regency?.name ||
                content.district?.name ||
                ''}
            </Text>
            <View style={styles.categoryRow}>
              {content.category === 'destination' && (
                <MapPin size={14} color={colors.chentil.rosePink} />
              )}
              {content.category === 'food' && (
                <Utensils size={14} color={colors.chentil.rosePink} />
              )}
              {content.category === 'culture' && (
                <Palette size={14} color={colors.chentil.rosePink} />
              )}
              {content.category === 'outbound' && (
                <MapPin size={14} color={colors.chentil.rosePink} />
              )}
              <Text style={styles.categoryText}>
                {content.category === 'destination' && 'Destination'}
                {content.category === 'food' && 'Food & Beverage'}
                {content.category === 'culture' && 'Culture'}
                {content.category === 'outbound' && 'Outbound'}
              </Text>
            </View>
            {/* <View style={styles.ratingContainer}>
              <Star
                size={16}
                color={colors.chentil.watermelon}
                fill={colors.chentil.watermelon}
              />
              <Text style={styles.rating}>{content.rating}</Text>
            </View> */}
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: 16,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: colors.background.secondary,
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    elevation: 1,
  },
  image: {
    width: 120,
    height: 120,
  },
  content: {
    flex: 1,
    padding: 12,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.brand.primary,
    marginBottom: 4,
  },
  location: {
    fontSize: 14,
    color: colors.text.secondary,
    marginBottom: 4,
  },
  categoryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  categoryText: {
    fontSize: 13,
    color: colors.chentil.rosePink,
    marginLeft: 6,
    fontFamily: 'PlusJakartaSans-Medium',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 14,
    color: colors.text.primary,
    marginLeft: 4,
  },
});
