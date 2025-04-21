import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { Image } from 'expo-image';
import { colors } from '@/theme/colors';
import {
  Calendar,
  MapPin,
  Heart,
  BookmarkPlus,
  Map,
  ChevronLeft,
  Utensils,
  Palette,
} from 'lucide-react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useEffect, useState } from 'react';
import Animated from 'react-native-reanimated';
import { checkWishlist, toggleWishlist } from '@/api/services/wishlistApi';
import { checkFavorite, toggleFavorite } from '@/src/api/services/favoriteApi';

export default function DetailScreen() {
  const {
    id,
    image,
    name,
    description,
    location,
    since,
    date,
    title,
    category,
    latitude,
    longitude,
  } = useLocalSearchParams();
  const router = useRouter();

  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat('id-ID', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }).format(date);
    } catch (error) {
      return dateString;
    }
  };

  const handleMapPress = () => {
    router.push({
      pathname: '/map',
      params: {
        latitude,
        longitude,
      },
    });
  };

  useEffect(() => {
    checkWishlist(Number(id)).then((res) => {
      setIsWishlisted(res.is_wishlisted);
    });
  }, []);

  useEffect(() => {
    checkFavorite(Number(id)).then((res) => {
      setIsFavorite(res.is_favorited);
    });
  }, []);

  const handleWishlistPress = () => {
    toggleWishlist(Number(id)).then(() => {
      checkWishlist(Number(id)).then((res) => {
        setIsWishlisted(res.is_wishlisted);
      });
    });
  };

  const handleFavoritePress = () => {
    toggleFavorite(Number(id)).then((res) => {
      setIsFavorite(res.is_favorited);
    });
  };

  // Category-to-text-color map using theme colors
  const categoryTextColors = {
    outbound: colors.chentil.rosePink,
    culture: colors.chentil.creamy,
    fnb: colors.chentil.bubbleGum,
    destination: colors.chentil.thulian,
  } as const;

  return (
    <SafeAreaView style={styles.container}>
      <Pressable style={styles.backButton} onPress={() => router.back()}>
        <ChevronLeft size={24} color={colors.text.primary} />
      </Pressable>

      <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
        <Animated.Image
          sharedTransitionTag={id as string}
          source={{ uri: image as string }}
          style={styles.image}
        />

        <View style={styles.content}>
          <Text style={styles.name}>{name || title}</Text>
          <View style={styles.typeContainer}>
            {category === 'destination' && (
              <MapPin size={16} color={colors.chentil.rosePink} />
            )}
            {category === 'fnb' && (
              <Utensils size={16} color={colors.chentil.rosePink} />
            )}
            {category === 'culture' && (
              <Palette size={16} color={colors.chentil.rosePink} />
            )}
            {category === 'outbound' && (
              <MapPin size={14} color={colors.chentil.rosePink} />
            )}
            <Text style={styles.categoryBadge}>
              {category === 'outbound' && 'Outbound'}
              {category === 'culture' && 'Culture'}
              {category === 'fnb' && 'Food & Beverage'}
              {category === 'destination' && 'Destination'}
            </Text>
          </View>

          {location && (
            <View style={styles.infoRow}>
              <MapPin size={16} color={colors.chentil.rosePink} />
              <Text style={styles.infoText}>{location}</Text>
            </View>
          )}

          {since && (
            <View style={styles.infoRow}>
              <Calendar size={16} color={colors.chentil.rosePink} />
              <Text style={styles.infoText}>Since {since}</Text>
            </View>
          )}

          {date && (
            <View style={styles.infoRow}>
              <Calendar size={16} color={colors.chentil.rosePink} />
              <Text style={styles.infoText}>{formatDate(date as string)}</Text>
            </View>
          )}

          <Text style={styles.description}>{description}</Text>

          <View style={styles.actionButtons}>
            <Pressable
              style={[styles.actionButton, isFavorite && styles.activeButton]}
              onPress={() => handleFavoritePress()}
            >
              <Heart
                size={20}
                color={
                  isFavorite
                    ? colors.background.primary
                    : colors.chentil.rosePink
                }
                fill={isFavorite ? colors.chentil.rosePink : 'none'}
              />
              <Text
                style={[
                  styles.buttonText,
                  isFavorite && styles.activeButtonText,
                ]}
              >
                {isFavorite ? 'Favorited' : 'Add to Favorites'}
              </Text>
            </Pressable>

            <Pressable
              style={[styles.actionButton, isWishlisted && styles.activeButton]}
              onPress={() => handleWishlistPress()}
            >
              <BookmarkPlus
                size={20}
                color={
                  isWishlisted
                    ? colors.background.primary
                    : colors.chentil.rosePink
                }
                fill={isWishlisted ? colors.chentil.rosePink : 'none'}
              />
              <Text
                style={[
                  styles.buttonText,
                  isWishlisted && styles.activeButtonText,
                ]}
              >
                {isWishlisted ? 'Wishlisted' : 'Add to Wishlist'}
              </Text>
            </Pressable>

            <Pressable style={styles.mapButton} onPress={handleMapPress}>
              <Map size={20} color={colors.background.primary} />
              <Text style={styles.mapButtonText}>View Nearby Places</Text>
            </Pressable>
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
  image: {
    width: '100%',
    height: 300,
  },
  content: {
    padding: 20,
  },
  name: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 24,
    color: colors.brand.primary,
    marginBottom: 16,
  },
  typeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  categoryBadge: {
    fontFamily: 'PlusJakartaSans-Medium',
    fontSize: 14,
    padding: 4,
    borderRadius: 4,
    marginLeft: 8,
    color: colors.chentil.rosePink,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  infoText: {
    fontFamily: 'PlusJakartaSans-Medium',
    fontSize: 16,
    color: colors.text.primary,
    marginLeft: 8,
  },
  description: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 16,
    color: colors.text.primary,
    lineHeight: 24,
    marginVertical: 16,
    textAlign: 'justify',
  },
  actionButtons: {
    gap: 12,
    marginTop: 20,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.chentil.rosePink,
    gap: 8,
  },
  activeButton: {
    backgroundColor: colors.chentil.rosePink,
  },
  buttonText: {
    fontFamily: 'PlusJakartaSans-SemiBold',
    fontSize: 16,
    color: colors.chentil.rosePink,
  },
  activeButtonText: {
    color: colors.background.primary,
  },
  mapButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 12,
    backgroundColor: colors.chentil.rosePink,
    gap: 8,
  },
  mapButtonText: {
    fontFamily: 'PlusJakartaSans-SemiBold',
    fontSize: 16,
    color: colors.background.primary,
  },
  backButton: {
    position: 'absolute',
    top: 44,
    left: 16,
    zIndex: 10,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
