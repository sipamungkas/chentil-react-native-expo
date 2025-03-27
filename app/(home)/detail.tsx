import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { Image } from 'expo-image';
import { colors } from '@/theme/colors';
import {
  Calendar,
  MapPin,
  Heart,
  BookmarkPlus,
  Map,
} from 'lucide-react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import Animated from 'react-native-reanimated';

interface DetailScreenProps {
  image: string;
  name: string;
  description: string;
  location?: string;
  since?: string;
}

export default function DetailScreen() {
  const { id, image, name, description, location, since } =
    useLocalSearchParams();
  const router = useRouter();
  const [isFavorite, setIsFavorite] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const handleMapPress = () => {
    router.push('/map');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
        <Animated.Image
          sharedTransitionTag={id as string}
          source={{ uri: image as string }}
          style={styles.image}
        />

        <View style={styles.content}>
          <Text style={styles.name}>{name}</Text>

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

          <Text style={styles.description}>{description}</Text>

          <View style={styles.actionButtons}>
            <Pressable
              style={[styles.actionButton, isFavorite && styles.activeButton]}
              onPress={() => setIsFavorite(!isFavorite)}
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
              onPress={() => setIsWishlisted(!isWishlisted)}
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
});
