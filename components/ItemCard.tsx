import { colors } from '@/theme/colors';
import { Image } from 'expo-image';
import { View, Text, StyleSheet } from 'react-native';
import { Calendar, MapPin } from 'lucide-react-native';
import { GestureResponderEvent, Pressable } from 'react-native';
import Animated from 'react-native-reanimated';

import type {
  EntryExitAnimationFunction,
  FadeInDown,
} from 'react-native-reanimated';

export interface ItemCardProps {
  entering: EntryExitAnimationFunction | undefined | FadeInDown;
  id: number;
  image: string;
  name: string;
  location?: string; //use it on destination or something that need location
  since?: string; //use it on culture
  description?: string;
  category?: string;
  onPress?: ((event: GestureResponderEvent) => void) | null | undefined;
}

export function ItemCard({
  entering,
  id,
  image,
  name,
  location,
  description,
  since,
  onPress,
  category,
}: ItemCardProps) {
  return (
    <Animated.View entering={entering} style={styles.card}>
      <Pressable onPress={onPress}>
        <Animated.Image source={{ uri: image }} style={styles.image} />
        <View style={styles.info}>
          <Text style={styles.name}>{name}</Text>

          {location!! && (
            <View style={styles.locationRow}>
              <MapPin size={16} color={colors.chentil.rosePink} />
              <Text style={styles.locationText}>{location}</Text>
            </View>
          )}
          {category === 'culture' && (
            <View style={styles.locationRow}>
              <Calendar size={14} color={colors.chentil.rosePink} />
              <Text style={styles.sinceText}>Since {since}</Text>
            </View>
          )}

          {description!! && (
            <Text style={styles.description} numberOfLines={2}>
              {description}
            </Text>
          )}
        </View>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.background.primary,
    borderRadius: 16,
    marginBottom: 20,
    overflow: 'hidden',
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
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  info: {
    padding: 16,
  },
  name: {
    fontFamily: 'PlusJakartaSans-SemiBold',
    fontSize: 18,
    color: colors.brand.primary,
    marginBottom: 8,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  locationText: {
    fontFamily: 'PlusJakartaSans-Medium',
    fontSize: 14,
    color: '#4A5568',
    marginLeft: 4,
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
    color: colors.text.primary,
    lineHeight: 20,
    marginBottom: 12,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontFamily: 'PlusJakartaSans-SemiBold',
    fontSize: 14,
    color: '#1A202C',
    marginLeft: 8,
  },
});
