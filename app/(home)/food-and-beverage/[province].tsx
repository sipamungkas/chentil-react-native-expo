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
import { ArrowLeft, MapPin, Clock, Utensils } from 'lucide-react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { colors } from '@/theme/colors';

const PROVINCE_FOODS = {
  aceh: {
    name: 'Aceh',
    foods: [
      {
        id: '1',
        name: 'Mie Aceh',
        description:
          'Spicy noodle dish with a rich blend of spices, typically served with seafood or meat.',
        image:
          'https://images.unsplash.com/photo-1626804475297-41608ea09aeb?auto=format&fit=crop&q=80&w=800',
        cookingTime: '30-45 minutes',
        spiceLevel: 'Hot',
        mainIngredients: [
          'Thick yellow noodles',
          'Shrimp',
          'Beef',
          'Curry spices',
        ],
      },
      {
        id: '2',
        name: 'Kuah Pliek U',
        description:
          'Traditional Acehnese curry made with fermented coconut pulp and various vegetables.',
        image:
          'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&q=80&w=800',
        cookingTime: '60-90 minutes',
        spiceLevel: 'Medium',
        mainIngredients: ['Fermented coconut', 'Local vegetables', 'Spices'],
      },
    ],
  },
  bali: {
    name: 'Bali',
    foods: [
      {
        id: '1',
        name: 'Babi Guling',
        description:
          'Balinese-style roast pork with traditional spices and herbs.',
        image:
          'https://images.unsplash.com/photo-1625938144755-652e08e359b7?auto=format&fit=crop&q=80&w=800',
        cookingTime: '4-5 hours',
        spiceLevel: 'Medium',
        mainIngredients: ['Pork', 'Turmeric', 'Lemongrass', 'Galangal'],
      },
      {
        id: '2',
        name: 'Bebek Betutu',
        description:
          'Slow-cooked duck with Balinese spices, wrapped in banana leaves.',
        image:
          'https://images.unsplash.com/photo-1567529726005-7fb5e8225349?auto=format&fit=crop&q=80&w=800',
        cookingTime: '6-8 hours',
        spiceLevel: 'Medium-Hot',
        mainIngredients: ['Duck', 'Balinese spice paste', 'Banana leaves'],
      },
    ],
  },
  // Add more provinces and their foods...
};

export default function ProvinceFoodScreen() {
  const { province } = useLocalSearchParams();
  const router = useRouter();
  const provinceData = PROVINCE_FOODS[province as keyof typeof PROVINCE_FOODS];

  if (!provinceData) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Province not found</Text>
          <Pressable style={styles.backButton} onPress={() => router.back()}>
            <Text style={styles.backButtonText}>Back to Provinces</Text>
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
          <Text style={styles.title}>{provinceData.name} Cuisine</Text>
          <Text style={styles.subtitle}>Traditional foods and delicacies</Text>
        </View>

        <View style={styles.content}>
          {provinceData.foods.map((food, index) => (
            <Animated.View
              key={food.id}
              entering={FadeInDown.delay(index * 200)}
              style={styles.foodCard}
            >
              <Pressable
                onPress={() =>
                  router.push(`/food-and-beverage/${province}/${food.id}`)
                }
              >
                <Image source={{ uri: food.image }} style={styles.foodImage} />
                <View style={styles.foodInfo}>
                  <Text style={styles.foodName}>{food.name}</Text>
                  <Text style={styles.foodDescription} numberOfLines={2}>
                    {food.description}
                  </Text>

                  <View style={styles.foodDetails}>
                    <View style={styles.detailItem}>
                      <Clock size={16} color="#4A5568" />
                      <Text style={styles.detailText}>{food.cookingTime}</Text>
                    </View>

                    <View style={styles.detailItem}>
                      <Utensils size={16} color="#4A5568" />
                      <Text style={styles.detailText}>{food.spiceLevel}</Text>
                    </View>
                  </View>
                </View>
              </Pressable>
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
  foodCard: {
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
  foodImage: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  foodInfo: {
    padding: 16,
  },
  foodName: {
    fontFamily: 'PlusJakartaSans-SemiBold',
    fontSize: 18,
    color: '#1A202C',
    marginBottom: 8,
  },
  foodDescription: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 14,
    color: '#4A5568',
    lineHeight: 20,
    marginBottom: 12,
  },
  foodDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    fontFamily: 'PlusJakartaSans-Medium',
    fontSize: 14,
    color: '#4A5568',
    marginLeft: 8,
  },
});
